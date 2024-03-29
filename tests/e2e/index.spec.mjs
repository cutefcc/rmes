import puppeteer from 'puppeteer';
import dappeteer from '@chainsafe/dappeteer';

async function main() {
  const browser = await dappeteer.launch(puppeteer, {
    headless: false,
    metamaskVersion: 'v10.15.0',
    executablePath: '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
    slowMo: 180, // slow down by 180ms
    defaultViewport: null,
    args: ['--no-sandbox'],
  });
  const metamask = await dappeteer.setupMetamask(browser, {
    seed: 'salmon spike other unlock raven future must wire prison suffer pave cake',
    hideSeed: true,
    password: '!maimai713723!',
  });
  await metamask.switchNetwork('Rinkeby Test Network');
  // await page.goto('http://localhost:3000/', {
  //   waitUntil: 'networkidle0',
  // });
  // 授权地址操作权限

  // await page.bringToFront();
  // const [metamask, page] = await dappeteer.bootstrap(puppeteer, { metamaskVersion: 'v10.15.0' });
}

main();
