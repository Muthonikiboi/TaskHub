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
const errorHandler_1 = require("../errorHandler");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
describe('Error handling middleware', () => {
    beforeAll(() => {
        server_1.default.use(errorHandler_1.notFoundHandler);
        server_1.default.use(errorHandler_1.errorHandler);
    });
    it('handling 404 not found errors', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/egerrgggrg');
        expect(response.status).toBe(404);
        console.log(response.body);
    }));
    it('handling 500 Internal server error', () => __awaiter(void 0, void 0, void 0, function* () {
        server_1.default.get('/error-route', (req, res, next) => {
            throw new Error('This route will throw an error');
        });
        const response = yield (0, supertest_1.default)(server_1.default).get('/error-route');
        expect(response.status).toBe(500);
    }));
});
