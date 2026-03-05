import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

// This script generates static HTML files for previewing the Gold-Tier templates
const generatePreviews = () => {
    const outputDir = path.join(process.cwd(), "public/email-previews");
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const baseSource = fs.readFileSync(path.join(process.cwd(), "lib/emails/base.handlebars"), "utf-8");
    const baseTemplate = Handlebars.compile(baseSource);

    const dummyData = {
        reservationId: "RES-PREVIEW369",
        customerName: "Julian Rodriguez",
        customerEmail: "julian@luxury.com",
        date: "December 25th, 2026",
        time: "20:00",
        guests: 4,
        location: "Private Reserve — Penthouse",
        menuName: "Gold Tasting Experience",
        total: "$1,200,000 COP",
        notes: "Moderate shellfish allergy. Occasion: Wedding Anniversary."
    };

    const templates = ["customer-confirmation", "admin-notification"];

    templates.forEach(name => {
        const itemSource = fs.readFileSync(path.join(process.cwd(), `lib/emails/${name}.handlebars`), "utf-8");
        const itemTemplate = Handlebars.compile(itemSource);
        const bodyContent = itemTemplate(dummyData);
        const fullHtml = baseTemplate({ ...dummyData, body: bodyContent });

        fs.writeFileSync(path.join(outputDir, `${name}.html`), fullHtml);
        console.log(`Preview generated: public/email-previews/${name}.html`);
    });
};

try {
    generatePreviews();
} catch (e) {
    console.error("Preview Generation Failed:", e);
}
