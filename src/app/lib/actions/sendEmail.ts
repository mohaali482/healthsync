import EmailTemplate from '@/components/AlertEmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail({
  item,
  currentLevel,
  thresholdLevel,
  timestamp,
  link,
  email,
  personName
}: {
  item: string;
  currentLevel: number;
  thresholdLevel: number;
  timestamp: string;
  link: string;
  email: string;
  personName: string;
}) {
  const { data, error } = await resend.emails.send({
    from: '<onboarding@resend.dev>',
    to: [email],
    subject: `Urgent: Stock Level Alert for ${item}`,
    react: EmailTemplate({
      item,
      currentLevel,
      thresholdLevel,
      timestamp,
      link,
      personName
    })
  });

  return error;
}
