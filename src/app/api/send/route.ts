import EmailTemplate from '@/components/AlertEmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  return Response.json('Working');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'HealthSync <onboarding@resend.dev>',
      to: [body.email],
      subject: `Urgent: Stock Level Alert for ${body.item}`,
      react: EmailTemplate({
        item: body.item,
        currentLevel: body.currentLevel,
        thresholdLevel: body.thresholdLevel,
        timestamp: body.timestamp,
        link: body.link,
        personName: body.personName
      })
    });
    console.log(error);
    return Response.json('Message sent successfully');
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
