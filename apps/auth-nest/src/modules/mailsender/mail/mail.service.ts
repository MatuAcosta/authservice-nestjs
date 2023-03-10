import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class MailService {

    constructor(private readonly configService: ConfigService){
        SendGrid.setApiKey(process.env.SEND_GRID_API_KEY);
        console.log(process.env.SEND_GRID_API_KEY)
    }

    async send(mail: SendGrid.MailDataRequired){
        const send = await SendGrid.send(mail);
        console.log(mail);
        return send;
    }

}

