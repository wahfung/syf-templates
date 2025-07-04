import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { Chain,Address } from 'viem';
import { mainnet, sepolia, hardhat, localhost } from 'viem/chains';

import RedEnvelope from './contracts/RedEnvelope.json';

// 定义本地开发链配置
const localChain: Chain = {
  id: 1337,
  name: 'Local Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['http://localhost:7545'] },
    default: { http: ['http://localhost:7545'] },
  },
  blockExplorers: {
    default: { name: 'Local Explorer', url: 'http://localhost:7545' },
  },
  testnet: true,
};

// 定义支持的链
const chains: readonly [Chain, ...Chain[]] = [
  localChain,     // 本地链（优先）
  hardhat,        // Hardhat 网络
  sepolia,        // Sepolia 测试网
  mainnet,        // 以太坊主网
];

// Wagmi 配置
export const config = getDefaultConfig({
  appName: '红包DApp',
  projectId: 'your-project-id', // 从 WalletConnect 获取
  chains,
});

// 工具函数
export const isLocalChain = (chainId: number): boolean => {
  return chainId === localChain.id || chainId === localhost.id || chainId === hardhat.id;
};

export const getChainName = (chainId: number): string => {
  const chain = chains.find(c => c.id === chainId);
  return chain?.name || 'Unknown Chain';
};

// 地址验证和转换函数
const validateAddress = (address: string | undefined): Address => {
  if (!address) {
    throw new Error('Contract address is required');
  }
  
  // 确保地址以 0x 开头
  const normalizedAddress = address.startsWith('0x') ? address : `0x${address}`;
  
  // 检查地址长度（42 个字符，包括 0x）
  if (normalizedAddress.length !== 42) {
    throw new Error('Invalid address length');
  }
  
  // 检查是否为有效的十六进制
  if (!/^0x[a-fA-F0-9]{40}$/.test(normalizedAddress)) {
    throw new Error('Invalid address format');
  }
  
  return normalizedAddress as Address;
};

// 合约配置
export const CONTRACT_CONFIG = {
  address: validateAddress('0x32Be3614022B3A7618593b737c69D389b1EB0708'),
  abi: RedEnvelope.abi,
};