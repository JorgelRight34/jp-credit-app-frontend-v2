export const muiSxConfig = {
    borderRadius: "0.5rem !important", // Tailwind's rounded-xl = 1rem
    "& .MuiOutlinedInput-root": {
        borderRadius: "0.5rem !important", // make the outer input wrapper rounded,
        boxShadow:
            '0 1px 2px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.08)',
    },
}
