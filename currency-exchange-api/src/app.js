const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const exchangeRoutes = require("./routes/exchangeRoutes");
const errorHandler = require("./middlewares/errorHandler");
const limiter = require("./middlewares/rateLimiter");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swagger");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(limiter);
app.use("/api", exchangeRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
