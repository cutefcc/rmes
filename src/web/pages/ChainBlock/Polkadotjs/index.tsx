import { ApiPromise, WsProvider } from '@polkadot/api';
import { useEffect } from 'react';
function Polkadotjs() {
  useEffect(() => {
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = new ApiPromise({ provider: wsProvider });
    // 也可以这样
    //   ApiPromise
    // .create({ provider: wsProvider })
    // .then((api) =>
    //   console.log(api.genesisHash.toHex())
    // );
    // 上面写法和下吗是一样的效果
    // Create the instance
    // const api = new ApiPromise({ provider: wsProvider });

    // // Wait until we are ready and connected
    // await api.isReady;

    // // Do something
    // console.log(api.genesisHash.toHex());
    api.isReady.then(() => {
      console.log('api.isReady');
      console.log('wsProvider', wsProvider);
      console.log('api', api);
      console.log('api.genesisHash.toHex()', api.genesisHash.toHex());

      // The length of an epoch (session) in Babe
      console.log(api.consts.babe.epochDuration.toNumber());

      // The amount required to create a new account
      console.log(api.consts.balances.existentialDeposit.toNumber());

      // The amount required per byte on an extrinsic
      console.log(api.consts.transactionPayment.transactionByteFee.toNumber());
    });
  }, []);
  return <div>Polkadotjs test</div>;
}

export default Polkadotjs;
