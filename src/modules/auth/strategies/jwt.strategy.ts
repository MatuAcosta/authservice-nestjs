import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../jwt.constants';
import { AuthService } from '../service/auth.service';

// This code defines a JWT (JSON Web Token) strategy for authentication in a Nest.js application.
//The JwtStrategy class extends the PassportStrategy class from the @nestjs/passport package

//The JwtStrategy class uses the Strategy class from the passport-jwt package to define a JWT-based authentication strategy. The jwtFromRequest property is set to ExtractJwt.fromAuthHeaderAsBearerToken(), indicating that the JWT will be extracted from the Authorization header in the form of a bearer token. The ignoreExpiration property is set to false to ensure that expired tokens are not accepted. The secretOrKey property is set to the value of the secret property from the jwtConstants file, which is used to sign and verify JWTs.

//The validate method is called by Passport when a user is trying to authenticate with a JWT. The method takes the JWT payload as an argument and returns an object containing the sub and email properties from the payload. In this example, the method logs the payload to the console, but in a real-world scenario, it might perform additional validation or retrieve additional data from a database.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async isAdmin(email:string){
    return this.authService.validateRole(email);
  } 

  async validate(payload: any) {
    return payload;
  }
}