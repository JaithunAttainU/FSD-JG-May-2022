
async function addProduct() {
  const name = document.getElementById('name').value
  const description = document.getElementById('description').value
  const price = document.getElementById('price').value

  const addProductResponseObj = await fetch('/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      description,
      price: Number(price)
    })
  })

  const addProductStatus = await addProductResponseObj.json()
  if (addProductStatus.status === 'success') {
    // alert('Product Added Successfully')
    window.location = '/Success.html'
  } else {
    alert("Error Adding Product")
  }
}

async function getProducts() {
  const productListEle = document.getElementById('product-list')
  const getProductResponseObj = await fetch('/products')
  const getProductsBody = await getProductResponseObj.json()

  const { products } = getProductsBody
  if (products.length === 0) {
    productListEle.append('No Product Found')
  } else {
    for (let index = 0; index < products.length; index++) {
      const product = products[index];
      const liEle = document.createElement('li')
      liEle.innerText = `Name: ${product.name} Price: ${product.price}`
      if (product.imageUrl) {
        liEle.innerHTML = `Name: ${product.name} Price: ${product.price} <img src=${product.imageUrl} width=200 height=200/>`
      }
      productListEle.append(liEle)
    }
  }
}