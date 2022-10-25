import type { Web3ReactHooks } from '@connector/core';
import { useCallback, useState } from 'react';
// import { CHAINS, getAddChainParameters } from '@utils/yd-web3';
import { CHAIN_INFO as CHAINS, getAddChainParameters } from '@connector/configure/chainids';
import { MetaMask } from '@connector/metaMaskConnector';
function Select({
  chainId,
  switchChain,
  displayDefault,
  chainIds,
}: {
  chainId: number;
  switchChain: (chainId: number) => void | undefined | Promise<void>;
  displayDefault: boolean;
  chainIds: number[];
}) {
  return (
    <select
      value={chainId}
      style={{ color: 'black' }}
      onChange={event => {
        switchChain?.(Number(event.target.value));
      }}
      disabled={switchChain === undefined}
    >
      {displayDefault ? <option value={-1}>请选择链</option> : null}
      {chainIds.map(_chainId => (
        <option key={_chainId} value={_chainId}>
          {CHAINS[_chainId]?.chainName ?? _chainId}
        </option>
      ))}
    </select>
  );
}

export function ConnectWithSelect({
  connector,
  chainId,
  isActivating,
  error,
  isActive,
}: {
  connector: MetaMask;
  chainId: ReturnType<Web3ReactHooks['useChainId']>;
  isActivating: ReturnType<Web3ReactHooks['useActive']>;
  error: ReturnType<Web3ReactHooks['useError']>;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
}) {
  const chainIds = Object.keys(CHAINS).map(_chainId => Number(_chainId));
  const displayDefault = false;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [desiredChainId, setDesiredChainId] = useState<number>(chainId!);
  const switchChain = useCallback(
    async (_desiredChainId: number) => {
      setDesiredChainId(_desiredChainId);
      // if we're already connected to the desired chain, return
      if (_desiredChainId === chainId) return;
      // if they want to connect to the default chain and we're already connected, return
      if (_desiredChainId === -1 && chainId !== undefined) return;
      await connector.activate(
        _desiredChainId === -1 ? undefined : getAddChainParameters(_desiredChainId)
      );
    },
    [connector, chainId]
  );

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Select
          chainId={desiredChainId}
          switchChain={switchChain}
          displayDefault={displayDefault}
          chainIds={chainIds}
        />
        <div style={{ marginBottom: '1rem' }} />
        <button
          onClick={() =>
            connector.activate(
              desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId)
            )
          }
        >
          Try Again?
        </button>
      </div>
    );
  } else if (isActive && chainId) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Select
          chainId={desiredChainId === -1 ? -1 : chainId}
          switchChain={switchChain}
          displayDefault={displayDefault}
          chainIds={chainIds}
        />
        <div style={{ marginBottom: '1rem' }} />
        <button onClick={() => connector.deactivate()}>Disconnect</button>
      </div>
    );
  } else {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Select
          chainId={desiredChainId}
          switchChain={isActivating ? () => {} : switchChain}
          displayDefault={displayDefault}
          chainIds={chainIds}
        />
        <div style={{ marginBottom: '1rem' }} />
        <button
          onClick={
            isActivating
              ? undefined
              : () =>
                  connector.activate(
                    desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId)
                  )
          }
          disabled={isActivating}
        >
          Connect
        </button>
      </div>
    );
  }
}
