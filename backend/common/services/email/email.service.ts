import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import {
	PasswordResetTemplateData,
	EmailTemplateType,
} from './interfaces/email-template.interface';
import { TemplateService } from './template.service';

@Injectable()
export class EmailService {
	constructor(
		private readonly mailerService: MailerService,
		private readonly configService: ConfigService,
		private readonly templateService: TemplateService,
	) {}

	async sendPasswordResetEmail(
		email: string,
		resetToken: string,
		userName?: string,
	): Promise<void> {
		const resetUrl = `${this.configService.get<string>(
			'FRONTEND_URL',
			'http://localhost:3000',
		)}/reset-password?token=${resetToken}`;

		const templateData: PasswordResetTemplateData = {
			companyName: 'VSM Companies',
			userName,
			resetUrl,
			expirationTime: '1 hour',
			supportEmail: this.configService.get<string>('SUPPORT_EMAIL', 'support@vsmcompanies.ca'),
			logoUrl: this.configService.get<string>('COMPANY_LOGO_URL'),
			companyAddress: this.configService.get<string>('COMPANY_ADDRESS'),
			unsubscribeUrl: this.configService.get<string>('UNSUBSCRIBE_URL'),
		};

		const html = this.templateService.renderTemplate(
			EmailTemplateType.PASSWORD_RESET,
			templateData,
		);

		await this.mailerService.sendMail({
			to: email,
			subject: 'Password Reset Request - VSM Companies',
			html,
		});
	}
}
