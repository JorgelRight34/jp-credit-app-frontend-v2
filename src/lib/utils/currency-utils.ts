const currencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

export const toCurrency = (money: number): string | number => {
    return currencyFormatter.format(money);
};