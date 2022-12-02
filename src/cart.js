let label = document.getElementById("label")
let ShoppingCart = document.getElementById("shopping-cart")

let basket = JSON.parse(localStorage.getItem("data")) || [];


let calculation = () => {

    let cartIcon = document.getElementById("cartAmount")
    console.log()
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}
calculation();

let generateCartItems = () => {
    if (basket.length != 0) {
        return ShoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            let {img,name,price} = search
            return `
            <div class="cart-item">
            
            <img width="100" src=${img} alt="">

            <div class="details">
        <div class="title-price-x">
            <h4 class = "title-price">
                <p>${name}</p>
                <p class="cart-item-price"><i  class="bi bi-currency-rupee"></i>${price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-trash3"></i>

        </div>

        <div class="buttons">

                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>

        <h3><i class="bi bi-currency-rupee"></i>${item * search.price}</h3>
    </div>
            
            </div>
            
            
            
            `
        }).join("")
    }
    else {
        ShoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>cart is Empty</h2>
        <a href="index.html"> 
        <button class="HomeBtn">Back to Home</button>
    </a>
        `
    }
}
generateCartItems()

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id)

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1
        })
    }
    else {
        search.item += 1;
    }
    update(selectedItem.id)
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket))
}
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id)

    if (search === undefined) return

    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    update(selectedItem.id)
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket))
}

let update = (id) => {
    let search = basket.find((x) => x.id === id)
   
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
}


let removeItem = (id) => {
    let selectedItem = id
    basket = basket.filter((x) => x.id !== selectedItem.id)
    generateCartItems()
    TotalAmount()
    calculation();
    localStorage.setItem("data", JSON.stringify(basket))
}

let clearCart = () => {
    basket = []
    generateCartItems()
    calculation();
    TotalAmount()
    
    localStorage.setItem("data", JSON.stringify(basket))
}

let TotalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id } = x;
            let search = shopItemsData.find((y) => y.id === id) || []
            return item *search.price
        }).reduce((x,y)=> x+y , 0)
        // console.log('amount :>> ', amount);
        label.innerHTML = `
        <h2>Total bill: <i class="bi bi-currency-rupee"></i>${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear cart</button>


        `
    } else {
        return;
    }
   
}

TotalAmount()