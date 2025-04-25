export interface CryptoAsset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  priceChange: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  chartData: string;
  starred: boolean;
}

export interface CryptoState {
  assets: CryptoAsset[];
  loading: boolean;
  error: string | null;
}