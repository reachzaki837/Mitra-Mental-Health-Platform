import { useState } from 'react'
import styles from './InsightAssistant.module.css'

const PROMPTS = {
    explain: {
        label: 'Explain flag',
        helper: 'Summarize why this student was flagged.',
    },
    draft: {
        label: 'Draft outreach',
        helper: 'Write a short message the ambassador can use.',
    },
    next: {
        label: 'Suggest next step',
        helper: 'Recommend check-in or escalation.',
    },
}

async function requestAssistant({ mode, flag, question }) {
    const response = await fetch('/api/llm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mode, flag, question }),
    })

    const payload = await response.json()

    if (!response.ok) {
        throw new Error(payload?.details || payload?.error || 'Unable to reach the local model.')
    }

    return payload.text
}

export function InsightAssistant({ flag }) {
    const [mode, setMode] = useState('explain')
    const [question, setQuestion] = useState('')
    const [output, setOutput] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handlePreset(nextMode) {
        setMode(nextMode)
        setLoading(true)
        setError('')

        try {
            const text = await requestAssistant({ mode: nextMode, flag })
            setOutput(text)
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Unable to complete the request.')
        } finally {
            setLoading(false)
        }
    }

    async function handleAsk() {
        setLoading(true)
        setError('')

        try {
            const text = await requestAssistant({ mode: 'custom', flag, question })
            setOutput(text)
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Unable to complete the request.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className={styles.panel} aria-label="LLM assistant">
            <div className={styles.header}>
                <div>
                    <div className={styles.label}>Groq LLM assistant</div>
                    <h2 className={styles.title}>Ask Mitra</h2>
                </div>
                <div className={styles.note}>Runs through your Groq API key</div>
            </div>

            <div className={styles.pills}>
                {Object.entries(PROMPTS).map(([value, prompt]) => (
                    <button
                        key={value}
                        type="button"
                        className={`${styles.pill} ${mode === value ? styles.pillActive : ''}`}
                        onClick={() => handlePreset(value)}
                        disabled={loading}
                    >
                        {prompt.label}
                    </button>
                ))}
            </div>

            <p className={styles.helper}>{PROMPTS[mode].helper}</p>

            <div className={styles.customAsk}>
                <textarea
                    className={styles.textarea}
                    rows={3}
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder="Ask a custom question about this student or the next step..."
                />
                <button type="button" className={styles.askButton} onClick={handleAsk} disabled={loading || !question.trim()}>
                    {loading ? 'Thinking...' : 'Ask Mitra'}
                </button>
            </div>

            {error ? <div className={styles.error}>{error}</div> : null}

            {output ? (
                <div className={styles.output} aria-live="polite">
                    {output}
                </div>
            ) : null}
        </section>
    )
}