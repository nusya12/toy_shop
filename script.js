const products = [
    {
        id: 1,
        name: "Кукла Барби",
        price: 2500,
        category: "dolls",
        image: "images/barbie.png",
        link: "item_barbie.html"
    },
    {
        id: 2,
        name: "Крутая машинка",
        price: 1200,
        category: "cars",
        image: "images/cool_car.jpg",
        link: "item_cool_car.html"
    },
    {
        id: 3,
        name: "Плюшевый медведь",
        price: 1800,
        category: "soft",
        image: "images/teddy_bear.jpg",
        link: "item_teddy_bear.html"
    }
];

let cart = [];

const calculateTotal = () => {
    let total = 0;
    cart.forEach(item => {
        total += item.price;
    });
    return total;
};

const renderCart = () => {
    const cartItemsDiv = document.getElementById("cart-items");
    const cartTotalSpan = document.getElementById("cart-total");
    
    if (!cartItemsDiv) return;
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Корзина пуста</p>";
        if (cartTotalSpan) cartTotalSpan.textContent = "0";
        return;
    }
    
    let html = "<ul class='cart-list'>";
    cart.forEach((item, index) => {
        html += `
            <li class='cart-item'>
                <span>${item.name}</span>
                <span>${item.price} руб.</span>
                <button class="remove-from-cart" data-index="${index}">Удалить</button>
            </li>
        `;
    });
    html += "</ul>";
    cartItemsDiv.innerHTML = html;
    
    const total = calculateTotal();
    if (cartTotalSpan) cartTotalSpan.textContent = total;
    
    document.querySelectorAll(".remove-from-cart").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = parseInt(btn.dataset.index);
            cart.splice(index, 1);
            renderCart();
        });
    });
};

const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price
        });
        renderCart();
        alert(`Товар "${product.name}" добавлен в корзину!`);
    }
};

const clearCart = () => {
    cart = [];
    renderCart();
};

const checkout = () => {
    if (cart.length === 0) {
        alert("Корзина пуста! Добавьте товары перед оплатой.");
    } else {
        alert("Покупка прошла успешно! Спасибо за заказ.");
        clearCart();
    }
};

const filterProducts = (category) => {
    const productCards = document.querySelectorAll(".product-card");
    
    productCards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (category === "all" || cardCategory === category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
};

const loadProductsToCatalog = () => {
    const catalogContainer = document.getElementById("products-container");
    if (!catalogContainer) return;
    
    let html = "";
    products.forEach(product => {
        html += `
            <div class="product-card" data-category="${product.category}" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" width="150" height="150">
                <h3>${product.name}</h3>
                <p class="price">Цена: ${product.price} руб.</p>
                <a href="${product.link}">Подробнее</a>
                <button class="add-to-cart-btn" data-id="${product.id}">Добавить в корзину</button>
            </div>
        `;
    });
    catalogContainer.innerHTML = html;
    
    document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const productId = parseInt(btn.dataset.id);
            addToCart(productId);
        });
    });
};

document.addEventListener("DOMContentLoaded", () => {
    loadProductsToCatalog();
    
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const category = btn.dataset.filter;
            filterProducts(category);
        });
    });
    
    const clearCartBtn = document.getElementById("clear-cart-btn");
    if (clearCartBtn) {
        clearCartBtn.addEventListener("click", clearCart);
    }
    
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", checkout);
    }
});