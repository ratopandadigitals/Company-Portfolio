
import nodemailer from 'nodemailer'

type SendEmailOptions = {
  to: string
  subject: string
  text: string
  replyTo?: string
}

export const sendEmail = async ({
  to,
  subject,
  text,
  replyTo,
}: SendEmailOptions) => {
  const smtpUser = process.env.SMTP_USER
  const smtpPassword = process.env.SMTP_PASSWORD

  if (!smtpUser || !smtpPassword) {
    throw new Error('SMTP_USER and SMTP_PASSWORD must be configured.')
  }

  const port = Number(process.env.SMTP_PORT ?? 465)

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port,
    secure: port === 465,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  })

  return transporter.sendMail({
    from: smtpUser,
    to,
    subject,
    text,
    ...(replyTo ? { replyTo } : {}),
  })
}
