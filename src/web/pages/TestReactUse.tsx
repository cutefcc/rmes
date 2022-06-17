import { memo, useState, useCallback } from 'react';
import { useCookie, useEffectOnce, useUnMount } from '@mmfcc/hooks';

function TestReactUse() {
  const [value, updateCookie, deleteCookie] = useCookie('fcc');
  useEffectOnce(() => {
    console.log('useEffectOnce');
  });
  useUnMount(() => {
    console.log('useUnMount');
  });
  const handleSetCookie = () => {
    updateCookie('1');
  };
  const handleGetCookie = () => {
    console.log('cookie fcc value:', typeof value, value);
  };
  const handleDeleteCookie = () => {
    deleteCookie('fcc');
  };

  console.log('value', value);
  return (
    <div>
      <h2>TestReactUse</h2>
      <button onClick={handleSetCookie}>setCookie: key: fcc value: cutefcc</button>
      <button onClick={handleGetCookie}>getCookie: fcc</button>
      <button onClick={handleDeleteCookie}>deleteCookie: key: fcc </button>
    </div>
  );
}
export default memo(TestReactUse);
