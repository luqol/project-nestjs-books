import { Body, Controller, Post, Delete, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('/register')
    register( @Body() registrationData: RegisterDTO) {
        return this.authService.register(registrationData);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Response() res) {
        const tokens = await this.authService.createSession(req.user);
        res.cookie('auth', tokens, { httpOnly: true });
        res.send({
          message: 'success',
        });
      }

    @UseGuards(JwtAuthGuard)
    @Delete('logout')
    async logout(@Response() res) {
      res.clearCookie('auth', { httpOnly: true });
      res.send({
        message: 'success',
      });
    }

}