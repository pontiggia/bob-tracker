const { exec } = require('child_process');

const fetchFromPython = () => {
    return new Promise((resolve, reject) => {
        exec('/usr//bin/python3 utils/fetch.py', (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            try {
                const data = JSON.parse(stdout);
                const user = "Agusbob";
                const userBets = [];
                const betIds = new Set(); // Conjunto para almacenar las IDs de las apuestas

                Object.values(data)
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