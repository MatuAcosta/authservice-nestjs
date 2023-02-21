import { Module } from '@nestjs/common';
import { MailService } from './mail/mail.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  exports: [MailService],
  providers: [MailService]
})
export class MailsenderModule {}
