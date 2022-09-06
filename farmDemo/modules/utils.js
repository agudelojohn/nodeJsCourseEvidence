// const replaceTemplate = (temp, dataSource) => {
module.exports = (temp, dataSource) => {
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

// module.exports = {
//     replaceTemplate
// }