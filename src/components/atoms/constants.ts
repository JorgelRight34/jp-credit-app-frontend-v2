export const SX_CONFIG = {
    borderRadius: "0.5rem", // Tailwind's rounded-xl = 1rem
    "& .MuiOutlinedInput-root": {
        borderRadius: "0.5rem",
        '&.Mui-focused': {
            outline: 'none',
        },

        '& fieldset': {
            borderColor: '#e5e7eb',
        },

        '&.Mui-focused fieldset': {
            borderColor: '#6366f1',
            borderWidth: 2,
        },
        // Chrome, Safari, Edge
        '& input[type="date"]::-webkit-calendar-picker-indicator': {
            display: 'none',
            '-WebkitAppearance': 'none',
        },
        // Firefox
        '& input[type="date"]::-moz-calendar-picker-indicator': {
            display: 'none',
        },
        // Remove the clear button as well if needed
        '& input[type="date"]::-webkit-clear-button': {
            display: 'none',
            '-WebkitAppearance': 'none',
        },
        /* '&.Mui-focused fieldset': {
            borderColor: 'var(--primary-color)', // 👈 your focus color
            borderWidth: 2,
        }, */
    },

}
