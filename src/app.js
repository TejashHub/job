import express from "express";
import "express-async-errors";
import errorHandler from "./middleware/error-handler.middleware.js";
import notFound from "./middleware/not-found.middleware.js";
import authRouter from "./router/auth.router.js";
import jobRouter from "./router/job.router.js";
import authentication from "./middleware/authentication.middleware.js";

// Extra security package
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import rateLimiter from "express-rate-limit";

// Swagger Setup
import { swaggerUi, swaggerDocs } from "./swagger/swagger.js";

// Express
const app = express();

// Serve Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Static
app.use(express.static("./public"));

// Rete Limit
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  })
);

// Middleware
app.use(express.json());

// Security Headers
app.use(helmet());

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Prevent XSS Attacks
app.use(xss());

// Auth router
app.use("/api/v1/auth", authRouter);

// Job router
app.use("/api/v1/jobs", authentication, jobRouter);

// Error handler
app.use(notFound);
app.use(errorHandler);

export default app;
