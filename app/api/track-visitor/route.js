import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = '8103676783:AAGnnUDAZjYqVUtoaSyuTgdGReWWdVH_yrg';
const TELEGRAM_CHAT_ID = '-1002806502052';

export async function POST(request) {
    try {
        const { userAgent, page, referrer } = await request.json();

        // Get real IP from headers (works on Vercel, Netlify, etc.)
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0].trim() : (request.headers.get('x-real-ip') || 'Unknown');

        // Parse device type from user agent
        const ua = userAgent || '';
        let device = '🖥️ Desktop';
        if (/Mobile|Android|iPhone|iPad|iPod/i.test(ua)) {
            device = /iPad/i.test(ua) ? '📱 Tablet' : '📱 Mobile';
        }

        // Parse browser
        let browser = 'Unknown';
        if (/Edg\//i.test(ua)) browser = 'Edge';
        else if (/Chrome/i.test(ua)) browser = 'Chrome';
        else if (/Firefox/i.test(ua)) browser = 'Firefox';
        else if (/Safari/i.test(ua)) browser = 'Safari';
        else if (/Opera|OPR/i.test(ua)) browser = 'Opera';

        // Parse OS
        let os = 'Unknown';
        if (/Windows/i.test(ua)) os = 'Windows';
        else if (/Mac OS X/i.test(ua)) os = 'macOS';
        else if (/Android/i.test(ua)) os = 'Android';
        else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
        else if (/Linux/i.test(ua)) os = 'Linux';

        const now = new Date().toLocaleString('en-US', {
            timeZone: 'Africa/Casablanca',
            dateStyle: 'medium',
            timeStyle: 'short'
        });

        const message = `
🌐 *New Visitor — Bianca Butler Christa*

🕐 *Time:* ${now} (Morocco)
📄 *Page:* ${page || '/'}
🔗 *Referrer:* ${referrer || 'Direct'}

📍 *IP Address:* \`${ip}\`
${device}
🌍 *OS:* ${os}
🧭 *Browser:* ${browser}
        `.trim();

        const telegramRes = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'Markdown'
                })
            }
        );

        if (!telegramRes.ok) {
            const err = await telegramRes.text();
            console.error('Telegram error:', err);
            return NextResponse.json({ ok: false, error: err }, { status: 500 });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('Visitor track error:', err);
        return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
}
