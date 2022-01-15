"use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Entry point for ECMS - starts ECMS up
 * @packageDocumentation
 */
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
// Preable log line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - get weird error since package.json outside src/ (and therefore rootDir)
const package_json_1 = __importDefault(require("../package.json"));
console.log(`IsItWeekA as a Service v${package_json_1.default.version}`);
console.log("Starting IsItWeekA...");
/** Intitalise our config into environmntal variables */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const logger_1 = __importDefault(require("./utils/logger"));
const logger = (0, logger_1.default)("server");
logger.debug("IsItWeekA Logger Loaded.");
const redis_1 = __importDefault(require("./utils/redis"));
// Init redis & DB
logger.info("Loading Connections...");
const redis = (0, redis_1.default)();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const core_1 = require("@isitweeka/core");
/** Initiale Express */
const app = (0, express_1.default)();
// TEST ROUTE
app.get("/heartbeat", (req, res, next) => {
    res.json({
        message: "Server alive",
    });
});
app.get('/isitweeka/kechb', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info("Getting week from redis...");
    try {
        const fromRedis = yield redis.HGETALL(core_1.REDIS_KEY_KECHB);
        let finalResponse;
        if (fromRedis.isWeekend === "1") {
            finalResponse = Object.assign(Object.assign({}, fromRedis), { isWeekend: true });
        }
        else {
            finalResponse = Object.assign(Object.assign({}, fromRedis), { isWeekend: false });
        }
        res.json(finalResponse);
        logger.info(`Done. Got It Is Week ${finalResponse.week} and isWeekend: ${finalResponse.isWeekend} from redis.`);
    }
    catch (err) {
        next(err);
    }
}));
const handleServingWeek = (redisKey) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info("Getting week from redis key ${REDIS_KEY_KECHG}...");
    try {
        const fromRedis = yield redis.HGETALL(redisKey);
        let finalResponse;
        if (fromRedis.isWeekend === "1") {
            finalResponse = Object.assign(Object.assign({}, fromRedis), { isWeekend: true });
        }
        else {
            finalResponse = Object.assign(Object.assign({}, fromRedis), { isWeekend: false });
        }
        res.json(finalResponse);
        logger.info(`Done. Got It Is Week ${finalResponse.week} and isWeekend: ${finalResponse.isWeekend} from redis.`);
    }
    catch (err) {
        next(err);
    }
});
app.get('/isitweeka/kechb', handleServingWeek(core_1.REDIS_KEY_KECHB));
app.get('/isitweeka/kechg', handleServingWeek(core_1.REDIS_KEY_KECHG));
// Baseline middleware
//app.use(helmet()); // Security
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
// Setup logging here
app.use((0, morgan_1.default)(process.env.NODE_ENV === "development" ? "dev" : "combined"));
app.listen(4000, () => {
    logger.info("Server started.");
});
