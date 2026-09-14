/**
 * Nigerian Naira (NGN / ₦) Currency Utility
 * Ebentrick Global Services standard financial formatting
 */

export const CURRENCY_SYMBOL = '₦';
export const CURRENCY_CODE = 'NGN';

export function formatNaira(amount: number | string | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return '₦0';
  }
  const numeric = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `${CURRENCY_SYMBOL}${Math.round(numeric).toLocaleString('en-NG')}`;
}

export function formatNairaDetailed(amount: number | string | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return '₦0.00';
  }
  const numeric = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `${CURRENCY_SYMBOL}${numeric.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
