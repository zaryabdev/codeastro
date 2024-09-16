import Airtable from 'airtable'
import nodemailer from 'nodemailer'
import type { Config } from '@netlify/functions'

export const config: Config = {
  method: 'POST',
}

type Data = {
  companyName?: string
  email: string
  firstName: string
  lastName: string
  projectSummary: string
  timezoneOffset: number
}

function validate({
  email,
  firstName,
  lastName,
  projectSummary,
  timezoneOffset,
}: Data) {
  // TODO: Maybe improve?
  return (
    email &&
    firstName &&
    lastName &&
    projectSummary &&
    timezoneOffset !== undefined
  )
}

function formatEmail(data: Data) {
  return Object.entries(data)
    .map((entry) => entry.join(': '))
    .join('\n\n')
}

function sendEmail(data: Data) {
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  })

  return transporter.sendMail({
    from: 'hello@agath.ist',
    to: 'hello@agath.ist',
    subject: 'New Project Submission',
    text: formatEmail(data),
  })
}

function addToAirtable(data: Data) {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
    process.env.AIRTABLE_BASE_ID as string
  )

  return base(process.env.AIRTABLE_TABLE_KEY as string).create(data)
}

export default async function (req: Request) {
  const data = await req.json()
  const isValid = validate(data)

  if (!isValid) return new Response('failure', { status: 400 })

  return await Promise.all([sendEmail(data), addToAirtable(data)])
    .then(() => {
      return new Response('success', { status: 200 })
    })
    .catch((err) => {
      console.log(err)
      return new Response('failure', { status: 500 })
    })
}
