import styles from './Success.module.css'

function CheckCircleIcon(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8.5 12.2 11 14.7l4.8-5.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function PhoneIcon(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path d="M8 4h3l1.5 4-2 1.6c1 2 2.7 3.7 4.8 4.8L17 12l4 1.5v3c0 1.1-.9 2-2 2C10.9 18.5 5.5 13.1 5.5 6.5c0-1.1.9-2 2-2Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
    )
}

export function Success({ type, flag, onBack }) {
    const title = type === 'escalate' ? 'Escalation confirmed' : 'Check-in logged'
    const body =
        type === 'escalate'
            ? 'The flag has been escalated and your supervising coordinator will be notified.'
            : `Your check-in for ${flag?.id ?? 'this student'} has been saved.`

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.iconCircle} aria-hidden="true">
                        <CheckCircleIcon className={styles.icon} />
                    </div>

                    <h1 className={styles.heading}>{title}</h1>
                    <p className={styles.body}>{body}</p>

                    {type === 'escalate' ? (
                        <div className={styles.teleCard}>
                            <PhoneIcon className={styles.phoneIcon} />
                            <span className={styles.teleNumber}>14416</span>
                        </div>
                    ) : null}

                    <button type="button" className={styles.cta} onClick={onBack}>
                        Back to Dashboard →
                    </button>
                </div>
            </main>
        </div>
    )
}