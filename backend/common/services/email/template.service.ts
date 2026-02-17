import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as handlebars from 'handlebars';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { BaseEmailTemplateData } from './interfaces/email-template.interface';

@Injectable()
export class TemplateService {
	private templateCache = new Map<string, HandlebarsTemplateDelegate>();

	constructor(private readonly configService: ConfigService) {}

	private getTemplatePath(templateName: string): string {
		const templateFileName = `${templateName}.hbs`;

		// Try multiple possible paths
		const possiblePaths = [
			// For development (source files)
			join(process.cwd(), 'src', 'common', 'services', 'email', 'templates', templateFileName),
			// For production (if templates are copied to dist)
			join(__dirname, 'templates', templateFileName),
			// Alternative production path
			join(process.cwd(), 'dist', 'common', 'services', 'email', 'templates', templateFileName),
		];

		for (const path of possiblePaths) {
			if (existsSync(path)) {
				return path;
			}
		}

		throw new Error(
			`Template file not found: ${templateFileName}. Searched paths: ${possiblePaths.join(', ')}`,
		);
	}

	private compileTemplate(templateName: string): HandlebarsTemplateDelegate {
		if (this.templateCache.has(templateName)) {
			return this.templateCache.get(templateName);
		}

		const templatePath = this.getTemplatePath(templateName);
		const templateSource = readFileSync(templatePath, 'utf8');
		const compiledTemplate = handlebars.compile(templateSource);

		this.templateCache.set(templateName, compiledTemplate);
		return compiledTemplate;
	}

	private getBaseTemplateData(): Partial<BaseEmailTemplateData> {
		return {
			companyName: 'VSM Companies',
			logoUrl: this.configService.get<string>('COMPANY_LOGO_URL'),
			companyAddress: this.configService.get<string>('COMPANY_ADDRESS'),
			supportEmail: this.configService.get<string>('SUPPORT_EMAIL', 'support@vsmcompanies.ca'),
			unsubscribeUrl: this.configService.get<string>('UNSUBSCRIBE_URL'),
		};
	}

	renderTemplate(templateName: string, data: any): string {
		const template = this.compileTemplate(templateName);
		const templateData = {
			...this.getBaseTemplateData(),
			...data,
		};

		return template(templateData);
	}

	clearCache(): void {
		this.templateCache.clear();
	}
}
