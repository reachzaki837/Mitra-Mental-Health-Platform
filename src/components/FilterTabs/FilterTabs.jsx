import styles from './FilterTabs.module.css'
import { DEFAULT_FILTER_OPTIONS } from './filterOptions'

export function FilterTabs({ options = DEFAULT_FILTER_OPTIONS, value, onChange }) {
    return (
        <div className={styles.tabs} role="tablist" aria-label="Flag filters">
            {options.map((option) => {
                const active = option.value === value

                return (
                    <button
                        key={option.value}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        className={`${styles.tab} ${active ? styles.active : styles.inactive}`}
                        onClick={() => onChange?.(option.value)}
                    >
                        {option.label}
                    </button>
                )
            })}
        </div>
    )
}