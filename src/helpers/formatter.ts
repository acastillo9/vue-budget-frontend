const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
});

export const formatCurrency = (value: number) => {
  return currencyFormatter.format(value);
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US").format(date);
};
