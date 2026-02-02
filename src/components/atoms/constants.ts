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
        /* '&.Mui-focused fieldset': {
            borderColor: 'var(--primary-color)', // 👈 your focus color
            borderWidth: 2,
        }, */
    },

}
