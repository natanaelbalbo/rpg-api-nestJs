import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GeminiService {
  private oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new OAuth2Client(
      process.env.GEMINI_CLIENT_ID,
      process.env.GEMINI_CLIENT_SECRET,
      process.env.GEMINI_REDIRECT_URI
    );

    if (process.env.GEMINI_ACCESS_TOKEN && process.env.GEMINI_REFRESH_TOKEN) {
      this.oauth2Client.setCredentials({
        access_token: process.env.GEMINI_ACCESS_TOKEN,
        refresh_token: process.env.GEMINI_REFRESH_TOKEN,
      });
    }
  }

  private async getAccessToken(): Promise<string> {
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

  async generateCharacterBackground(characterData: any): Promise<string> {
    const prompt = `Create a background story for a character with the following details: ${JSON.stringify(characterData)};`;

    try {
      const accessToken = await this.getAccessToken();
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent',
        {
          contents: [{ parts: [{ text: prompt }] }]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      if (response.data && response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content) {
        return response.data.candidates[0].content;
      } else {
        console.error('Unexpected response structure:', response.data);
        throw new Error('Failed to generate character background due to unexpected response structure.');
      }
    } catch (error) {
      console.error('Error generating character background:', error.response ? error.response.data : error.message);
      throw new Error('Failed to generate character background.');
    }
  }

  async generateAdventure(characterDetails: any[]): Promise<string> {
    const prompt = `Create an adventure for the following group of characters: ${JSON.stringify(characterDetails)}`;

    try {
      const accessToken = await this.getAccessToken();
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent',
        {
          contents: [{ parts: [{ text: prompt }] }]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      if (response.data && response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content) {
        return response.data.candidates[0].content;
      } else {
        console.error('Unexpected response structure:', response.data);
        throw new Error('Failed to generate adventure due to unexpected response structure.');
      }
    } catch (error) {
      console.error('Error generating adventure:', error.response ? error.response.data : error.message);
      throw new Error('Failed to generate adventure.');
    }
  }
}
