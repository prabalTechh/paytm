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
const middleware_1 = __importDefault(require("../middleware"));
const db2_1 = __importDefault(require("../db2"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
//@ts-ignore
router.get("/balance", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield db2_1.default.findOne({
        userId: req.body.userId,
    });
    if (account) {
        res.json({
            balance: account.balance,
        });
    }
    else {
        res.status(404).json({ error: "Account not found" });
    }
}));
// @ts-ignore
router.post("/transfer", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const { amount, to } = req.body;
    const account = yield db2_1.default.findOne({
        // @ts-ignore
        userId: req.body.userId,
    }).session(session);
    if (!account || account.balance < amount) {
        yield session.abortTransaction();
        return res.status(400).json({
            message: "insufficient Balance",
        });
    }
    const toAccount = yield db2_1.default.findOne({
        userId: to,
    }).session(session);
    if (!toAccount) {
        yield session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account",
        });
    }
    //perform the transfer
    yield db2_1.default.updateOne({ userId: req.body.userId }, { $inc: { balance: -amount } }).session(session);
    yield db2_1.default.updateOne({ userId: to }, {
        $inc: {
            balance: amount,
        },
    }).session(session);
    // Commit the transaction
    yield session.commitTransaction();
    res.json({
        message: "Transfer successful",
    });
}));
exports.default = router;
