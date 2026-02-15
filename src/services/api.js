// Service to handle external API connections

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';
const FINNHUB_BASE = 'https://finnhub.io/api/v1';
// Note: In a real production app, this key should be in an env variable or backend proxy.
// Using a free tier sandbox key or placeholder for demonstration.
// The user should replace this with their own if they hit limits.
const FINNHUB_KEY = 'ctqe1q1r01qgg37456rgctqe1q1r01qgg37456s0'; // Free key for demo purposes

// --- CoinGecko (Crypto) ---
export const getCryptoMarketData = async (currency = 'usd', ids = ['bitcoin', 'ethereum', 'solana', 'polkadot', 'cardano']) => {
    try {
        const response = await fetch(`${COINGECKO_BASE}/coins/markets?vs_currency=${currency}&ids=${ids.join(',')}&order=market_cap_desc&per_page=10&page=1&sparkline=false`);
        if (!response.ok) throw new Error('CoinGecko API error');
        return await response.json();
    } catch (error) {
        console.error("Error fetching crypto data:", error);
        return []; // Return empty array on failure to prevent crash
    }
};

// --- Finnhub (Stocks) ---
export const getStockQuote = async (symbol) => {
    try {
        const response = await fetch(`${FINNHUB_BASE}/quote?symbol=${symbol}&token=${FINNHUB_KEY}`);
        if (!response.ok) throw new Error('Finnhub API error');
        return await response.json(); // Returns { c: current price, d: change, dp: percent change, ... }
    } catch (error) {
        console.error(`Error fetching stock data for ${symbol}:`, error);
        return null;
    }
};

// --- INE / Real Estate (Simulated/Proxy) ---
// Since direct INE API access involves complex JSON-stat and CORS, we'll return
// representative index data for the Spanish Real Estate market.
export const getRealEstateData = async () => {
    // Mocking an async fetch
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                index: "IPV (Índice de Precios de Vivienda)",
                region: "Nacional (España)",
                yoy_change: 4.2, // Year-over-year change mock
                quarterly_change: 1.5,
                trend: "up"
            });
        }, 500);
    });
};
