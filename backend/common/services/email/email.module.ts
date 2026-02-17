import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { TemplateService } from './template.service';

@Module({
	imports: [
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				transport: {
					host: configService.get<string>('EMAIL_HOST', 'smtp.gmail.com'),
					port: configService.get<number>('EMAIL_PORT', 587),
					secure: false,
					auth: {
						user: configService.get<string>('EMAIL_USER'),
						pass: configService.get<string>('EMAIL_PASSWORD'),
					},
				},
				defaults: {
					from: configService.get<string>('EMAIL_FROM', 'noreply@vsmcompanies.ca'),
				},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [EmailService, TemplateService],
	exports: [EmailService],
})
export class EmailModule {}
