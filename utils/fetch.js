const puppeteer = require("puppeteer");

const fetch = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://ws.duelbits.com/user/bets/live");

    const jsonData = await page.evaluate(async () => {
      const response = await fetch("https://ws.duelbits.com/user/bets/live");
      const data = await response.json();
      return data;
    });

    await browser.close();

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
    
    return userBets;

  } catch (error) {
    console.error("Error:", error);
  }
};

fetch();

module.exports = fetch;
