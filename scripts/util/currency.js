//Taking this function and using it to another JS files using Modules

export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}
