"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("../router/authRoutes"));
const db_1 = require("../config/db");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use("/api/auth", authRoutes_1.default);
(0, db_1.dbConnect)();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
