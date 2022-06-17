/// <reference types="@welldone-software/why-did-you-render" />
import React from 'react';

// if (process.env.NODE_ENV === "development") {
//   const whyDidYouRender = require("@welldone-software/why-did-you-render");
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//   });
// }
if (process.env.NODE_ENV === 'development') {
  // if (process.env.WHY_RENDER) {
  console.log('hhhhh  wdyr');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    // onlyLogs: true,
    // titleColor: "green",
    // diffNameColor: "darkturquoise",
    // include: [/^pure/],
    // trackExtraHooks: [
    //   [ReactRedux, 'useSelector']
    // ]
  });
}
