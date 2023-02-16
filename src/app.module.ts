import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { BaseModule } from './modules/base/base.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true},),
    AutomapperModule.forRoot({
      strategyInitializer: classes()
    }),
    DbModule,
    UsersModule,
    RolesModule,
    AuthModule,
    BaseModule  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
