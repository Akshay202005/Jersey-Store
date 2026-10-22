// Navbar Toggle for Mobile
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar && nav) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close && nav) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// Live Search and Filter for Shop Page
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query")?.toLowerCase();

    // Handle search results only on JSSearch.html
    const searchResultsContainer = document.getElementById("searchResults");
    if (searchResultsContainer) {
        const products = [
            { name: "Manchester City 24/25 Third Jersey", image: "img/Premier League/Man City Third.png", link: "JSManCity.html", price: 399 },
            { name: "Manchester United 2024/25 Home Jersey", image: "img/Premier League/Man Utd.png", link: "JSManUtd.html", price: 399 },
            { name: "Tottenham Hotspur 2023/24 Home Jersey", image: "img/Premier League/Hotspur.png", link: "JSTotHotspur.html", price: 399 },
            { name: "Arsenal FC 24/25 Home Jersey", image: "img/Premier League/Arsenal FC.png", link: "JSArsenal.html", price: 399 },
            { name: "Napoli 2024/25 Home Jersey", image: "img/Italin League/Napoli.png", link: "JSNapoli.html", price: 399 },
            { name: "AC Milan 24/25 Home Jersey", image: "img/Italin League/AC Milan.png", link: "JSACMilan.html", price: 399 },
            { name: "AS Roma 24/25 Home Jersey", image: "img/Italin League/AC Roma.png", link: "JSACRoma.html", price: 399 },
            { name: "Juventus 2024/25 Home Jersey", image: "img/Italin League/Juventus.png", link: "JSJuventus.html", price: 399 },
            { name: "Al Hilal 24/25 Home Jersey", image: "img/Saudi League/Al Hilal.png", link: "JSAlHilal.html", price: 399 },
            { name: "Atletico Madrid 24/25 Home Jersey", image: "img/Spanish League/Atletico Madrid.png", link: "JSAtlMadrid.html", price: 399 },
            { name: "FC Barcelona 2024/25 Home Jersey", image: "img/Spanish League/FC Barcelona.png", link: "JSFCBarcelona.html", price: 399 },
            { name: "Real Madrid 2017/18 Home Jersey", image: "img/Spanish League/Real Madrid.png", link: "JSRealMadrid.html", price: 399 },
            { name: "Argentina 2024 Away Jersey", image: "img/Nationals/Argentina.png", link: "JSArgentina.html", price: 399 },
            { name: "Brazil 2024 Home Jersey", image: "img/Nationals/Brazil.png", link: "JSBrazil.html", price: 399 },
            { name: "England 2024 Home Jersey", image: "img/Nationals/England.png", link: "JSEngland.html", price: 399 },
            { name: "France 2024 Home Jersey", image: "img/Nationals/France.png", link: "JSFrance.html", price: 399 },
            { name: "Germany 2024 Home Jersey", image: "img/Nationals/Germany.png", link: "JSGermany.html", price: 399 },
            { name: "India 2024 Home Jersey", image: "img/Nationals/India.png", link: "JSIndia.html", price: 399 },
            { name: "Japan 2024 Home Jersey", image: "img/Nationals/Japan.png", link: "JSJapan.html", price: 399 },
            { name: "Portugal 2024 Home Jersey", image: "img/Nationals/Portugal.png", link: "JSPortugal.html", price: 399 },
            { name: "Spain 2024 Home Jersey", image: "img/Nationals/Spain.png", link: "JSSpain.html", price: 399 },
        ];

        if (!query) return;

        const filtered = products.filter(p => p.name.toLowerCase().includes(query));
        searchResultsContainer.innerHTML = '';

        if (filtered.length === 0) {
            searchResultsContainer.innerHTML = `<h3 style="color:red; text-align:center;">No products found for "${query}"</h3>`;
        } else {
            filtered.forEach(product => {
                const div = document.createElement("div");
                div.classList.add("pro");
                div.onclick = () => { window.location.href = product.link; };
                div.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="des">
                        <h5>${product.name}</h5>
                        <div class="star">
                            <i class="fas fa-star"></i><i class="fas fa-star"></i>
                            <i class="fas fa-star"></i><i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <h4>₹${product.price}</h4>
                        <a href="${product.link}"><i class="fal fa-shopping-cart cart"></i></a>
                    </div>
                `;
                searchResultsContainer.appendChild(div);
            });
        }
    }

    // Update cart display globally on every page
    updateCartDisplay();
});

// Only handle form submit for navigation
const searchForm = document.getElementById("searchForm");
if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const query = document.getElementById("searchBar").value.trim();
        if (query) {
            window.location.href = `JSSearch.html?query=${encodeURIComponent(query)}`;
        }
    });
}





// Shopping Cart Functionality with Buy Now Button
if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
}
let cart = JSON.parse(localStorage.getItem("cart"));

function addToCart(product) {
    if (!product || !product.name || !product.price || !product.size || !product.quantity) {
        alert("Error: Missing product details!");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.id === product.id && item.size === product.size);

    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
    updateCartDisplay();
}

function removeFromCart(id, size) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => !(item.id === id && item.size === size));

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item removed from cart!");
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartTable = document.querySelector('#cart tbody');
    if (!cartTable) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartTable.innerHTML = '';

    if (cart.length === 0) {
        cartTable.innerHTML = "<tr><td colspan='6' style='text-align:center;'>Your cart is empty!</td></tr>";
        return;
    }

    cart.forEach(item => {
        if (!item || !item.id || !item.name || !item.price) return;

        let row = document.createElement('tr');
        let subtotal = item.price * item.quantity;
        row.innerHTML = `
            <td><button onclick="removeFromCart('${item.id}', '${item.size}')">Remove</button></td>
            <td><img src="${item.image}" width="50"></td>
            <td>${item.name} (${item.size})</td>
            <td>₹${item.price}</td>
            <td>${item.quantity}</td>
            <td>₹${subtotal}</td>
        `;
        cartTable.appendChild(row);
    });
}

function handleAddToCart() {
    let productName = document.querySelector('.single-pro-details h4');
    let productPrice = document.querySelector('.single-pro-details h2');
    let productImage = document.querySelector('#MainImg');
    let productSize = document.querySelector('.single-pro-details select');
    let productQuantity = document.querySelector('.single-pro-details input');

    if (!productName || !productPrice || !productImage || !productSize || !productQuantity) {
        console.error("Product details not found on this page.");
        return;
    }

    let product = {
        id: productName.innerText.replace(/\s+/g, '-').toLowerCase(),
        name: productName.innerText,
        price: parseInt(productPrice.innerText.replace('₹', '')),
        image: productImage.src,
        size: productSize.value,
        quantity: parseInt(productQuantity.value)
    };

    if (product.size === 'Select size') {
        alert('Please select a size before adding to cart.');
        return;
    }

    addToCart(product);
}

function buyNow() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    localStorage.setItem('checkoutCart', JSON.stringify(cart));
    window.location.href = 'JSCheckout.html';
}

// On page load: Update cart display
document.addEventListener('DOMContentLoaded', function () {
    updateCartDisplay();
});


document.addEventListener('DOMContentLoaded', function () {

    // Cart display logic
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderSummary = document.getElementById("order-summary");
    const totalAmount = document.getElementById("total-amount");
    
    if (cart.length === 0) {
        orderSummary.innerHTML = "<p>Your cart is empty.</p>";
        totalAmount.innerText = "0";
    } else {
        let total = 0;
        orderSummary.innerHTML = "";
        cart.forEach(item => {
            const row = document.createElement('div');
            row.classList.add('order-item');
            row.innerHTML = `
                <p>${item.name} (${item.size})</p>
                <p>₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}</p>
            `;
            orderSummary.appendChild(row);
            total += item.price * item.quantity;
        });
        totalAmount.innerText = total;
    }

    // Dynamic jersey addition logic
    let jerseyCount = 1;
    const addJerseyBtn = document.getElementById('addJerseyBtn');
    const jerseyList = document.getElementById('jerseyList');

    if (addJerseyBtn) {
        addJerseyBtn.addEventListener('click', function() {
            jerseyCount++;

            const jerseyDiv = document.createElement('div');
            jerseyDiv.className = 'jersey-item';
            jerseyDiv.style = 'border:1px solid #ccc; padding:10px; margin-bottom:10px;';

            jerseyDiv.innerHTML = `
                <p>Jersey ${jerseyCount}</p>
                <label>Jersey Type:</label>
                <input type="text" name="jerseyType[]" placeholder="e.g. Home Kit, Away Kit">
                <label>Custom Name:</label>
                <input type="text" name="customName[]" placeholder="Leave blank for no custom name">
                <label>Custom Number:</label>
                <input type="number" name="customNumber[]" placeholder="Leave blank for no custom number" min="0" max="99">
            `;
            jerseyList.appendChild(jerseyDiv);
        });
    }

    // Checkout form submission
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const jerseyTypes = document.getElementsByName('jerseyType[]');
            const customNames = document.getElementsByName('customName[]');
            const customNumbers = document.getElementsByName('customNumber[]');

            let summary = "";

            jerseyTypes.forEach((input, index) => {
                const type = input.value.trim() || "Unknown Jersey";
                const name = customNames[index].value.trim();
                const number = customNumbers[index].value.trim();

                summary += `Jersey ${index + 1}:\n`;
                summary += ` - Type: ${type}\n`;

                if (name || number) {
                    if (name) summary += ` - Custom Name: ${name}\n`;
                    if (number) summary += ` - Custom Number: ${number}\n`;
                } else {
                    summary += ` - No customization.\n`;
                }

                summary += `\n`;
            });

            alert(summary);
        });
    }

    // Place Order logic
    const placeOrderButton = document.getElementById('placeOrder');
    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', function () {
            const name = document.getElementById('billing-name').value.trim();
            const email = document.getElementById('email-address').value.trim();
            const phone = document.getElementById('phone-number').value.trim();
            const address = document.getElementById('billing-address').value.trim();
            const isSameAddress = document.getElementById('same-address').checked;
            const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;

            if (!name || !email || !phone || !address || !paymentMethod) {
                alert("Please fill out all required fields.");
                return;
            }

            // Clear cart
            localStorage.removeItem("cart");

            alert('Order Placed Successfully!');
            window.location.href = 'JSThankYou.html';
        });
    }
});

