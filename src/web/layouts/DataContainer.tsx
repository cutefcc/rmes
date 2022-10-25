import { useWalletGlobal } from '@hooks/useWalletGlobal';
import { memo } from 'react';

const DataContainer = () => {
  useWalletGlobal();
  return null;
};
DataContainer.whyDidYouRender = true;
export default memo(DataContainer);
