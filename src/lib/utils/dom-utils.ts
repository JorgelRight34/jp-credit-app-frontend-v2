export const copyToClipboard = async (value: string): Promise<boolean> => {
    if (!value) return false

    if (!navigator.clipboard) {
        console.warn('Clipboard API not supported in this browser.')
        return false
    }

    try {
        await navigator.clipboard.writeText(value)
        return true
    } catch (err) {
        console.error('Failed to copy:', err)
        return false
    }
}
