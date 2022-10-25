import { useWeb3React } from '@connector/provider';
import { walletTypeStore } from '@states/wallet';
import { useEffect } from 'react';

export function useWalletGlobal() {
  const interfaceContext = useWeb3React();
  const {
    chainId,
    error,
    provider: library,
    connector,
    accounts,
    isActive,
    isActivating,
  } = interfaceContext;
  useEffect(() => {
    walletTypeStore.setState(draft => {
      draft.chainId = chainId;
      draft.account = accounts?.[0] || '';
      draft.accounts = accounts || [];
      draft.library = library;
      draft.provider = library?.provider;
      draft.errMsg = error;
      draft.connector = connector;
      //钱包是都彻底链接成功
      draft.isActive = isActive;
      //用户的操作有没有结束 loading...
      draft.isActivating = isActivating;
    });
  }, [accounts, chainId, connector, error, isActivating, isActive, library, library?.provider]);
}
