"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const google_auth_library_1 = require("google-auth-library");
let GeminiService = class GeminiService {
    constructor() {
        this.oauth2Client = new google_auth_library_1.OAuth2Client(process.env.GEMINI_CLIENT_ID, process.env.GEMINI_CLIENT_SECRET, process.env.GEMINI_REDIRECT_URI);
        if (process.env.GEMINI_ACCESS_TOKEN && process.env.GEMINI_REFRESH_TOKEN) {
            this.oauth2Client.setCredentials({
                access_token: process.env.GEMINI_ACCESS_TOKEN,
                refresh_token: process.env.GEMINI_REFRESH_TOKEN,
            });
        }
    }
    async getAccessToken() {
        const tokenResponse = await this.oauth2Client.getAccessToken();
        const { token } = tokenResponse;
        if (!token) {
            const newTokens = await this.oauth2Client.refreshAccessToken();
            const newAccessToken = newTokens.credentials.access_token;
            if (!newAccessToken) {
                throw new Error('Failed to retrieve access token.');
            }
            process.env.GEMINI_ACCESS_TOKEN = newAccessToken;
            if (newTokens.credentials.refresh_token) {
                process.env.GEMINI_REFRESH_TOKEN = newTokens.credentials.refresh_token;
            }
            return newAccessToken;
        }
        return token;
    }
    async generateCharacterBackground(characterData) {
        const prompt = `Create a background story for a character with the following details: ${JSON.stringify(characterData)};`;
        try {
            const accessToken = await this.getAccessToken();
            const response = await axios_1.default.post('https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent', {
                contents: [{ parts: [{ text: prompt }] }]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (response.data && response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content) {
                return response.data.candidates[0].content;
            }
            else {
                console.error('Unexpected response structure:', response.data);
                throw new Error('Failed to generate character background due to unexpected response structure.');
            }
        }
        catch (error) {
            console.error('Error generating character background:', error.response ? error.response.data : error.message);
            throw new Error('Failed to generate character background.');
        }
    }
    async generateAdventure(characterDetails) {
        const prompt = `Create an adventure for the following group of characters: ${JSON.stringify(characterDetails)}`;
        try {
            const accessToken = await this.getAccessToken();
            const response = await axios_1.default.post('https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent', {
                contents: [{ parts: [{ text: prompt }] }]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (response.data && response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content) {
                return response.data.candidates[0].content;
            }
            else {
                console.error('Unexpected response structure:', response.data);
                throw new Error('Failed to generate adventure due to unexpected response structure.');
            }
        }
        catch (error) {
            console.error('Error generating adventure:', error.response ? error.response.data : error.message);
            throw new Error('Failed to generate adventure.');
        }
    }
};
exports.GeminiService = GeminiService;
exports.GeminiService = GeminiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GeminiService);
//# sourceMappingURL=serviceApi.js.map