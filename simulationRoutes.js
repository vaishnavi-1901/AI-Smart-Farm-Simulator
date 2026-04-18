const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { crop, irrigation, fertilizer, method, land, budget } = req.body;

  if (!crop || !irrigation || !fertilizer || !method || land == null || budget == null) {
    return res.status(400).json({
      error: 'Missing required simulation fields: crop, irrigation, fertilizer, method, land, budget.'
    });
  }

  const cropPrices = {
    Rice: 2200,
    Wheat: 2100,
    Corn: 1800,
    Cotton: 7000,
    Sugarcane: 350,
    Tomato: 1200
  };

  const irrigationWaterUsage = {
    Drip: 4000,
    Sprinkler: 6500,
    Flood: 12000
  };

  const parsedLand = Number(land);
  const parsedBudget = Number(budget);
  const capitalizedCrop = crop ? crop.charAt(0).toUpperCase() + crop.slice(1) : 'Unknown';
  const pricePerUnit = cropPrices[capitalizedCrop] || 1500;
  const yieldAmount = Math.round((parsedLand || 1) * 1200);
  const marketPriceAmount = yieldAmount * pricePerUnit;
  const baseWaterUsage = irrigationWaterUsage[irrigation] || 4000; // Default to Drip
  const totalWaterUsage = baseWaterUsage * parsedLand;
  const formattedWaterUsage = `${totalWaterUsage.toLocaleString()} L/day`;

  const result = {
    yield: yieldAmount,
    profit: Math.round((parsedBudget || 5000) * 1.4),
    risk: parsedBudget > 4000 ? 'Low' : parsedBudget > 2000 ? 'Medium' : 'High',
    crop: capitalizedCrop,
    marketPrice: marketPriceAmount,
    waterUsage: formattedWaterUsage
  };

  console.log('✅ Simulation response:', result);
  return res.json(result);
});

module.exports = router;
