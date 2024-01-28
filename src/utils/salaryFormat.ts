export default function salaryFormat(salary: number) {
    const USDollar = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return USDollar.format(salary).split('.00').join('')
}