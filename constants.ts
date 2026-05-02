
import { Asset, AssetType, Transaction, TransactionStatus, Network, Order, LeaderboardEntry, RewardEvent } from './types';

export const INITIAL_ASSETS: Asset[] = [
  { id: '1', name: 'Indonesian Rupiah', symbol: 'IDR', type: AssetType.FIAT, priceIdr: 1, balance: 12500000, change24h: 0, color: '#00A3FF' },
  { id: '2', name: 'Bitcoin', symbol: 'BTC', type: AssetType.CRYPTO, priceIdr: 1450000000, balance: 0.045, change24h: 2.5, color: '#F7931A' },
  { id: '3', name: 'Ethereum', symbol: 'ETH', type: AssetType.CRYPTO, priceIdr: 45000000, balance: 1.2, change24h: -1.2, color: '#627EEA' },
  { id: '4', name: 'Tether', symbol: 'USDT', type: AssetType.CRYPTO, priceIdr: 15850, balance: 500, change24h: 0.05, color: '#26A17B' },
  { id: '5', name: 'Binance Coin', symbol: 'BNB', type: AssetType.CRYPTO, priceIdr: 9500000, balance: 15, change24h: 4.2, color: '#F3BA2F' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx1', type: 'DEPOSIT', assetSymbol: 'IDR', amount: 5000000, fiatValue: 5000000, status: TransactionStatus.SUCCESS, date: '2024-05-15T10:00:00Z', method: 'BCA VA' },
  { id: 'tx2', type: 'BUY', assetSymbol: 'BTC', amount: 0.005, fiatValue: 7250000, status: TransactionStatus.SUCCESS, date: '2024-05-14T14:30:00Z' },
  { id: 'tx3', type: 'WITHDRAW', assetSymbol: 'USDT', amount: 100, fiatValue: 1585000, status: TransactionStatus.PENDING, date: '2024-05-16T08:15:00Z', network: Network.TRC20, userName: 'Budi Santoso' },
  { id: 'tx4', type: 'DEPOSIT', assetSymbol: 'ETH', amount: 0.5, fiatValue: 22500000, status: TransactionStatus.PROCESSING, date: '2024-05-16T12:00:00Z', network: Network.ERC20, userName: 'Budi Santoso' },
];

export const ORDER_BOOK_SELL: Order[] = [
  { id: 's1', side: 'SELL', price: 1452000000, amount: 0.05, total: 72600000, time: '10:00:01' },
  { id: 's2', side: 'SELL', price: 1451500000, amount: 0.12, total: 174180000, time: '10:00:02' },
  { id: 's3', side: 'SELL', price: 1451000000, amount: 0.08, total: 116080000, time: '10:00:03' },
  { id: 's4', side: 'SELL', price: 1450500000, amount: 0.02, total: 29010000, time: '10:00:04' },
];

export const ORDER_BOOK_BUY: Order[] = [
  { id: 'b1', side: 'BUY', price: 1449500000, amount: 0.04, total: 57980000, time: '10:00:05' },
  { id: 'b2', side: 'BUY', price: 1449000000, amount: 0.15, total: 217350000, time: '10:00:06' },
  { id: 'b3', side: 'BUY', price: 1448500000, amount: 0.09, total: 130365000, time: '10:00:07' },
  { id: 'b4', side: 'BUY', price: 1448000000, amount: 0.03, total: 43440000, time: '10:00:08' },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Andi Crypto', volumeIdr: 1500000000, rewardIdr: 5000000 },
  { rank: 2, name: 'Siti Trader', volumeIdr: 1200000000, rewardIdr: 3000000 },
  { rank: 3, name: 'Rudi BTC', volumeIdr: 950000000, rewardIdr: 1500000 },
  { rank: 4, name: 'Lina ETH', volumeIdr: 800000000, rewardIdr: 0 },
  { rank: 5, name: 'Dedi Sultan', volumeIdr: 750000000, rewardIdr: 0 },
];

export const MOCK_EVENTS: RewardEvent[] = [
  { id: 'e1', title: 'Trading Competition Mei', description: 'Trading volume tertinggi menangkan 0.1 BTC.', reward: '0.1 BTC', endDate: '2024-05-31', image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&q=80' },
  { id: 'e2', title: 'Lucky Spin Deposit', description: 'Deposit min. 1jt dapat 1 tiket Lucky Spin.', reward: 'iPhone 15 Pro', endDate: '2024-06-15', image: 'https://images.unsplash.com/photo-1611974714851-48210433d311?w=400&q=80' },
];

export const PAYMENT_METHODS = [
  { id: 'bca', name: 'BCA Virtual Account', icon: '🏦' },
  { id: 'mandiri', name: 'Mandiri Virtual Account', icon: '🏦' },
  { id: 'qris', name: 'QRIS (Gopay, OVO, Dana)', icon: '📱' },
  { id: 'shopeepay', name: 'ShopeePay', icon: '🟠' },
];

export const formatIDR = (val: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(val);
};

export const formatCrypto = (val: number, decimals: number = 8) => {
  return val.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: decimals });
};
