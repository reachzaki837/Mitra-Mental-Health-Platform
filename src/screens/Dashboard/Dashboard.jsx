import { FilterTabs } from '../../components/FilterTabs/FilterTabs'
import { DEFAULT_FILTER_OPTIONS } from '../../components/FilterTabs/filterOptions'
import { FlagCard } from '../../components/FlagCard/FlagCard'
import { Header } from '../../components/Header/Header'
import { StatCard } from '../../components/StatCard/StatCard'
import styles from './Dashboard.module.css'

function FlagsIcon(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path
                d="M5 4v16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M7 5c2.5-1 4.5-1 7 0s4.5 1 7 0v8c-2.5 1-4.5 1-7 0s-4.5-1-7 0z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function AlertIcon(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path
                d="M12 4 2.8 20h18.4L12 4Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path d="M12 9v5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="16.7" r="1" fill="currentColor" />
        </svg>
    )
}

function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path
                d="M20 7 10 17l-4-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function useFilteredFlags(flags, filter) {
    if (filter === 'all') return flags
    return flags.filter((flag) => flag.status === filter || flag.severity === filter)
}

function countSeverity(flags, severity) {
    return flags.filter((flag) => flag.status === 'active' && flag.severity === severity).length
}

function countResolved(flags) {
    return flags.filter((flag) => flag.status === 'resolved').length
}

function countActive(flags) {
    return flags.filter((flag) => flag.status === 'active').length
}

function getUrgentCount(flags) {
    return countSeverity(flags, 'high')
}

function PrivacyStrip() {
    return (
        <section className={styles.privacyStrip}>
            <AlertIcon className={styles.stripIcon} />
            <p className={styles.privacyText}>
                {'Student identities are never stored here. IDs are system-generated and cannot\nbe reverse-traced without institutional IT access.'}
            </p>
        </section>
    )
}

export function Dashboard({ flags, filter, onFilterChange, onSelectFlag }) {
    const visibleFlags = useFilteredFlags(flags, filter)
    const activeCount = countActive(flags)
    const urgentCount = getUrgentCount(flags)
    const resolvedCount = countResolved(flags)
    const totalFlagged = flags.length

    return (
        <div className={styles.page}>
            <Header urgentCount={urgentCount} showUrgent={urgentCount > 0} />

            <main className={styles.main}>
                <div className={styles.container}>
                    <section className={styles.metricsRow} aria-label="Dashboard summary">
                        <StatCard label="Active Flags" value={activeCount} icon={FlagsIcon} />
                        <StatCard label="Urgent (High)" value={urgentCount} icon={AlertIcon} />
                        <StatCard label="Resolved" value={resolvedCount} icon={CheckIcon} />
                        <StatCard label="Total Flagged" value={totalFlagged} icon={FlagsIcon} />
                    </section>

                    <PrivacyStrip />

                    <section className={styles.filtersSection}>
                        <FilterTabs options={DEFAULT_FILTER_OPTIONS} value={filter} onChange={onFilterChange} />
                    </section>

                    <section className={styles.flagsSection} aria-label="Flagged students">
                        {visibleFlags.map((flag) => (
                            <FlagCard key={flag.id} flag={flag} onClick={onSelectFlag} />
                        ))}
                    </section>
                </div>
            </main>
        </div>
    )
}