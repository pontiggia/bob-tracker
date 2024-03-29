const cron = require("node-cron");
const Bet = require("../models/betsModel");
const Slots = require("../models/slotsModel");
const betFetch = require("../utils/fetch");
const createBet = require("../utils/createBet");
const updateStats = require("../utils/updateStats");

//cron.schedule("*/20 * * * * *", async () => {
  // Fetch bets
//  const bets = await betFetch();
  // Check if there are bets to insert
//  if (bets.length == 0) {
//    return console.log("No new bets");
//  } else {
    // Insert bets into the database sequentially
//    for (const bet of bets) {
//      const newBet = await createBet(bet);
      // Update user stats with the new bet
//      await updateStats(bet);
      //console.log(newBet);
//    }
//  }
//});


exports.getAllBets = async (req, res) => {
  try {
    const bets = await Bet.find();
    res.status(200).json({
      status: "success",
      results: bets.length,
      data: {
        bets,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getBet = async (req, res) => {
  try {
    const bet = await Bet.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        bet,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAllBetsTitle = async (req, res) => {
  try {
    // Utiliza la función de caché para comprobar y obtener los slots
    const slots = await Bet.find().distinct('title');

    // Devolver los slots desde la caché
    res.status(200).json({
      status: "success",
      data: {
        slots: slots,
      },
    });

  } catch (error) {
    console.error("Error al obtener los slots:", error);
    res.status(500).json({ error: "Error al obtener los slots" });
  }
};
