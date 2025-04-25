# Crypto Price Tracker

A real-time cryptocurrency price tracking application built with React, Redux Toolkit, and TypeScript.

## Assignment Implementation

This project fulfills the following requirements:

- **Real-time Price Updates**: Simulates WebSocket connections to fetch crypto prices
- **Redux State Management**: All data managed through Redux Toolkit with optimized selectors
- **Responsive Design**: Optimized for all device sizes
- **Data Display**: Shows price, changes, market cap, volume, supply, and more
- **Visual Indicators**: Color-coded price changes (green/red) and mini charts

## Features

- **Real-time Updates**: Prices and stats update every 1-2 seconds
- **Detailed Information**: Complete market data for 5 top cryptocurrencies
- **Interactive Controls**: Pause/resume updates and change update frequency
- **Responsive UI**: Adapts to desktop, tablet, and mobile viewports
- **Visual Indicators**: Price trends with color coding and mini charts

## Technologies Used

- React 19
- Redux Toolkit
- TypeScript
- Recharts for data visualization
- CSS3 with CSS Variables

## Getting Started

### Prerequisites

- Node.js (version 16.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/crypto-price-tracker.git
   cd crypto-price-tracker
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or with yarn:
   ```
   yarn
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   or with yarn:
   ```
   yarn dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
src/
├── components/           # UI components
│   ├── CryptoTable.tsx   # Main table component
│   ├── MiniChart.tsx     # 7-day chart visualization
│   └── PriceChangeCell.tsx # Price change with formatting
├── hooks/                # Custom React hooks
│   └── useCryptoWebSocket.ts # WebSocket simulation hook
├── services/             # External services
│   └── cryptoWebSocketMock.ts # WebSocket simulation
├── store/                # Redux store and slices
│   ├── cryptoSlice.ts    # Crypto data slice
│   ├── index.ts          # Store configuration
│   └── selectors.ts      # Memoized selectors
├── App.tsx               # Main application component
├── App.css               # Global styles
└── main.tsx              # Application entry point
```

## Architecture Highlights

- **Redux Toolkit** for state management
- **WebSocket Simulation** with setInterval to provide real-time updates
- **Selectors** for optimized rendering
- **Custom Hooks** for business logic separation
- **Responsive Design** with CSS media queries

## Troubleshooting

If you encounter the "Unable to launch browser" error:
1. Manually open your browser and navigate to http://localhost:3000
2. Use the alternative command: `npm run dev:no-open`
3. Check the vite.config.ts file for server settings

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- CoinGecko for providing the free cryptocurrency API
- React team for the amazing framework
- Vite team for the fast development environment
