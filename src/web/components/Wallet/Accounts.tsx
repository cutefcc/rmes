import type { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import type { Web3ReactHooks } from '@connector/core';
import { useEffect, useState } from 'react';

function useBalances(
  provider?: ReturnType<Web3ReactHooks['useProvider']>,
  accounts?: string[]
): BigNumber[] | undefined {
  const [balances, setBalances] = useState<BigNumber[] | undefined>();
  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false;
      void Promise.all(accounts.map(account => provider.getBalance(account))).then(_balances => {
        if (!stale) {
          setBalances(_balances);
        }
      });
      return () => {
        stale = true;
        setBalances(undefined);
      };
    } else {
      return;
    }
  }, [provider, accounts]);
  return balances;
}

export function Accounts({
  accounts,
  provider,
}: {
  accounts: ReturnType<Web3ReactHooks['useAccounts']>;
  provider: ReturnType<Web3ReactHooks['useProvider']>;
}) {
  const balances = useBalances(provider, accounts);
  if (accounts === undefined) {
    return null;
  }
  return (
    <div>
      Accounts:
      <b>
        {accounts.length === 0
          ? 'None'
          : accounts?.map((account, i) => {
              return (
                <div
                  key={account}
                  style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {account} ({balances?.[i] ? formatEther(balances[i]) : null})
                </div>
              );
            })}
      </b>
    </div>
  );
}
