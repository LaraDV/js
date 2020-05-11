const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://placehold.it/200x150',
        searchLine: '',
        isVisibleCart: false,
        cartProducts:[],
        cartUrl: '/getBasket.json'
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product){
            console.log(product.id_product);
            let id=product.id_product;
            let container = document.getElementsByName(`${id}`);
            console.log(container);
            console.log(this.cartProducts);
            let added = this.cartProducts.find(item => item.id_product == id);
            if(added.quantity==0){
                added.quantity++;
                container[0].className='cart-item';/*ничего лучше не придумала*/
                
            }else{
            added.quantity++;
            }
        },
        delProduct(product){
            console.log(product.id_product);
            let id=product.id_product;
            let container = document.getElementsByName(`${id}`);
            console.log(container);
            console.log(this.cartProducts);
            let deleted = this.cartProducts.find(item => item.id_product == id);
            if (deleted.quantity==1){
                deleted.quantity--;
                // container.remove();
                container[0].className='cart-item-invisible';/*ничего лучше не придумала*/
            }else{
            deleted.quantity--;
            }
        },
        filterGoods(searchLine){
            console.log(this.searchLine);
            let newArr= this.products.forEach(product => {
                let container = document.getElementById(product.id_product);
                if (this.searchLine === ''){
                    console.log('показать');
                    container.className="product-item visible";
                }
                if (product.product_name.toLowerCase().includes(this.searchLine.toLowerCase())){
                    console.log('показать');
                    container.className="product-item visible";
                }
                else{
                    console.log('скрыть');
                    console.log(this.products.indexOf(product));
                    let index=this.products.indexOf(product);
                    console.log(this.products);
                    console.log(this.products[index].product_name);
                    console.log(container);
                   // container.classList.add('invisible');
                   container.className="product-item invisible";
                }
            });
        },
    },
    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });
            this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.cartProducts.push(el);
                }
            });
        },
});
