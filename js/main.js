const products = [
  {id: 1, title: 'Notebook', price: 20000},
  {id: 2, title: 'Mouse', price: 1500},
  {id: 3, title: 'Keyboard', price: 5000},
  {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = (title, price, img="placeimg.com") => {
  return `<div class="product-item">
            <h3>${title}</h3>
            <img src=https://${img}/220/160/tech>
            <p class="product-price">${price}</p>
            <button class="by-btn">Добавить в корзину</button>
          </div>`;
};
/*const renderProducts = (list) => {
  const productList = list.map((good) => {
    return renderProduct(good.title, good.price);
  });
  document.querySelector('.products').innerHTML = productList;
}
renderProducts(products);*/

products.forEach(good => {
  let {title, price} = good;
  let product = renderProduct(title, price); 
  document.querySelector('.products').insertAdjacentHTML('beforeend',product);
});

