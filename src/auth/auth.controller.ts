import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('/register')
    register( @Body() registrationData: RegisterDTO) {
        return this.authService.register(registrationData);
    }
}
