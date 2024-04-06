const { faker } = require('@faker-js/faker');

function fakerData () {
    const productList = []
    for (let i = 0; i < 100; i++) {
 
        // Fake product name
        const product = faker.commerce.product()
        productList.push({id: i+1, productName:product})
    }

    return productList;
}

const allProducts = fakerData();
// console.log(allProducts)

module.exports = fakerData