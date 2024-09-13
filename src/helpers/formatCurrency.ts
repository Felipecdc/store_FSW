interface FormatCurrencyProps {
  price: number;
  locale?: string;
  currency?: string;
}

export const formatCurrency = ({
  price,
  currency = "BRL",
  locale = "pt-BR",
}: FormatCurrencyProps) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
