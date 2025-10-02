import { forwardRef, Module } from '@nestjs/common';
import { Bcrypt } from './bcrypt/bcrypt';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsuarioModule } from '../usuario/entities/usuario.module';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    forwardRef(() => UsuarioModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy],
  exports: [Bcrypt],
})
export class AuthModule {}
