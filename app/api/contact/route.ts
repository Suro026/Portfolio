import { NextResponse } from 'next/server'
import fs from 'fs/promises'

type Submission = {
  name: string
  email: string
  message: string
  createdAt: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const submission: Submission = {
      name: String(name),
      email: String(email),
      message: String(message),
      createdAt: new Date().toISOString(),
    }

    // Ensure submissions directory exists and append newline-delimited JSON
    const dir = './submissions'
    await fs.mkdir(dir, { recursive: true })
    const file = `${dir}/contact-submissions.jsonl`
    await fs.appendFile(file, JSON.stringify(submission) + '\n')

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Error in /api/contact', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
