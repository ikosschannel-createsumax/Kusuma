
export enum TransactionStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

export enum Network {
  ERC20 = 'ERC20',
  TRC20 = 'TRC20',
  BEP20 = 'BEP20'
}

export enum AssetType {
  FIAT = 'FIAT',
  CRYPTO = 'CRYPTO'
}

export interface Asset {
  id: string;
  name: string;
  symbol: string;
  type: AssetType;
  priceIdr: number;
  balance: number;
  change24h: number;
  color: string;
}

export interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAW' | 'BUY' | 'SELL';
  assetSymbol: string;
  amount: number;
  fiatValue: number;
  status: TransactionStatus;
  date: string;
  network?: Network;
  fee?: number;
  method?: string;
  txHash?: string;
  userName?: string; // For Admin view
}

export interface Order {
  id: string;
  side: 'BUY' | 'SELL';
  price: number;
  amount: number;
  total: number;
  time: string;
}

export interface MarketData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isKycVerified: boolean;
  kycStatus: 'NOT_STARTED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
  has2FA: boolean;
  role: 'USER' | 'ADMIN';
  referralCode: string;
  referralCount: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  volumeIdr: number;
  rewardIdr: number;
}

export interface RewardEvent {
  id: string;
  title: string;
  description: string;
  reward: string;
  endDate: string;
  image: string;
}
