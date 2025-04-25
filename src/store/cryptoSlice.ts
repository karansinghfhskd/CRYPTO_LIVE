import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CryptoAsset {
  id: string;
  rank: number;
  logo: string;
  name: string;
  symbol: string;
  price: number;
  priceChange1h: number;
  priceChange24h: number;
  priceChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  chartData: number[];
}

interface CryptoState {
  assets: CryptoAsset[];
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  assets: [
    {
      id: 'bitcoin',
      rank: 1,
      logo: '/logos/bitcoin.png',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 60342.48,
      priceChange1h: 0.5,
      priceChange24h: 2.3,
      priceChange7d: -1.2,
      marketCap: 1182298746780,
      volume24h: 28428681023,
      circulatingSupply: 19621850,
      maxSupply: 21000000,
      chartData: [56000, 57200, 57800, 58400, 58200, 59100, 60342]
    },
    {
      id: 'ethereum',
      rank: 2,
      logo: '/logos/ethereum.png',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 3224.16,
      priceChange1h: 0.2,
      priceChange24h: -1.8,
      priceChange7d: 3.7,
      marketCap: 386899245170,
      volume24h: 15976458790,
      circulatingSupply: 120137370,
      maxSupply: null,
      chartData: [3100, 3150, 3210, 3180, 3220, 3200, 3224]
    },
    {
      id: 'tether',
      rank: 3,
      logo: '/logos/tether.png',
      name: 'Tether',
      symbol: 'USDT',
      price: 1.00,
      priceChange1h: 0.01,
      priceChange24h: 0.02,
      priceChange7d: -0.01,
      marketCap: 94845223574,
      volume24h: 68973254120,
      circulatingSupply: 94845223574,
      maxSupply: null,
      chartData: [1.00, 1.00, 0.99, 1.00, 1.00, 1.00, 1.00]
    },
    {
      id: 'bnb',
      rank: 4,
      logo: '/logos/bnb.png',
      name: 'BNB',
      symbol: 'BNB',
      price: 608.74,
      priceChange1h: -0.3,
      priceChange24h: 1.5,
      priceChange7d: 4.2,
      marketCap: 93124564238,
      volume24h: 1526784532,
      circulatingSupply: 152925875,
      maxSupply: 200000000,
      chartData: [580, 585, 595, 600, 605, 607, 608]
    },
    {
      id: 'solana',
      rank: 5,
      logo: '/logos/solana.png',
      name: 'Solana',
      symbol: 'SOL',
      price: 142.87,
      priceChange1h: 1.3,
      priceChange24h: 5.2,
      priceChange7d: 7.8,
      marketCap: 61876345129,
      volume24h: 2345876123,
      circulatingSupply: 432984761,
      maxSupply: null,
      chartData: [128, 132, 138, 135, 140, 141, 143]
    }
  ],
  loading: false,
  error: null
};

// Helper function to generate more realistic random price changes
// Most crypto prices change by tiny amounts most of the time
const getRandomChange = (min: number, max: number): number => {
  // 80% chance of a smaller change, 20% chance of a larger change
  const isSmallChange = Math.random() < 0.8;
  
  if (isSmallChange) {
    // Smaller change: 1/5th of the original range
    const smallMin = min / 5;
    const smallMax = max / 5;
    return +(Math.random() * (smallMax - smallMin) + smallMin).toFixed(2);
  } else {
    return +(Math.random() * (max - min) + min).toFixed(2);
  }
};

// More realistic price update based on market volatility
// Different assets have different volatility
const getVolatilityFactor = (symbol: string): number => {
  switch(symbol) {
    case 'BTC': return 0.7;   // Bitcoin - medium-high volatility
    case 'ETH': return 0.8;   // Ethereum - high volatility
    case 'USDT': return 0.05; // Tether - very low volatility (stablecoin)
    case 'BNB': return 0.6;   // BNB - medium volatility
    case 'SOL': return 0.9;   // Solana - high volatility
    default: return 0.5;      // Default medium volatility
  }
};

// Helper function to update price based on percentage change
const updatePrice = (currentPrice: number, changePercent: number, symbol: string): number => {
  // Adjust change based on asset volatility
  const volatilityFactor = getVolatilityFactor(symbol);
  const adjustedChange = changePercent * volatilityFactor;
  
  return +(currentPrice * (1 + adjustedChange / 100)).toFixed(symbol === 'USDT' ? 4 : 2);
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePricesStart(state) {
      state.loading = true;
      state.error = null;
    },
    updatePricesSuccess(state) {
      state.assets = state.assets.map(asset => {
        // Generate random price changes with more realistic values
        // Hourly changes are smaller than daily changes
        const priceChange1h = getRandomChange(-0.5, 0.5);
        
        // Daily changes accumulate from hourly changes
        // We update the existing value to simulate accumulation
        const priceChange24h = 
          (asset.priceChange24h + getRandomChange(-0.2, 0.2)) * 0.98; // Slight mean reversion
        
        // Weekly changes have more variance
        const priceChange7d = 
          (asset.priceChange7d + getRandomChange(-0.3, 0.3)) * 0.99; // Slight mean reversion
        
        // Update price based on the 1h change and volatility
        const newPrice = updatePrice(asset.price, priceChange1h, asset.symbol);
        
        // Update volume with a small random change
        const volumeChange = getRandomChange(-1, 1);
        const newVolume = asset.volume24h * (1 + volumeChange / 100);
        
        // Update chart data by removing the first element and adding the new price
        const newChartData = [...asset.chartData.slice(1), newPrice];
        
        return {
          ...asset,
          price: newPrice,
          priceChange1h,
          priceChange24h,
          priceChange7d,
          volume24h: newVolume,
          chartData: newChartData
        };
      });
      state.loading = false;
    },
    updatePricesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { updatePricesStart, updatePricesSuccess, updatePricesFailure } = cryptoSlice.actions;

export default cryptoSlice.reducer; 