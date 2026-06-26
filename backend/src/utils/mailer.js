import nodemailer from 'nodemailer';
import { env } from './env.js';

const transporter = nodemailer.createTransport({
  host: env('SMTP_HOST'),
  port: Number(env('SMTP_PORT', '587')),
  secure: env('SMTP_SECURE', 'false') === 'true',
  auth: {
    user: env('SMTP_USER'),
    pass: env('SMTP_PASSWORD'),
  },
});

export function sendMail({ to, replyTo, subject, text }) {
  return transporter.sendMail({
    from: env('MAIL_FROM'),
    to,
    replyTo,
    subject,
    text,
  });
}
