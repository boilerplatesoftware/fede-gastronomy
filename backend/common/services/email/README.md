# Email Service with Handlebars Templates

This email service has been updated to use Handlebars templates for better maintainability and flexibility.

## Features

- ✅ Custom Handlebars template engine integration
- ✅ Type-safe template data interfaces  
- ✅ Configurable template variables via environment
- ✅ Clean separation of HTML and logic
- ✅ Extensible architecture for multiple email types
- ✅ Template caching for improved performance
- ✅ Direct Handlebars compilation (avoids adapter compatibility issues)

## Current Templates

### Password Reset Email
- **Template:** `password-reset.hbs`
- **Interface:** `PasswordResetTemplateData`
- **Usage:** `sendPasswordResetEmail(email, resetToken, userName?)`

## Template Variables

All templates support these base variables:
- `companyName` - Company name (default: "VSM Companies")
- `logoUrl` - Company logo URL (from env: `COMPANY_LOGO_URL`)
- `companyAddress` - Company address (from env: `COMPANY_ADDRESS`) 
- `supportEmail` - Support email (from env: `SUPPORT_EMAIL`)
- `unsubscribeUrl` - Unsubscribe URL (from env: `UNSUBSCRIBE_URL`)

### Password Reset Specific Variables
- `userName` - User's name (optional)
- `resetUrl` - Password reset URL with token
- `expirationTime` - Token expiration time (default: "1 hour")

## Environment Variables

Add these optional variables to your `.env` file:

```env
# Email Template Configuration
COMPANY_LOGO_URL=https://your-domain.com/logo.png
COMPANY_ADDRESS=Your Company Address
SUPPORT_EMAIL=support@vsmcompanies.ca
UNSUBSCRIBE_URL=https://your-domain.com/unsubscribe
```

## Adding New Templates

1. **Create the template file:**
   ```bash
   # Create new template
   touch src/common/services/email/templates/welcome.hbs
   ```

2. **Add template data interface:**
   ```typescript
   // In email-template.interface.ts
   export interface WelcomeTemplateData extends BaseEmailTemplateData {
     userName: string;
     activationUrl: string;
   }
   
   export enum EmailTemplateType {
     PASSWORD_RESET = 'password-reset',
     WELCOME = 'welcome', // Add new type
   }
   ```

3. **Add service method:**
   ```typescript
   // In email.service.ts
   async sendWelcomeEmail(email: string, userName: string, activationUrl: string): Promise<void> {
     const templateData: WelcomeTemplateData = {
       companyName: 'VSM Companies',
       userName,
       activationUrl,
       supportEmail: this.configService.get<string>('SUPPORT_EMAIL'),
       // ... other base template data
     };

     await this.mailerService.sendMail({
       to: email,
       subject: 'Welcome to VSM Companies',
       template: EmailTemplateType.WELCOME,
       context: templateData,
     });
   }
   ```

## Template Structure

Templates are located in `src/common/services/email/templates/` and use the `.hbs` extension.

### Template Syntax Examples

```handlebars
<!-- Conditional content -->
{{#if userName}}
  <p>Hello, {{userName}}!</p>
{{else}}
  <p>Hello!</p>
{{/if}}

<!-- Optional content -->
{{#if logoUrl}}
  <img src="{{logoUrl}}" alt="{{companyName}}">
{{/if}}

<!-- Variables -->
<h1>{{companyName}}</h1>
<a href="{{resetUrl}}">Reset Password</a>
```

## Build Process

The email service uses a custom template loading system that works in both development and production:

1. **Development:** Templates are loaded directly from `src/common/services/email/templates/`
2. **Production:** Templates are copied to `dist/common/services/email/templates/` during build

### Build Commands

```bash
# Build application and copy templates
npm run build

# Copy templates only (useful during development)
npm run build:templates
```

### Path Resolution

The `TemplateService` automatically resolves template paths by checking multiple locations:
1. Source directory (for development)
2. Dist directory (for production)
3. Alternative production paths

## Benefits

- **Maintainability:** HTML templates separated from TypeScript code
- **Consistency:** Reusable base template data across all emails
- **Flexibility:** Easy to customize templates without code changes
- **Type Safety:** TypeScript interfaces ensure correct template data
- **Scalability:** Simple to add new email types and templates
- **Build Integration:** Automatic template copying during build process
