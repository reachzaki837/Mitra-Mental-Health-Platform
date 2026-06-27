import 'dotenv/config'
import { createServer } from 'node:http'
import Groq from 'groq-sdk'

const port = Number(process.env.PORT || 8787)
const apiKey = process.env.GROQ_API_KEY
const model = process.env.GROQ_MODEL || 'openai/gpt-oss-20b'
const groq = apiKey ? new Groq({ apiKey }) : null

function sendJson(response, statusCode, payload) {
    response.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    })
    response.end(JSON.stringify(payload))
}

function buildSystemPrompt(mode) {
    if (mode === 'draft') {
        return [
            'You write a short peer-ambassador outreach note for a college mental health context.',
            'Keep the tone calm, warm, non-clinical, and supportive.',
            'Do not diagnose or sound like a therapist.',
            'If risk sounds serious, suggest escalation in one sentence.',
        ].join(' ')
    }

    if (mode === 'next') {
        return [
            'You recommend the next step for a peer ambassador working from a student flag.',
            'Keep the answer concise and action-oriented.',
            'Prefer check-in when the signals are mild or moderate.',
            'Recommend escalation when the signs are severe, sustained, or involve imminent safety concerns.',
        ].join(' ')
    }

    return [
        'You explain why a college student mental-health flag was raised.',
        'Summarize the evidence in plain language, using the provided signals and timeline.',
        'Keep the tone calm, careful, and non-alarming.',
        'Do not diagnose or provide therapy advice.',
    ].join(' ')
}

function buildUserPrompt({ mode, question, flag }) {
    const flagSummary = JSON.stringify(
        {
            id: flag?.id,
            cohort: flag?.cohort,
            severity: flag?.severity,
            daysActive: flag?.daysActive,
            signals: flag?.signals,
            timeline: flag?.timeline,
            status: flag?.status,
            outcome: flag?.outcome,
            outcomeNote: flag?.outcomeNote,
        },
        null,
        2,
    )

    if (mode === 'custom') {
        return [
            'Answer the following question using the student context below.',
            'If the question is ambiguous, answer with the safest practical interpretation.',
            `Question: ${question || 'What should I know about this student?'}`,
            'Student context:',
            flagSummary,
        ].join('\n')
    }

    if (mode === 'draft') {
        return [
            'Draft a short outreach message the ambassador could send or say.',
            'Limit it to 3-5 sentences.',
            'Student context:',
            flagSummary,
        ].join('\n')
    }

    if (mode === 'next') {
        return [
            'State the recommended next step and one brief reason.',
            'Student context:',
            flagSummary,
        ].join('\n')
    }

    return [
        'Explain why this student was flagged, in 3-5 bullet points or short sentences.',
        'Student context:',
        flagSummary,
    ].join('\n')
}

async function readJsonBody(request) {
    const chunks = []

    for await (const chunk of request) {
        chunks.push(chunk)
    }

    const rawBody = Buffer.concat(chunks).toString('utf8')
    if (!rawBody) return {}

    return JSON.parse(rawBody)
}

const server = createServer(async (request, response) => {
    if (request.method === 'OPTIONS') {
        sendJson(response, 204, {})
        return
    }

    if (request.url === '/api/llm' && request.method === 'POST') {
        try {
            if (!groq) {
                sendJson(response, 500, {
                    error: 'Groq API key missing',
                    details: 'Set GROQ_API_KEY in your environment before starting the server.',
                })
                return
            }

            const body = await readJsonBody(request)
            const mode = body.mode || 'explain'

            const completion = await groq.chat.completions.create({
                model,
                temperature: 0.2,
                messages: [
                    { role: 'system', content: buildSystemPrompt(mode) },
                    { role: 'user', content: buildUserPrompt(body) },
                ],
            })

            const text = completion?.choices?.[0]?.message?.content?.trim() || 'No response returned from the model.'

            sendJson(response, 200, {
                text,
                model,
                mode,
            })
            return
        } catch (error) {
            sendJson(response, 500, {
                error: 'LLM server error',
                details: error instanceof Error ? error.message : 'Unknown error',
            })
            return
        }
    }

    sendJson(response, 404, { error: 'Not found' })
})

server.listen(port, () => {
    console.log(`Groq LLM server listening on http://127.0.0.1:${port}`)
})