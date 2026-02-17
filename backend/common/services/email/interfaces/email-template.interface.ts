export interface BaseEmailTemplateData {
	companyName: string;
	logoUrl?: string;
	companyAddress?: string;
	supportEmail?: string;
	unsubscribeUrl?: string;
}

export interface PasswordResetTemplateData extends BaseEmailTemplateData {
	userName?: string;
	resetUrl: string;
	expirationTime: string;
}

export interface EmailTemplate {
	template: string;
	subject: string;
	data: BaseEmailTemplateData;
}

export enum EmailTemplateType {
	PASSWORD_RESET = 'password-reset',
	// Add more template types as needed
	// WELCOME = 'welcome',
	// VERIFICATION = 'verification',
	// NOTIFICATION = 'notification'
}
