import { Web3ReactHooks } from '@connector/core';

export function Status({
  active,
  error,
  isActive,
}: {
  active: ReturnType<Web3ReactHooks['useActive']>;
  error: ReturnType<Web3ReactHooks['useError']>;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
}) {
  if (error) {
    return (
      <div>
        <b>{error.name ?? 'ERROR'}</b>
        <b>{error.message ? error.message : 'ERROR'}</b>
      </div>
    );
  }
  if (active) {
    return (
      <div>
        <b>Connecting</b>
      </div>
    );
  }
  if (isActive) {
    return (
      <div>
        <b>Connected</b>
      </div>
    );
  }
  return (
    <div>
      <b>Disconnected</b>
    </div>
  );
}
