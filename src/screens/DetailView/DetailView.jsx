import { Badge } from '../../components/Badge/Badge'
import { InsightAssistant } from '../../components/InsightAssistant/InsightAssistant'
import { SignalBars } from '../../components/SignalBars/SignalBars'
import styles from './DetailView.module.css'

function ArrowLeftIcon(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path d="M11 6 5 12l6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 12H5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    )
}

function ClipboardIcon(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <rect x="6" y="5" width="12" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M9 5.5h6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    )
}

function AlertIcon(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path d="M12 4 2.8 20h18.4L12 4Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M12 9v5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="16.7" r="1" fill="currentColor" />
        </svg>
    )
}

function getDropPercentage(signal) {
    if (signal.baseline === 0) return 100
    return Math.round((1 - signal.current / signal.baseline) * 100)
}

function getInterpretation(drop) {
    if (drop === 0) return 'Within normal range'
    if (drop < 30) return 'Mild drop from personal baseline'
    if (drop < 60) return 'Significant drop from baseline'
    if (drop === 100) return 'Complete disengagement'
    return 'Critical — far below personal baseline'
}

function SignalCard({ signal }) {
    const drop = getDropPercentage(signal)
    const tone = drop > 60 ? 'high' : drop > 30 ? 'moderate' : 'low'

    return (
        <article className={`${styles.signalCard} ${styles[tone]}`}>
            <div className={styles.signalCardTop}>
                <span className={styles.signalName}>{signal.label}</span>
                <span className={styles.signalDrop}>↓{drop}%</span>
            </div>

            <SignalBars current={signal.current} baseline={signal.baseline} />

            <div className={styles.signalNumbers}>
                <span>{signal.current}/{signal.baseline}</span>
            </div>

            <p className={styles.signalInterpretation}>{getInterpretation(drop)}</p>
        </article>
    )
}

function TimelineIcon({ last = false }) {
    return <span className={`${styles.timelineDot} ${last ? styles.timelineDotActive : ''}`} aria-hidden="true" />
}

export function DetailView({ flag, onBack, onCheckIn, onEscalate }) {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.container}>
                    <button type="button" className={styles.backButton} onClick={onBack}>
                        <ArrowLeftIcon className={styles.backIcon} />
                        Dashboard
                    </button>

                    <header className={styles.studentHeader}>
                        <div className={styles.studentIdentity}>
                            <div className={styles.identityRow}>
                                <h1 className={styles.studentId}>{flag.id}</h1>
                                <Badge tone={flag.severity}>{flag.severity}</Badge>
                            </div>
                            <p className={styles.studentMeta}>{flag.cohort} · {flag.daysActive} days since flag</p>
                        </div>

                        <div className={styles.actions}>
                            <button type="button" className={styles.primaryAction} onClick={onCheckIn}>
                                <ClipboardIcon className={styles.actionIcon} />
                                Log Check-in
                            </button>
                            <button type="button" className={styles.dangerAction} onClick={onEscalate}>
                                <AlertIcon className={styles.actionIcon} />
                                Escalate to Support
                            </button>
                        </div>
                    </header>

                    <section className={styles.sectionCard}>
                        <div className={styles.sectionLabel}>Why this flag was raised</div>
                        <div className={styles.signalGrid}>
                            {flag.signals.map((signal) => (
                                <SignalCard key={signal.label} signal={signal} />
                            ))}
                        </div>
                    </section>

                    <section className={styles.sectionCard}>
                        <div className={styles.sectionLabel}>Behavioral timeline</div>
                        <div className={styles.timeline}>
                            {flag.timeline.map((entry, index) => {
                                const last = index === flag.timeline.length - 1

                                return (
                                    <div key={`${entry.when}-${entry.note}`} className={styles.timelineItem}>
                                        <div className={styles.timelineRail} aria-hidden="true">
                                            <TimelineIcon last={last} />
                                            {!last ? <span className={styles.timelineLine} /> : null}
                                        </div>
                                        <div className={styles.timelineCopy}>
                                            <div className={styles.timelineTime}>{entry.when}</div>
                                            <p className={`${styles.timelineNote} ${last ? styles.timelineNoteCurrent : ''}`}>{entry.note}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>

                    <section className={styles.reminderStrip}>
                        <p className={styles.reminderText}>
                            <span className={styles.reminderLead}>Remember:</span> These signals are context, not a verdict. Your human judgment matters more than any score.
                        </p>
                    </section>

                    <InsightAssistant flag={flag} />
                </div>
            </main>
        </div>
    )
}