export function formatChf(amount: number, decimals = 0): string {
  return new Intl.NumberFormat('fr-CH', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount)
}

export function formatChfPerMonth(amount: number): string {
  return `${formatChf(amount)} CHF / mois`
}

export function formatChfPerYear(amount: number): string {
  return `${formatChf(amount)} CHF / an`
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)} %`
}
