import type { Web3ReactHooks } from '@connector/core';

export function Chain({ chainId }: { chainId: ReturnType<Web3ReactHooks['useChainId']> }) {
  if (chainId === undefined) {
    return chainId;
  }
  const name = chainId ? CHAINS[chainId]?.name : undefined;
  if (name) {
    return (
      <div>
        Chain:
        <b>
          {name} {chainId}
        </b>
      </div>
    );
  }
  return (
    <div>
      Chain:
      <b>{chainId}</b>
    </div>
  );
}
