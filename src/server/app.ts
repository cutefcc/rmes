const koa = require('koa');
const serves = require('koa-static');
const { join, resolve } = require('path');
const app = new koa();
app.use(serves(join(__dirname, '../../dist')));
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});
