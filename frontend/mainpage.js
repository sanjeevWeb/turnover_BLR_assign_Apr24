let currentPage = 1;
let previousCheckedIds;

const baseUrl = "http://localhost:5000/api/v1"

const fetchProducts = async (page) => {
    try {
        const response = await axios.get(`${baseUrl}/products?page=${page}`);
        const { results, previous, next } = response.data;
        console.log(results)
        renderProducts(results);
        renderPagination(previous, next);

    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

const renderProducts = (products) => {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
                <input type="checkbox" id="${product.id}" name="product" value="${product.id}" ${previousCheckedIds && previousCheckedIds.indexOf(product.id) !== -1 ? 'checked' : ''}>
                <label for="${product.id}">${product.productName}</label>
            `;
        productsContainer.appendChild(productDiv);
    });
};

const renderPagination = (previous, next) => {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';

    if (previous) {
        const prevButton = createPaginationButton('Prev', previous.page);
        paginationContainer.appendChild(prevButton);
    }

    if (next) {
        const nextButton = createPaginationButton('Next', next.page);
        paginationContainer.appendChild(nextButton);
    }
    const button = document.createElement('button')
    button.textContent = 'save my choice'
    button.addEventListener('click', () => saveCheckedProducts())
    paginationContainer.appendChild(button)
};

const createPaginationButton = (text, page) => {
    const button = document.createElement('button');
    button.innerText = text;
    button.addEventListener('click', () => {
        currentPage = page;
        fetchProducts(currentPage);
    });
    return button;
};

async function saveCheckedProducts() {
    const products = document.querySelectorAll('input[name="product"]:checked');
    console.log(products)
    const checkedProductIds = [];

    products.forEach((checkbox) => {
        checkedProductIds.push(parseInt(checkbox.value));
    });
    console.log(checkedProductIds)

    // sending this to backend
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`${baseUrl}/chkproduct`, { checkedProductIds }, { headers: { 'Authorization': token } })
        if (response.data.msg) {
            alert(response.data.msg)
        }
        else {
            alert('something went wrong')
        }
    }
    catch (error) {
        console.log(error)
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${baseUrl}/getchkproduct`, { headers: { 'Authorization': token } })
        console.log(response)
        if(response.data.msg){
            return
        }
        else{
            if(response.data.checkedProducts){
                previousCheckedIds = response.data.checkedProducts.map(item => item.CheckedProductId)
            }
        }
    }
    catch (error) {
        console.log(error)
    }
})

fetchProducts(currentPage);