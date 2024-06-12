"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingMiddleware = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let LoggingMiddleware = class LoggingMiddleware {
    use(req, res, next) {
        const start = Date.now();
        res.on('finish', () => {
            const duration = Date.now() - start;
            const log = {
                method: req.method,
                url: req.originalUrl,
                statusCode: res.statusCode,
                duration: `${duration}ms`
            };
            const logFilePath = path.join(__dirname, '../logs/requests.json');
            fs.appendFile(logFilePath, JSON.stringify(log) + '\n', err => {
                if (err) {
                    console.error('Error writing log file', err);
                }
            });
        });
        next();
    }
};
exports.LoggingMiddleware = LoggingMiddleware;
exports.LoggingMiddleware = LoggingMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggingMiddleware);
//# sourceMappingURL=logging.middleware.js.map