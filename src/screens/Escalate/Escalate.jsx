import styles from './Escalate.module.css'

function ArrowLeftIcon(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path d="M11 6 5 12l6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 12H5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    )
}

function AlertTriangleIcon(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path
                d="M12 4 2.8 20h18.4L12 4Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path d="M12 9v4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="16.7" r="1" fill="currentColor" />
        </svg>
    )
}

function PhoneIcon(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path
                d="M8 4h3l1.5 4-2 1.6c1 2 2.7 3.7 4.8 4.8L17 12l4 1.5v3c0 1.1-.9 2-2 2C10.9 18.5 5.5 13.1 5.5 6.5c0-1.1.9-2 2-2Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function Checkbox({ checked }) {
    return (
        <span className={`${styles.checkbox} ${checked ? styles.checkboxChecked : ''}`} aria-hidden="true">
            {checked ? (
                <svg viewBox="0 0 24 24" className={styles.checkboxIcon} aria-hidden="true">
                    <path
                        d="M19 7 10 16l-5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ) : null}
        </span>
    )
}

function HelpCard({ label, title, subtext, phone, prominent = false, footerNote = '' }) {
    return (
        <article className={`${styles.helpCard} ${prominent ? styles.helpCardPrimary : styles.helpCardSecondary}`}>
            <div className={styles.helpCardCopy}>
                <div className={styles.helpLabel}>{label}</div>
                <div className={styles.helpTitle}>{title}</div>
                <div className={styles.helpSubtext}>{subtext}</div>
                {footerNote ? <div className={styles.helpFooter}>{footerNote}</div> : null}
            </div>

            <div className={styles.helpNumberBlock}>
                <span className={styles.helpNumber}>{phone}</span>
                <PhoneIcon className={styles.helpPhoneIcon} />
            </div>
        </article>
    )
}

export function Escalate({ flag, consent, onConsentChange, onBack, onSubmit }) {
    const canSubmit = consent

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.container}>
                    <button type="button" className={styles.backButton} onClick={onBack}>
                        <ArrowLeftIcon className={styles.backIcon} />
                        Back to {flag.id}
                    </button>

                    <section className={styles.banner}>
                        <AlertTriangleIcon className={styles.bannerIcon} />
                        <p className={styles.bannerText}>
                            Use this only when you believe the student needs immediate professional support or there is an imminent safety concern.
                        </p>
                    </section>

                    <header className={styles.header}>
                        <div>
                            <h1 className={styles.heading}>Escalate {flag.id}</h1>
                            <p className={styles.subtext}>{flag.cohort} · {flag.daysActive} days since flag</p>
                        </div>
                    </header>

                    <HelpCard
                        prominent
                        label="PRIMARY — GOVERNMENT HELPLINE"
                        title="Tele-MANAS"
                        subtext="Free · 24/7 · 20+ Indian languages"
                        phone="14416"
                        footerNote="Share this number with the student, or stay with them while they call."
                    />

                    <HelpCard
                        prominent={false}
                        footerNote=""
                        label="SECONDARY — TISS SUPPORT"
                        title="iCall"
                        subtext="Counselling support · TISS Mumbai"
                        phone="9152987821"
                    />

                    <label className={styles.consentCard}>
                        <input
                            type="checkbox"
                            className={styles.hiddenCheckbox}
                            checked={consent}
                            onChange={(event) => onConsentChange(event.target.checked)}
                        />
                        <Checkbox checked={consent} />
                        <span className={styles.consentText}>
                            I believe this student needs support beyond what I can provide as a peer ambassador. I have shared or will share the above resources with them.
                        </span>
                    </label>

                    <button type="button" className={styles.confirmButton} disabled={!canSubmit} onClick={onSubmit}>
                        Confirm Escalation
                    </button>

                    <p className={styles.footerNote}>
                        This flag will be marked escalated. Your supervising coordinator will be notified.
                    </p>
                </div>
            </main>
        </div>
    )
}