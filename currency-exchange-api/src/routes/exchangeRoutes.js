const express = require("express");
const ExchangeController = require("../controllers/exchangeController");
const router = express.Router();

/**
 * @swagger
 * /api/exchange-rate:
 *   get:
 *     summary: Get exchange rate
 *     description: Retrieve the exchange rate from one currency to another.
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         description: The currency code to convert from.
 *         schema:
 *           type: string
 *           example: USD
 *       - in: query
 *         name: to
 *         required: true
 *         description: The currency code to convert to.
 *         schema:
 *           type: string
 *           example: EUR
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rate:
 *                   type: number
 *                   example: 0.85
 *       400:
 *         description: Missing required query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required query parameters: from, to"
 *       429:
 *         description: Rate limited
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Rate limited, please try again later."
 */

router.get("/exchange-rate", ExchangeController.getRates);

module.exports = router;
