import styles from './StatCard.module.css'

export function StatCard({ label, value, icon: Icon }) {
    return (
        <article className={styles.card}>
            <div className={styles.topRow}>
                <span className={styles.label}>{label}</span>
                {Icon ? <Icon className={styles.icon} aria-hidden="true" /> : null}
            </div>
            <div className={styles.value}>{value}</div>
        </article>
    )
}