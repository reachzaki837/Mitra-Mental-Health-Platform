import styles from './SignalBars.module.css'

export function SignalBars({ current, baseline }) {
    const ratio = baseline === 0 ? 0 : current / baseline
    const filled = Math.round(ratio * 5)
    const color =
        ratio < 0.25 ? 'var(--high)' : ratio < 0.6 ? 'var(--moderate)' : 'var(--low)'

    return (
        <div
            className={styles.signalBars}
            aria-label={`${Math.round(ratio * 100)}% of baseline`}
        >
            {[1, 2, 3, 4, 5].map((index) => (
                <div
                    key={index}
                    className={styles.signalBar}
                    style={{
                        height: `${4 + index * 4}px`,
                        background: index <= filled ? color : 'var(--border)',
                    }}
                />
            ))}
        </div>
    )
}