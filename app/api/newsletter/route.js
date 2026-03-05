import crypto from "crypto";

export async function POST(req) {
    try {
        const { email, firstName } = await req.json();

        if (!email) {
            return Response.json({ error: "Email is required" }, { status: 400 });
        }

        // Strip quotes and whitespace
        const sanitize = (val) => val?.trim().replace(/^["'](.+)["']$/, '$1');

        const apiKey = sanitize(process.env.MAILCHIMP_API_KEY);
        const audienceId = sanitize(process.env.MAILCHIMP_AUDIENCE_ID);
        const serverPrefix = sanitize(process.env.MAILCHIMP_SERVER_PREFIX);

        console.log("Newsletter Debug - Config:", {
            serverPrefix,
            audienceId,
            keyLength: apiKey?.length,
            hasSuffix: apiKey?.includes("-"),
            suffixMatch: apiKey?.endsWith(`-${serverPrefix}`)
        });

        if (!apiKey || !audienceId || !serverPrefix) {
            return Response.json({ error: "Missing Mailchimp env vars" }, { status: 500 });
        }

        // Mailchimp usa hash MD5 del email lowercased para identificar el miembro
        const subscriberHash = crypto
            .createHash("md5")
            .update(email.toLowerCase())
            .digest("hex");

        const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members/${subscriberHash}`;
        console.log("Newsletter Debug - URL:", url);

        // status:
        // - "pending" = double opt-in (recomendado)
        // - "subscribed" = suscripción directa
        const payload = {
            email_address: email,
            status_if_new: "subscribed",
            status: "subscribed",
            merge_fields: firstName ? { FNAME: firstName } : {},
            tags: ["newsletter"],
        };

        const r = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${Buffer.from(`any:${apiKey}`).toString("base64")}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await r.json();

        if (!r.ok) {
            console.error("Mailchimp API Error Detail:", JSON.stringify(data, null, 2));

            // If it's a merge field error, suggest checking the Audience settings
            if (data.title?.includes("Invalid Merge Fields")) {
                const invalidFields = data.errors?.map(err => err.field).join(", ");
                return Response.json({
                    error: `The fields [${invalidFields}] are missing in your Mailchimp Audience settings. Please check your Merge Tags or remove the First Name field.`,
                    details: data.errors
                }, { status: 400 });
            }

            return Response.json({ error: data?.detail || "Mailchimp error", status: r.status }, { status: 400 });
        }

        return Response.json({ ok: true });
    } catch (e) {
        console.error("Newsletter API Error:", e);
        return Response.json({ error: "Server error", details: e.message }, { status: 500 });
    }
}
