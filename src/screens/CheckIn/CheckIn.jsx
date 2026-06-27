import styles from './CheckIn.module.css'

function ArrowLeftIcon(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path d="M11 6 5 12l6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 12H5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    )
}

const OUTCOME_OPTIONS = [
    {
        value: 'fine',
        title: 'Student was fine',
        description: 'They explained their absence or seem genuinely okay.',
    },
    {
        value: 'low',
        title: 'Student seemed low',
        description: 'Quiet or withdrawn — shared resources and will monitor.',
    },
    {
        value: 'distress',
        title: 'Student disclosed distress',
        description: 'Shared something serious — escalate or refer for support.',
    },
    {
        value: 'unreachable',
        title: 'Could not reach student',
        description: 'No response to outreach — will try another channel.',
    },
]

function RadioCircle({ selected }) {
    return (
        <span className={`${styles.radio} ${selected ? styles.radioSelected : ''}`} aria-hidden="true">
            {selected ? (
                <svg viewBox="0 0 24 24" className={styles.radioIcon} aria-hidden="true">
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

export function CheckIn({ flag, outcome, note, onOutcomeChange, onNoteChange, onBack, onSubmit }) {
    const canSubmit = Boolean(outcome)

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.container}>
                    <button type="button" className={styles.backButton} onClick={onBack}>
                        <ArrowLeftIcon className={styles.backIcon} />
                        Back to {flag.id}
                    </button>

                    <header className={styles.header}>
                        <div>
                            <h1 className={styles.heading}>Log a check-in</h1>
                            <p className={styles.subtext}>How did your outreach go with {flag.id}?</p>
                        </div>
                    </header>

                    <section className={styles.optionList} aria-label="Check-in outcomes">
                        {OUTCOME_OPTIONS.map((option) => {
                            const selected = outcome === option.value

                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={`${styles.optionCard} ${selected ? styles.optionSelected : ''}`}
                                    onClick={() => onOutcomeChange(option.value)}
                                >
                                    <RadioCircle selected={selected} />
                                    <div className={styles.optionCopy}>
                                        <span className={styles.optionTitle}>{option.title}</span>
                                        <span className={styles.optionDescription}>{option.description}</span>
                                    </div>
                                </button>
                            )
                        })}
                    </section>

                    <section className={styles.notesSection}>
                        <label className={styles.notesLabel} htmlFor="checkin-notes">
                            Notes (optional)
                        </label>
                        <textarea
                            id="checkin-notes"
                            className={styles.notesInput}
                            rows={3}
                            placeholder="Add context for your reference. Visible only to you and a counsellor if escalated."
                            value={note}
                            onChange={(event) => onNoteChange(event.target.value)}
                        />
                    </section>

                    <button type="button" className={styles.submitButton} disabled={!canSubmit} onClick={onSubmit}>
                        Save Check-in
                    </button>
                </div>
            </main>
        </div>
    )
}