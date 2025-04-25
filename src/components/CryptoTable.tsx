import React from 'react';
import { useSelector } from 'react-redux';
import { selectFormattedMarketData } from '../store/selectors';
import PriceChangeCell from './PriceChangeCell';
import MiniChart from './MiniChart';

/**
 * Main component for displaying the cryptocurrency table
 */
const CryptoTable: React.FC = () => {
  // Get formatted crypto data from Redux
  const cryptoData = useSelector(selectFormattedMarketData);
  
  return (
    <div className="crypto-table-container">
      <table className="crypto-table">
        <thead>
          <tr>
            <th className="rank-column">#</th>
            <th className="name-column">Name</th>
            <th className="price-column">Price</th>
            <th className="change-column">1h %</th>
            <th className="change-column">24h %</th>
            <th className="change-column">7d %</th>
            <th className="market-cap-column">
              <div className="column-header-with-info">
                Market Cap
                <span className="info-icon">ⓘ</span>
              </div>
            </th>
            <th className="volume-column">
              <div className="column-header-with-info">
                Volume(24h)
                <span className="info-icon">ⓘ</span>
              </div>
            </th>
            <th className="supply-column">
              <div className="column-header-with-info">
                Circulating Supply
                <span className="info-icon">ⓘ</span>
              </div>
            </th>
            <th className="chart-column">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((asset) => (
            <tr key={asset.id} className="crypto-row">
              <td className="rank-column">{asset.rank}</td>
              <td className="name-column">
                <div className="asset-name">
                  <img src={asset.logo} alt={asset.name} className="asset-logo" />
                  <div>
                    <div className="asset-name-text">{asset.name}</div>
                    <div className="asset-symbol">{asset.symbol}</div>
                  </div>
                </div>
              </td>
              <td className="price-column">{asset.formattedPrice}</td>
              <td className="change-column"><PriceChangeCell value={asset.priceChange1h} /></td>
              <td className="change-column"><PriceChangeCell value={asset.priceChange24h} /></td>
              <td className="change-column"><PriceChangeCell value={asset.priceChange7d} /></td>
              <td className="market-cap-column">{asset.formattedMarketCap}</td>
              <td className="volume-column">
                {asset.formattedVolume}
                <div className="volume-crypto">{(asset.volume24h / asset.price).toFixed(2)} {asset.symbol}</div>
              </td>
              <td className="supply-column">
                <div className="supply-info">
                  <div>{asset.formattedCirculatingSupply}</div>
                  {asset.maxSupply && (
                    <div className="supply-bar-container">
                      <div 
                        className="supply-bar" 
                        style={{ 
                          width: `${(asset.circulatingSupply / asset.maxSupply) * 100}%` 
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              </td>
              <td className="chart-column">
                <MiniChart 
                  data={asset.chartData} 
                  color={asset.priceChange7d >= 0 ? '#16c784' : '#ea3943'} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable; 