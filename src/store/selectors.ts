import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { CryptoAsset } from './cryptoSlice';

// Base selector to get the crypto state
export const selectCryptoState = (state: RootState) => state.crypto;

// Selector to get all assets
export const selectAllAssets = createSelector(
  selectCryptoState,
  (cryptoState) => cryptoState.assets
);

// Selector to get loading state
export const selectLoading = createSelector(
  selectCryptoState,
  (cryptoState) => cryptoState.loading
);

// Selector to get error state
export const selectError = createSelector(
  selectCryptoState,
  (cryptoState) => cryptoState.error
);

// Selector to get assets by rank (sorted)
export const selectAssetsByRank = createSelector(
  selectAllAssets,
  (assets) => [...assets].sort((a, b) => a.rank - b.rank)
);

// Selector to get top gainers (by 24h change)
export const selectTopGainers = createSelector(
  selectAllAssets,
  (assets) => [...assets].sort((a, b) => b.priceChange24h - a.priceChange24h)
);

// Selector to get top losers (by 24h change)
export const selectTopLosers = createSelector(
  selectAllAssets,
  (assets) => [...assets].sort((a, b) => a.priceChange24h - b.priceChange24h)
);

// Selector to get a specific asset by id
export const selectAssetById = (id: string) => 
  createSelector(
    selectAllAssets,
    (assets) => assets.find((asset) => asset.id === id)
  );

// Selector to get formatted market data
export const selectFormattedMarketData = createSelector(
  selectAllAssets,
  (assets): (CryptoAsset & { 
    formattedPrice: string;
    formattedMarketCap: string;
    formattedVolume: string;
    formattedCirculatingSupply: string;
    formattedMaxSupply: string;
  })[] => {
    return assets.map(asset => {
      // Format price with appropriate decimal places
      const formattedPrice = asset.price < 1 
        ? `$${asset.price.toFixed(4)}` 
        : `$${asset.price.toFixed(2)}`;
      
      // Format large numbers with abbreviations
      const formatLargeNumber = (num: number): string => {
        if (num >= 1_000_000_000_000) return `$${(num / 1_000_000_000_000).toFixed(2)}T`;
        if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(2)}B`;
        if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`;
        return `$${num.toLocaleString()}`;
      };

      return {
        ...asset,
        formattedPrice,
        formattedMarketCap: formatLargeNumber(asset.marketCap),
        formattedVolume: formatLargeNumber(asset.volume24h),
        formattedCirculatingSupply: `${asset.circulatingSupply.toLocaleString()} ${asset.symbol}`,
        formattedMaxSupply: asset.maxSupply ? `${asset.maxSupply.toLocaleString()} ${asset.symbol}` : 'Unlimited'
      };
    });
  }
); 