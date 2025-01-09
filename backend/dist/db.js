"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
const connectionDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoUri = process.env.MONGO_URI || "your_default_mongo_uri";
        yield mongoose_1.default.connect(mongoUri).then(() => {
            console.log("Connected to database");
        });
    }
    catch (error) {
        console.log(error);
    }
});
connectionDb();
const userSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 25,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
