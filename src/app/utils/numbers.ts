// make a function that takes an interger and returns a currency string
export const toRupiah = (num: number): string => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(num);
};