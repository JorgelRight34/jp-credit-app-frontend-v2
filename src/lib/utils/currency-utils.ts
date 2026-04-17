const currencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

export const toCurrency = (money: number = 0): string | number => {
    return currencyFormatter.format(money);
};

export const toCurrencyOrND = <T>(
    obj: T | undefined | null,
    getMoney: (obj: T) => number
) => {
    if (!obj) return "N/D"
    return currencyFormatter.format(getMoney(obj))
}