const products = [
            {id: 1, name: "Slim Fit Denim Jeans", brand: "Levi's", price: 89.99, category: "men", sale: false, image: "images/slimfit.jpg"},
            {id: 2, name: "Floral Summer Dress", brand: "Zara", price: 59.99, category: "women", sale: false, image: "images/floral.jpg"},
            {id: 3, name: "Classic White Sneakers", brand: "Adidas", price: 79.99, oldPrice: 99.99, category: "men", sale: true, image: "images/sneakers.jpg"},
            {id: 4, name: "Oversized Hoodie", brand: "Nike", price: 64.99, category: "men", sale: false, image: "images/hoodie.jpg"},
            {id: 5, name: "Wrap Midi Dress", brand: "H&M", price: 49.99, category: "women", sale: false, image: "images/midi.jpg"},
            {id: 6, name: "Kids Cartoon T-Shirt", brand: "Gap Kids", price: 19.99, oldPrice: 24.99, category: "kids", sale: true, image: "images/cartoon.jpg"},
            {id: 7, name: "Slim Fit Blazer", brand: "Calvin Klein", price: 129.99, category: "men", sale: false, image: "images/blazer.jpg"},
            {id: 8, name: "Maxi Floral Dress", brand: "Mango", price: 79.99, category: "women", sale: false, image: "images/maxi.jpg"},
            {id: 9, name: "Cargo Joggers", brand: "Puma", price: 54.99, category: "men", sale: false, image: "images/joggers.jpg"},
            {id: 10, name: "Children's Winter Jacket", brand: "North Face", price: 89.99, oldPrice: 119.99, category: "kids", sale: true, image: "images/children'sjacket.jpg"},
            {id: 11, name: "Leather Crossbody Bag", brand: "Michael Kors", price: 149.99, category: "women", sale: false, image: "images/leatherbag.jpg"},
            {id: 12, name: "Cotton Polo Shirt", brand: "Ralph Lauren", price: 45.99, category: "men", sale: false, image: "images/cottonpolo.jpg"}
        ];

        let cart = [];
        let filteredProducts = [...products];

        function renderProducts(productsToRender) {
            const productsContainer = document.getElementById('products-container');
            productsContainer.innerHTML = '';

            productsToRender.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                
                let tagHtml = '';
                if (product.sale) {
                    tagHtml = '<span class="product-tag">SALE</span>';
                }

                let priceHtml = `$${product.price.toFixed(2)}`;
                if (product.oldPrice) {
                    priceHtml += ` <span class="old-price">$${product.oldPrice.toFixed(2)}</span>`;
                }

                productElement.innerHTML = `
                    ${tagHtml}
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-brand">${product.brand}</p>
                        <p class="product-price">${priceHtml}</p>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                `;
                productsContainer.appendChild(productElement);
            });
        }

        function filterProducts(category) {
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.textContent.toLowerCase().includes(category)) {
                    btn.classList.add('active');
                }
            });

            if (category === 'all') {
                filteredProducts = [...products];
            } else if (category === 'sale') {
                filteredProducts = products.filter(product => product.sale);
            } else {
                filteredProducts = products.filter(product => product.category === category);
            }

            renderProducts(filteredProducts);
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const cartItem = cart.find(item => item.id === productId);

            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({...product, quantity: 1});
            }

            updateCartCount();
            alert(`${product.name} added to cart!`);
        }

        function updateCartCount() {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            document.querySelector('.cart-count').textContent = totalItems;
        }

        // Initialize
        renderProducts(products);