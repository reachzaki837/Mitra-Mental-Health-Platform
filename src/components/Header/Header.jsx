import styles from './Header.module.css'

function ShieldIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
            <path
                d="M12 3 19 6v5c0 4.6-2.8 8.7-7 10-4.2-1.3-7-5.4-7-10V6l7-3Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path
                d="M9.2 12.2 11 14l3.8-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function UsersIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.avatarIcon}>
            <path
                d="M16 19c0-2.2-1.8-4-4-4s-4 1.8-4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <circle cx="12" cy="9" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
    )
}

export function Header({ urgentCount = 0, showUrgent = false }) {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <div className={styles.brandMark}>
                    <ShieldIcon />
                </div>
                <div className={styles.brandCopy}>
                    <span className={styles.wordmark}>Mitra</span>
                    <span className={styles.divider} aria-hidden="true" />
                    <span className={styles.subtitle}>Peer Ambassador Dashboard</span>
                </div>
            </div>

            <div className={styles.right}>
                {showUrgent ? <span className={styles.urgentPill}>{urgentCount} urgent</span> : null}
                <div className={styles.avatar} aria-hidden="true">
                    <UsersIcon />
                </div>
            </div>
        </header>
    )
}