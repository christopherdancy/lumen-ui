// import { SafeBalanceUsdResponse } from '@safe-global/safe-service-client';
import { BigNumber, ethers } from 'ethers';
// import bigDecimal from 'js-big-decimal';

export const DEFAULT_DATE_TIME_FORMAT = 'MMM dd, yyyy, h:mm aa';
export const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

export const formatUSD = (rawUSD: number | string) => {
  const formatted = usdFormatter.format(Number(rawUSD));
  const decimalIndex = formatted.indexOf('.');
  return decimalIndex != -1 && formatted.length - decimalIndex !== 3 ? formatted + '0' : formatted;
};

export const formatCoinUnits = (
  rawBalance: BigNumber | string,
  decimals?: number,
  symbol?: string
): number => {
  if (!rawBalance) rawBalance = '0';
  return symbol
    ? parseFloat(ethers.utils.formatUnits(rawBalance, decimals))
    : parseFloat(ethers.utils.formatEther(rawBalance));
};

export const formatCoin = (
  rawBalance: BigNumber | string,
  truncate: boolean,
  decimals?: number,
  symbol?: string
): string => {
  const amount = formatCoinUnits(rawBalance, decimals, symbol);

  const coinFormatter = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: !truncate ? 18 : amount > 1 ? 2 : 8,
  });

  return symbol
    ? coinFormatter.format(amount) + ' ' + symbol
    : coinFormatter.format(amount) + ' ETH';
};
