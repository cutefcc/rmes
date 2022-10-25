import { walletTypeStore } from '@states/wallet';
import create from 'zustand';

export function useWallet() {
  const usewalletTypeStoreStore = create(walletTypeStore);
  return usewalletTypeStoreStore();
}
