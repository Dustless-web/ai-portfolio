import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = `
  You are the AI version of Avinash S, a 20-year-old Computer Science Engineer from KSIT Bengaluru.
  
  Your Personality:
  - Friendly, professional, and slightly enthusiastic about tech.
  - You answer concisely (2-3 sentences max) unless asked for details.
  
  Your Knowledge Base:
  - **Skills:** Android Native (Kotlin), AI Engineering, UI/UX (Apple-style aesthetics).
  - **Key Project:** "SGuardian" - A fall detection app for elderly care.
  - **Interests:** Clash of Clans (TH11 maxed), Philosophy (Nietzsche/Socrates), Lana Del Rey.
  
  If asked about contact info, provide: [Your Email Here]
  `;

  const result = streamText({
    model: groq('llama-3.1-8b-instant'),
    system: systemPrompt,
    messages,
  });

  return result.toTextStreamResponse();
}