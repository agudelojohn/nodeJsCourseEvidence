//------------- SERVER -------------
const http = require("node:http");
const url = require("node:url");
const fs = require("node:fs");

// As is outside the code (Top Level Code), this will be run when the application starts, and only this time
const data = fs.readFileSync(`${__dirname}/data.json`, "utf-8");
const dataObject = JSON.parse(data);

//Templates
const overviewTemp = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const cardTemp = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const productTemp = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8");

const replaceTemplate = (temp, dataSource) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g,dataSource.productName);
    output = output.replace(/{%IMAGE%}/g,dataSource.image);
    output = output.replace(/{%PRICE%}/g,dataSource.price);
    output = output.replace(/{%FROM%}/g,dataSource.from);
    output = output.replace(/{%NUTRIENTS%}/g,dataSource.nutrients);
    output = output.replace(/{%QUANTITY%}/g,dataSource.quantity);
    output = output.replace(/{%DESCRIPTION%}/g,dataSource.description);
    output = output.replace(/{%ID%}/g,dataSource.id);
    
    if(!dataSource.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic')
    return output;
}

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/product") {
    res.end("This is product");
  
} else if (pathName === "/overview") {
    
    const cardsHtml = dataObject.map((elem)=>replaceTemplate(cardTemp, elem)).join('');
    const output = overviewTemp.replace(/{%PRODUCT_CARDS%}/g,cardsHtml);

    res.writeHead(200, { "Content-type": "text/html" });
    res.end(output);

    // res.end("This is overview");
  } else if (pathName === "/api") {

    res.end("This is API");

  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found 404!</h1>");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening from port 3000");
});
