import { memo, useEffect } from 'react';
import { metaMask } from '@connector/metaMask';
import { Accounts } from '../Accounts';
import { Card } from '../Card';
import { Chain } from '../Chain';
import { ConnectWithSelect } from '../ConnectWithSelect';
import { useWallet } from '@hooks/useWallet';
import { Status } from '../Status';

const MetaMaskCard = () => {
  console.log('🌺🌺组件被渲染🌺🌺');
  const { chainId, accounts, provider, account, errMsg, isActive, isActivating } = useWallet();
  console.log(chainId, accounts, provider, account, errMsg, isActive, isActivating);
  useEffect(() => {
    //链接钱包
    void metaMask.connectEagerly();
  }, []);

  return (
    <Card>
      <div>
        <b>MetaMask</b>
        <Status active={isActivating} error={errMsg} isActive={isActive} />
        <div style={{ marginBottom: '1rem' }} />
        <Chain chainId={chainId} />
        <Accounts accounts={accounts} />
      </div>
      <div style={{ marginBottom: '1rem' }} />
      <ConnectWithSelect
        connector={metaMask}
        chainId={chainId}
        isActivating={isActivating}
        error={errMsg}
        isActive={isActive}
      />
    </Card>
  );
};
MetaMaskCard.whyDidYouRender = true;
export default memo(MetaMaskCard);
