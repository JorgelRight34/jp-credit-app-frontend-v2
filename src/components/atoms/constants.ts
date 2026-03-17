export const SX_CONFIG = {
    borderRadius: "0.5rem", // Tailwind's rounded-xl = 1rem
    "& .MuiInputLabel-root": {        // ← moved up, outside MuiOutlinedInput-root
        color: "var(--text-muted)",
    },
    '& .MuiInputBase-input': { fontSize: 'inherit' },
    '& .MuiInputHelperText-root': { fontSize: 'inherit' },
    "& .MuiOutlinedInput-root": {
        borderRadius: "0.5rem",
        backgroundColor: "var(--surface)",
        '&.Mui-focused': {
            outline: 'none',
        },
        fontSize: 'inherit',

        '& fieldset': {
            borderColor: 'var(--bs-border-color)',
        },

        '&.Mui-disabled': {
            backgroundColor: 'var(--surface-disabled, #f3f4f6)',
            boxShadow: 'none',

            '& fieldset': {
                borderColor: '#e5e7eb !important',
            },

            '& .MuiInputBase-input': {
                color: 'var(--text-disabled, #9ca3af)',
                WebkitTextFillColor: 'var(--text-disabled, #9ca3af)', // overrides browser default
                cursor: 'not-allowed',
            },

            '& .MuiSelect-icon': {
                color: 'var(--text-disabled, #9ca3af)',
            },
        },

        '&:hover fieldset': {
            borderColor: 'var(--text-muted)',  // keep same as default, or set whatever color you want
        },

        '&.Mui-focused fieldset': {
            borderColor: '#6366f1',
            borderWidth: 2,
        },
        boxShadow: '0 1px 1px rgba(0,0,0,0.03)',

        '&:hover': {
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        },

        "& .MuiInputBase-input": {
            color: "var(--text-primary)", // input text
        },

        "& .MuiInputLabel-root": {
            color: "var(--text-muted)", // label color
        },

        "& .MuiSelect-icon": {
            color: "var(--text-muted)", // customize here
        },

        /* Chrome, Safari, Edge
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
