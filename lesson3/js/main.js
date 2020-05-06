const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ
let getRequest = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error');
      } else {
        cb(xhr.responseText);
      }
    }
  };
  xhr.send();
};

//переделанно 
// let getRequest = (url) => {   
//   return new Promise((resolve, reject) =>{
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () =>{
//       if (xhr.readyState === 4) {
//         if (xhr.status !== 200){
//           reject('Error!');
//         } else {
//           resolve(xhr.responseText);  
//         }
//       }
//     };
//     xhr.send();
//   });
// }

class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    // this._fetchProducts();
    this._getProducts()
        .then(data => {
          this.goods = [...data];
          this._render();
        });
    this._init();
  }

  // _fetchProducts() {
  //   getRequest(`${API}/catalogData.json`, (data) => {
  //     this.goods = JSON.parse(data);
  //     this._render();
  //   });
  // }

  // _fetchProducts() {измененный _fetchProducts() при применении Promise
  //     getRequest(`${API}/catalogData.json`).then((data)=>{
  //       this.goods = JSON.parse(data);
  //       this._render()
  //     })
  //     };
  _getProducts() {
    return fetch(`${API}/catalogData.json`)
        .then(response => response.json())
        .catch(error => {
          console.log(error);
        });
  }

  calcSum() {
    return this.goods.reduce((sum, good) => sum + good.price, 0);
  }

  _render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }

  _init(){
    document.querySelector(this.container).addEventListener('click', e => {
      if(e.target.classList.contains('buy-btn')){
        let clickedProductId= e.target.parentElement.parentElement.dataset.id;
        console.log(clickedProductId);
        console.log(cart);
        // cart.allProducts[0].quantity++; для нагладности
        cart.allProducts.forEach(product =>{
          if (product.id == clickedProductId){
            if (product.quantity==0){
            const block = document.querySelector('.div-cart');
           product.quantity++;
            let El= `<div class="cart-item" data-id="${product.id}">
            <img src="${product.img}" alt="Some img">
                <p>${product.title}</p>
                <p>${product.price} \u20bd</p>
                <p class="q">${product.quantity}</p>
                <p class="summ">${product.price*product.quantity}\u20bd</p>
                <button class="del">x</button>
        </div>`;
            block.insertAdjacentHTML('beforeend', El);
            }
            else if (product.quantity>0){
              let block = document.querySelector(`.cart-item[data-id="${clickedProductId}"]`);
           console.log(block.querySelector('.q'));
           product.quantity++;
            block.querySelector('.q').textContent = `${product.quantity}`;
            block.querySelector('.summ').textContent = `${product.price*product.quantity}\u20bd`;
            }
          } 
        })
        console.log(cart);
      }
    });
  }
}

class CartList {
  constructor (container = '.div-cart'){
  this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._getProducts()
        .then(data => {
          this.goods = [...data.contents];
          this._render();
        });
        this._del();
  }
  
  _getProducts() {
    return fetch(`${API}/getBasket.json`)
        .then(response => response.json())
        .catch(error => {
          console.log(error);
        });
  }
  _render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new CartItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
  _del(){   
    document.querySelector(this.container).addEventListener('click', e => {
      if(e.target.classList.contains('del')){
        let clickedProductId= e.target.parentElement.dataset.id;
        console.log(clickedProductId);
        console.log(cart);
        this.allProducts.forEach(product =>{
          let block = document.querySelector(`.cart-item[data-id="${clickedProductId}"]`);
          if (product.id == clickedProductId){
            if (product.quantity==1){
              product.quantity--;
              block.remove();
            }else{
            product.quantity--;
         console.log(block.querySelector('.q'));
          block.querySelector('.q').textContent = `${product.quantity}`;
          block.querySelector('.summ').textContent = `${product.price*product.quantity}\u20bd`;
            }
          }
        })
        console.log(cart);
      }
    });
  }
}

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

class CartItem {
  constructor(product, img = 'https://placehold.it/50x30') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.quantity = product.quantity;
    this.img = img;
  }

  render() {
    return `<div class="cart-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                    <p>${this.title}</p>
                    <p>${this.price} \u20bd</p>
                    <p class="q">${this.quantity}</p>
                    <p class="summ">${this.price*this.quantity}\u20bd</p>
                    <button class="del">x</button>
            </div>`;
  }
} 
new ProductList();
let cart = new CartList();
let check = document.querySelector('.btn-cart').addEventListener('click', () => {
  document.querySelector('.div-cart').classList.toggle('hidden');
});
// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = (item, img='https://placehold.it/200x150') => `<div class="product-item" data-id="${this.id}">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${item.title}</h3>
//                   <p>${item.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => document.querySelector('.products')
//     .insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
//
// renderProducts(products);
