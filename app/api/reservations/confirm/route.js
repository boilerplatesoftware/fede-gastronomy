import { Resend } from "resend";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

function compileTemplate(templateName, data) {
    const baseTemplatePath = path.join(process.cwd(), "lib/emails/base.handlebars");
    const itemTemplatePath = path.join(process.cwd(), `lib/emails/${templateName}.handlebars`);

    const baseSource = fs.readFileSync(baseTemplatePath, "utf-8");
    const itemSource = fs.readFileSync(itemTemplatePath, "utf-8");

    const baseTemplate = Handlebars.compile(baseSource);
    const itemTemplate = Handlebars.compile(itemSource);

    const bodyContent = itemTemplate(data);
    return baseTemplate({ ...data, body: bodyContent });
}

export async function POST(req) {
    try {
        const body = await req.json();

        const {
            reservationId,
            customerEmail,
            customerName,
            date,
            time,
            guests,
            location,
            menuName,
            total,
            notes,
        } = body;

        if (!process.env.RESEND_API_KEY) {
            return Response.json({ error: "Missing RESEND_API_KEY" }, { status: 500 });
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const from = process.env.FROM_EMAIL;

        if (!adminEmail || !from) {
            return Response.json({ error: "Missing ADMIN_EMAIL or FROM_EMAIL" }, { status: 500 });
        }

        if (!customerEmail || !reservationId) {
            return Response.json({ error: "Missing data" }, { status: 400 });
        }

        const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!EMAIL_REGEX.test(customerEmail)) {
            return Response.json({ error: "Invalid email format" }, { status: 400 });
        }

        const templateData = {
            reservationId,
            customerEmail,
            customerName: customerName || "Guest",
            date,
            time: time || "To be confirmed",
            guests,
            location: location || "Fede Gastronomy (Private)",
            menuName,
            total,
            notes,
        };

        // 1) admin
        let adminResult, customerResult;

        try {
            const adminHtml = compileTemplate("admin-notification", templateData);
            adminResult = await resend.emails.send({
                from,
                to: adminEmail,
                replyTo: customerEmail,
                subject: `🛎️ Nueva Reserva — #${reservationId} (${templateData.customerName})`,
                html: adminHtml,
            });

            if (adminResult.error) {
                console.error("ADMIN RESEND ERROR:", adminResult.error);
                return Response.json({ error: "Admin email failed", details: adminResult.error }, { status: 400 });
            }
        } catch (e) {
            console.error("ADMIN SEND EXCEPTION:", e);
            return Response.json({ error: "Admin email exception", details: String(e) }, { status: 500 });
        }

        // 2) customer
        try {
            const customerHtml = compileTemplate("customer-confirmation", templateData);
            customerResult = await resend.emails.send({
                from,
                to: customerEmail,
                subject: `Confirmación de su Experiencia Gastronómica — #${reservationId}`,
                html: customerHtml,
            });

            if (customerResult.error) {
                console.error("CUSTOMER RESEND ERROR:", customerResult.error);
                return Response.json({
                    error: "Customer email failed",
                    details: customerResult.error,
                    adminResult: adminResult.data
                }, { status: 400 });
            }
        } catch (e) {
            console.error("CUSTOMER SEND EXCEPTION:", e);
            return Response.json({ error: "Customer email exception", details: String(e), adminResult }, { status: 500 });
        }

        return Response.json({ ok: true, adminResult, customerResult });
    } catch (error) {
        console.error("Resend/Handlebars Error:", error);
        return Response.json(
            { error: "Email failure", details: error?.message || String(error) },
            { status: 500 }
        );
    }
}
