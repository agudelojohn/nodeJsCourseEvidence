//------------- SERVER -------------
const http = require('node:http');
const url = require('node:url');
const fs = require('node:fs');

const slugify = require('slugify');

const replaceTemplate = require('./modules/utils');

// As is outside the code (Top Level Code), this will be run when the application starts, and only this time
const data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

//Templates
const overviewTemp = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const cardTemp = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const productTemp = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === '/' || pathname === '/product') {
    const product = dataObject.find((elem) => elem.id == query.id);
    const output = replaceTemplate(productTemp, product);
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(output);
  } else if (pathname === '/overview') {
    const cardsHtml = dataObject.map((elem) => replaceTemplate(cardTemp, elem)).join('');
    const output = overviewTemp.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(output);
  } else if (pathname === '/api') {
    res.end('This is API');
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>Page not found 404!</h1>');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening from port 3000');
});
