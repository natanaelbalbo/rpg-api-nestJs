import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
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
}
