interface IFormattedPrice {
  integer: string;
  decimal: string;
}

export const formatPrice = (price: number): IFormattedPrice => {
  const fixedPrice = price.toFixed(2);

  const [integerPart, decimalPart] = fixedPrice.split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return {
    integer: formattedInteger,
    decimal: decimalPart || "00",
  };
};
