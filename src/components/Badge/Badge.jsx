import styles from './Badge.module.css'

const toneLabels = {
    high: 'high',
    moderate: 'moderate',
    low: 'low',
    resolved: 'resolved',
}

export function Badge({ tone = 'low', resolved = false, children }) {
    const resolvedTone = resolved ? 'resolved' : tone

    return (
        <span className={`${styles.badge} ${styles[resolvedTone]}`}>
            {resolved ? '✓ ' : ''}
            {children ?? toneLabels[resolvedTone]}
        </span>
    )
}