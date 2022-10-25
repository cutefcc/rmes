import { Web3ReactHooks } from '@connector/core';

export function Status({
  error, // error
  active, // 链接中
  isActive, // 是否已经链接上
}: {
  error: ReturnType<Web3ReactHooks['useError']>;
  active: ReturnType<Web3ReactHooks['useActive']>;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
}) {
  return (
    <div>
      {error ? (
        <>
          {error.name ?? 'Error'} {error.message ?? ''}
        </>
      ) : isActive ? (
        <>Connecting</>
      ) : active ? (
        <>Connected</>
      ) : (
        <>Not Connected</>
      )}
    </div>
  );
}
