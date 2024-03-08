const { spawn } = require('child_process');

const fetchFromPython = () => {
    return new Promise((resolve, reject) => {
        // Ejecutar el script de Python
        const pythonProcess = spawn('python', ['utils/fetch.py']);

        let data = '';

        // Escuchar los datos de salida del script de Python
        pythonProcess.stdout.on('data', (chunk) => {
            data += chunk.toString();
        });

        // Manejar errores de ejecución del script de Python
        pythonProcess.stderr.on('data', (error) => {
            reject(error.toString());
        });

        // Escuchar el evento de finalización del proceso de Python
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                try {
                    const jsonData = JSON.parse(data);

                    const user = "Agusbob";
                    const userBets = [];
                    const betIds = new Set(); // Conjunto para almacenar las IDs de las apuestas

                    Object.values(jsonData)
                        .flat()
                        .filter((bet) => bet.user && bet.user.displayName === user)
                        .forEach((bet) => {
                            if (!betIds.has(bet.id)) {
                                // Verificar si la ID de la apuesta ya existe en el conjunto
                                userBets.push(bet);
                                betIds.add(bet.id); // Agregar la ID de la apuesta al conjunto para evitar duplicados
                            }
                        });

                    resolve(userBets);
                } catch (parseError) {
                    reject(parseError);
                }
            } else {
                reject(`Error al ejecutar el script de Python. Código de salida: ${code}`);
            }
        });
    });
};

// Utilizar la función para obtener los datos
const obtenerDatos = async () => {
    try {
        const data = await fetchFromPython();
        return data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
};

module.exports = obtenerDatos;
