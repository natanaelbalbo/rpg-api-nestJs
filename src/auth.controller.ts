import { Controller, Get, Post, Body, Request, UseGuards, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  private oauth2Client: OAuth2Client;

  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {
    this.oauth2Client = new OAuth2Client(
      this.configService.get<string>('GEMINI_CLIENT_ID'),
      this.configService.get<string>('GEMINI_CLIENT_SECRET'),
      this.configService.get<string>('GEMINI_REDIRECT_URI')
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: any) {
    return this.authService.register(createUserDto);
  }

  @Get('google')
  async googleAuth(@Res() res: Response) {
    const authorizeUrl = this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/cloud-platform',
        'https://www.googleapis.com/auth/generative-language.tuning',
        'https://www.googleapis.com/auth/generative-language.retriever'
      ],
    });
    res.redirect(authorizeUrl);
  }

  @Get('google/callback')
  async googleAuthCallback(@Query('code') code: string, @Res() res: Response) {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      this.oauth2Client.setCredentials(tokens);

      // Exibir tokens no console para serem adicionados ao .env
      console.log('Access Token:', tokens.access_token);
      console.log('Refresh Token:', tokens.refresh_token);

      res.send('Authentication successful! Check the console for tokens.');
    } catch (error) {
      console.error('Error retrieving tokens:', error);
      res.status(500).send('Authentication failed.');
    }
  }
}
