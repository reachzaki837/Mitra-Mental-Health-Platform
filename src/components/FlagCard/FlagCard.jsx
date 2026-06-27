import { Badge } from '../Badge/Badge'
import { SignalBars } from '../SignalBars/SignalBars'
import styles from './FlagCard.module.css'

function ClockIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.clockIcon}>
            <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path
                d="M12 8v4l2.5 1.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function getSeverityTone(severity) {
    if (severity === 'high') return 'high'
    if (severity === 'moderate') return 'moderate'
    return 'low'
}

function getDropPercentage(signal) {
    if (signal.baseline === 0) return 100
    return Math.round((1 - signal.current / signal.baseline) * 100)
}

function getDropTone(drop) {
    if (drop > 70) return 'high'
    if (drop > 40) return 'moderate'
    return 'low'
}

export function FlagCard({ flag, onClick }) {
    const resolved = flag.status === 'resolved'
    const severityTone = resolved ? 'low' : getSeverityTone(flag.severity)

    return (
        <article
            className={`${styles.card} ${resolved ? styles.resolved : ''}`}
            style={{ '--severity-border': `var(--${severityTone})` }}
            onClick={() => onClick?.(flag.id)}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={(event) => {
                if (!onClick) return
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onClick(flag.id)
                }
            }}
        >
            <div className={styles.topRow}>
                <div className={styles.identityBlock}>
                    <div className={styles.studentRow}>
                        <span className={styles.studentId}>{flag.id}</span>
                        <Badge tone={flag.severity} resolved={resolved}>
                            {resolved ? 'Resolved' : flag.severity}
                        </Badge>
                    </div>

                    <div className={styles.metaRow}>
                        <span className={styles.cohort}>{flag.cohort}</span>
                        <span className={styles.timestamp}>
                            <ClockIcon />
                            {flag.daysActive} days active
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.signalGrid}>
                {flag.signals.map((signal) => {
                    const drop = getDropPercentage(signal)
                    const dropTone = getDropTone(drop)

                    return (
                        <div key={signal.label} className={styles.signalItem}>
                            <div className={styles.signalHeader}>{signal.label}</div>
                            <SignalBars current={signal.current} baseline={signal.baseline} />
                            <div className={styles.signalFooter}>
                                <span className={styles.signalCounts}>
                                    {signal.current}/{signal.baseline}
                                </span>
                                <span className={`${styles.drop} ${styles[dropTone]}`}>↓{drop}%</span>
                            </div>
                        </div>
                    )
                })}
            </div>

            {resolved ? <div className={styles.outcome}>{flag.outcomeNote}</div> : null}
        </article>
    )
}