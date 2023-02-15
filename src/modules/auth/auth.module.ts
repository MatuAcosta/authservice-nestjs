import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './service/auth.service'
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports:[
    PassportModule,
    forwardRef(() => UsersModule ) ,
    RolesModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '86000s'}
    })
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule {}
