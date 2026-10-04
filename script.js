console.log("Velacookies website loaded!");

/* =========================
   CONFIG
   ========================= */

const API_BASE = "https://velacookies-production.up.railway.app";


/* =========================
   HERO IMAGE SLIDER
   ========================= */

const heroImages = [
    { src: "images/lotushero.jpeg", alt: "Vela Lotus Biscoff" },
    { src: "images/strawhero.jpeg", alt: "Scoopable Strawberry Nutella" },
    { src: "images/butterhero.jpeg", alt: "Butter Cookies" },
    { src: "images/nutthero.jpeg", alt: "Nutella Cookies" },
    { src: "images/chocohero.jpeg", alt: "Velaclassic Chocochip" },
    { src: "images/lotuscream.jpeg", alt: "Lotus Cream Cookies" }
];

const heroImageContainer = document.querySelector(".hero-image");
const heroImage = document.getElementById("hero-slider-image");
const dotsContainer = document.getElementById("hero-dots");

let currentSlide = 0;
let sliderInterval;
let startX = 0;
let isDragging = false;
let isAnimating = false;

heroImages.forEach((item) => {
    const image = new Image();
    image.src = item.src;
});

const nextImage = document.createElement("img");
nextImage.className = "hero-slider-next";
if (heroImageContainer && dotsContainer) {
    heroImageContainer.insertBefore(nextImage, dotsContainer);
}

if (dotsContainer) {
    dotsContainer.innerHTML = "";
    heroImages.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "hero-dot" + (index === 0 ? " active" : "");
        dot.setAttribute("aria-label", `Tampilkan gambar produk ${index + 1}`);

        dot.addEventListener("click", () => {
            if (isAnimating || index === currentSlide) return;
            stopSlider();
            showSlide(index, index > currentSlide ? "next" : "prev");
        });

        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    const dots = document.querySelectorAll(".hero-dot");
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
    });
}

function showSlide(index, direction = "next") {
    if (!heroImage || isAnimating || index === currentSlide) return;
    isAnimating = true;

    nextImage.src = heroImages[index].src;
    nextImage.alt = heroImages[index].alt;

    const startPos = direction === "next" ? "100%" : "-100%";
    const exitPos = direction === "next" ? "-100%" : "100%";

    nextImage.style.transition = "none";
    nextImage.style.transform = `translateX(${startPos})`;
    nextImage.style.opacity = "1";

    void nextImage.offsetWidth;

    nextImage.style.transition = "transform 0.5s ease-in-out";
    heroImage.style.transition = "transform 0.5s ease-in-out";

    heroImage.style.transform = `translateX(${exitPos})`;
    nextImage.style.transform = "translateX(0)";

    setTimeout(() => {
        currentSlide = index;
        heroImage.style.transition = "none";
        heroImage.src = heroImages[currentSlide].src;
        heroImage.alt = heroImages[currentSlide].alt;
        heroImage.style.transform = "translateX(0)";
        nextImage.style.opacity = "0";

        updateDots();
        isAnimating = false;
        restartSlider();
    }, 500);
}

function nextSlide() {
    if (isAnimating) return;
    showSlide((currentSlide + 1) % heroImages.length, "next");
}

function prevSlide() {
    if (isAnimating) return;
    showSlide((currentSlide - 1 + heroImages.length) % heroImages.length, "prev");
}

if (heroImageContainer) {
    heroImageContainer.addEventListener("touchstart", (e) => {
        if (isAnimating) return;
        startX = e.touches[0].clientX;
        isDragging = true;
        stopSlider();
    }, { passive: true });

    heroImageContainer.addEventListener("touchend", (e) => {
        if (!isDragging) return;
        isDragging = false;
        handleSwipe(startX, e.changedTouches[0].clientX);
    });

    heroImageContainer.addEventListener("mousedown", (e) => {
        if (isAnimating) return;
        startX = e.clientX;
        isDragging = true;
        stopSlider();
        heroImageContainer.classList.add("is-dragging");
    });

    heroImageContainer.addEventListener("mouseup", (e) => {
        if (!isDragging) return;
        isDragging = false;
        heroImageContainer.classList.remove("is-dragging");
        handleSwipe(startX, e.clientX);
    });

    heroImageContainer.addEventListener("mouseleave", () => {
        if (!isDragging) return;
        isDragging = false;
        heroImageContainer.classList.remove("is-dragging");
        restartSlider();
    });
}

function handleSwipe(start, end) {
    const diffX = start - end;
    if (diffX > 40) nextSlide();
    else if (diffX < -40) prevSlide();
    else restartSlider();
}

function startSlider() {
    stopSlider();
    sliderInterval = setInterval(nextSlide, 4500);
}

function stopSlider() {
    clearInterval(sliderInterval);
}

function restartSlider() {
    stopSlider();
    startSlider();
}

if (heroImage) {
    heroImage.src = heroImages[0].src;
    heroImage.alt = heroImages[0].alt;
    startSlider();
}


/* =========================
   COUNTDOWN TIMER (PO STATUS)
   ========================= */

let poEndDate = null;

async function loadPOCountdown() {
    try {
        const response = await fetch(`${API_BASE}/api/po/status`);
        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error("Gagal mengambil data PO.");
        }

        if (!result.isOpen || !result.po || !result.po.tanggalTutup) {
            poEndDate = null;
            return;
        }

        poEndDate = new Date(result.po.tanggalTutup).getTime();
        updateCountdown();

    } catch (error) {
        console.error("Error loading PO countdown:", error);
    }
}

function updateCountdown() {
    const poCountdownEl = document.getElementById("po-countdown");

    if (!poEndDate) return;

    const now = new Date().getTime();
    const distance = poEndDate - now;

    if (distance < 0) {
        if (poCountdownEl) {
            poCountdownEl.innerHTML =
                "<span style='color: var(--gold); font-weight: bold;'>PO Telah Ditutup</span>";
        }
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const elDays = document.getElementById("cd-days");
    const elHours = document.getElementById("cd-hours");
    const elMinutes = document.getElementById("cd-minutes");
    const elSeconds = document.getElementById("cd-seconds");

    if (elDays) elDays.innerText = String(days).padStart(2, "0");
    if (elHours) elHours.innerText = String(hours).padStart(2, "0");
    if (elMinutes) elMinutes.innerText = String(minutes).padStart(2, "0");
    if (elSeconds) elSeconds.innerText = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
loadPOCountdown();


/* =========================
   PRODUCT DATA
   ========================= */

const PRODUCTS = {
    "chocochip": {
        name: "Velaclassic Chocochip",
        category: "CLASSIC",
        price: 12000,
        image: "images/chocochip.jpeg",
        description: "Klasik, lembut, penuh choco chip — teman ngemil yang nggak pernah gagal.",
        hasAddon: false
    },
    "biscoff": {
        name: "Vela Lotus Biscoff",
        category: "FAVORITE",
        price: 15000,
        image: "images/biscoff.jpeg",
        description: "Lelehan Lotus Biscoff, crunchy biscuit, sejuta candu dalam satu gigitan.",
        hasAddon: false
    },
    "scoopable": {
        name: "Scoopable Nutella Cookies",
        category: "SPECIAL",
        price: 28000,
        image: "images/scoopable.jpeg",
        description: "Nutella lumer, strawberry segar, tinggal scoop — momen self-reward kamu.",
        hasAddon: true,
        addonName: "Strawberry + Extra Nutella",
        addonPrice: 8000
    },
    "nutella-tin": {
        name: "Cookie Nutella Tin",
        category: "PREMIUM",
        price: 80000,
        image: "images/nutella-tin.jpeg",
        description: "Giant cookie gold, jaring Nutella & strawberry — favorit untuk dinikmati bersama.",
        hasAddon: true,
        addonName: "Strawberry + Extra Nutella",
        addonPrice: 15000
    }
};

function formatRupiah(number) {
    return "Rp" + number.toLocaleString("id-ID");
}


/* =========================
   STOCK STATE & HELPERS
   ========================= */

let stockData = {};

async function loadStockStatus() {
    try {
        const response = await fetch(`${API_BASE}/api/stocks/status`);
        const result = await response.json();

        if (result.success && result.stocks) {
            stockData = result.stocks;
            renderStockLabels();
        }
    } catch (error) {
        console.error("Load stock status error:", error);
    }
}

function getStockInfo(key) {
    const info = stockData[key];
    if (!info) {
        return { status: "out", stock: 0 };
    }
    return info;
}

function renderStockLabels() {
    const stockElements = document.querySelectorAll(".product-stock");

    stockElements.forEach((el) => {
        const key = el.dataset.stockKey;
        const info = getStockInfo(key);

        el.classList.remove("available", "low", "out");

        if (info.status === "out") {
            el.innerText = "Stok habis";
            el.classList.add("out");
        } else if (info.status === "low") {
            el.innerText = `Stok : ${info.stock} pcs — terbatas!`;
            el.classList.add("low");
        } else {
            el.innerText = `Stok : ${info.stock} pcs`;
            el.classList.add("available");
        }
    });

    // Disable add button kalau habis
    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach((card) => {
        const productId = card.dataset.id;
        const info = getStockInfo(productId);
        const addBtn = card.querySelector(".add-button");
        const stockLabel = card.querySelector(".product-stock");

        if (addBtn) {
            if (info.status === "out") {
                addBtn.disabled = true;
                addBtn.style.opacity = "0.4";
                addBtn.style.cursor = "not-allowed";
            } else {
                addBtn.disabled = false;
                addBtn.style.opacity = "";
                addBtn.style.cursor = "";
            }
        }

        if (stockLabel) {
            card.classList.toggle("stock-out", info.status === "out");
        }
    });
}

/* =========================
   CART STATE
   ========================= */

let cart = [];

const cartCountElement = document.querySelector(".cart-count");
const cartButton = document.querySelector(".cart-button");

function updateCartBadge() {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCountElement) cartCountElement.innerText = totalQty;

    if (cartButton) {
        cartButton.classList.add("bounce");
        setTimeout(() => cartButton.classList.remove("bounce"), 350);
    }

    updateFloatingCart();
}


/* =========================
   FLOATING CART
   ========================= */

const floatingCartBtn = document.getElementById("floating-cart");
const floatingCartCountEl = document.getElementById("floating-cart-count");
const floatingCartTotalEl = document.getElementById("floating-cart-total");

function updateFloatingCart() {
    if (!floatingCartBtn) return;

    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => {
        return sum + (item.price + item.addonPrice) * item.quantity;
    }, 0);

    if (totalQty === 0) {
        floatingCartBtn.classList.remove("visible", "pulse");
        return;
    }

    if (floatingCartCountEl) {
        floatingCartCountEl.innerText = totalQty + (totalQty === 1 ? " item" : " items");
    }

    if (floatingCartTotalEl) {
        floatingCartTotalEl.innerText = formatRupiah(totalPrice);
    }

    const wasHidden = !floatingCartBtn.classList.contains("visible");
    floatingCartBtn.classList.add("visible");

    if (!wasHidden) {
        floatingCartBtn.classList.remove("pulse");
        void floatingCartBtn.offsetWidth;
        floatingCartBtn.classList.add("pulse");
    }
}

if (floatingCartBtn) {
    floatingCartBtn.addEventListener("click", openCart);
}


/* =========================
   PRODUCT MODAL
   ========================= */

const productModal = document.getElementById("product-modal");
const modalClose = document.getElementById("modal-close");
const modalImg = document.getElementById("modal-img");
const modalCategory = document.getElementById("modal-category");
const modalName = document.getElementById("modal-name");
const modalDescription = document.getElementById("modal-description");
const modalBasePrice = document.getElementById("modal-base-price");
const modalAddonWrap = document.getElementById("modal-addon-wrap");
const modalAddonCheckbox = document.getElementById("modal-addon-checkbox");
const modalAddonPriceEl = document.getElementById("modal-addon-price");
const qtyMinusBtn = document.getElementById("qty-minus");
const qtyPlusBtn = document.getElementById("qty-plus");
const qtyValueEl = document.getElementById("qty-value");
const modalSubtotalEl = document.getElementById("modal-subtotal");
const modalAddToCartBtn = document.getElementById("modal-add-to-cart");

let activeProductId = null;
let activeQty = 1;

const addButtons = document.querySelectorAll(".add-button");

function openProductModal(productId) {
    const product = PRODUCTS[productId];
    if (!product) return;

    activeProductId = productId;
    activeQty = 1;

    modalImg.src = product.image;
    modalImg.alt = product.name;
    modalCategory.innerText = product.category;
    modalName.innerText = product.name;
    modalDescription.innerText = product.description;
    modalBasePrice.innerText = formatRupiah(product.price);
    qtyValueEl.innerText = activeQty;
    modalAddonCheckbox.checked = false;

    if (product.hasAddon) {
        modalAddonWrap.hidden = false;
        modalAddonPriceEl.innerText = formatRupiah(product.addonPrice);
    } else {
        modalAddonWrap.hidden = true;
    }

    updateModalSubtotal();
    if (productModal) productModal.classList.add("active");
}

function closeProductModal() {
    if (productModal) productModal.classList.remove("active");
    activeProductId = null;
}

function updateModalSubtotal() {
    const product = PRODUCTS[activeProductId];
    if (!product) return;

    let unitPrice = product.price;
    if (product.hasAddon && modalAddonCheckbox.checked) {
        unitPrice += product.addonPrice;
    }

    const subtotal = unitPrice * activeQty;
    modalSubtotalEl.innerText = formatRupiah(subtotal);
}

addButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".product-card");
        const productId = card ? card.dataset.id : null;
        if (!productId) return;

        const info = getStockInfo(productId);
        if (info.status === "out") {
            alert("Stok produk ini sedang habis. Coba lagi nanti ya!");
            return;
        }

        openProductModal(productId);
    });
});

if (modalClose) modalClose.addEventListener("click", closeProductModal);

if (productModal) {
    productModal.addEventListener("click", (e) => {
        if (e.target === productModal) closeProductModal();
    });
}

if (qtyMinusBtn) {
    qtyMinusBtn.addEventListener("click", () => {
        if (activeQty > 1) {
            activeQty--;
            qtyValueEl.innerText = activeQty;
            updateModalSubtotal();
        }
    });
}

if (qtyPlusBtn) {
    qtyPlusBtn.addEventListener("click", () => {
        activeQty++;
        qtyValueEl.innerText = activeQty;
        updateModalSubtotal();
    });
}

if (modalAddonCheckbox) {
    modalAddonCheckbox.addEventListener("change", updateModalSubtotal);
}

if (modalAddToCartBtn) {
    modalAddToCartBtn.addEventListener("click", () => {
        const product = PRODUCTS[activeProductId];
        if (!product) return;

        const addonSelected = product.hasAddon && modalAddonCheckbox.checked;
        const key = activeProductId + (addonSelected ? "-addon" : "");

        const existing = cart.find((item) => item.key === key);

        if (existing) {
            existing.quantity += activeQty;
        } else {
            cart.push({
                key: key,
                productId: activeProductId,
                name: product.name,
                image: product.image,
                price: product.price,
                addonName: addonSelected ? product.addonName : null,
                addonPrice: addonSelected ? product.addonPrice : 0,
                quantity: activeQty
            });
        }

        renderCart();
        updateCartBadge();
        closeProductModal();
        openCart();
    });
}


/* =========================
   CART DRAWER
   ========================= */

const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const cartCloseBtn = document.getElementById("cart-close");
const cartItemsContainer = document.getElementById("cart-items");
const cartEmptyEl = document.getElementById("cart-empty");
const cartTotalEl = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const cartNoteEl = document.getElementById("cart-note");

function openCart() {
    if (cartDrawer) cartDrawer.classList.add("active");
    if (cartOverlay) cartOverlay.classList.add("active");
}

function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove("active");
    if (cartOverlay) cartOverlay.classList.remove("active");
}

if (cartButton) cartButton.addEventListener("click", openCart);
if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCart);
if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

function renderCart() {
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML =
            '<p class="cart-empty" id="cart-empty">Keranjang masih kosong. Yuk pilih cookies favoritmu!</p>';
        cartTotalEl.innerText = formatRupiah(0);
        checkoutBtn.disabled = true;
        return;
    }

    let total = 0;
    let html = "";

    cart.forEach((item) => {
        const unitPrice = item.price + item.addonPrice;
        const lineSubtotal = unitPrice * item.quantity;
        total += lineSubtotal;

        html += `
            <div class="cart-item" data-key="${item.key}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    ${item.addonName ? `<p class="cart-item-addon">+ ${item.addonName}</p>` : ""}
                    <div class="cart-item-qty">
                        <button type="button" class="cart-qty-minus">-</button>
                        <span>${item.quantity}</span>
                        <button type="button" class="cart-qty-plus">+</button>
                    </div>
                </div>
                <div class="cart-item-right">
                    <strong>${formatRupiah(lineSubtotal)}</strong>
                    <button type="button" class="cart-item-remove">Hapus</button>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = html;
    cartTotalEl.innerText = formatRupiah(total);
    checkoutBtn.disabled = false;
}

if (cartItemsContainer) {
    cartItemsContainer.addEventListener("click", (e) => {
        const itemEl = e.target.closest(".cart-item");
        if (!itemEl) return;

        const key = itemEl.dataset.key;
        const item = cart.find((c) => c.key === key);
        if (!item) return;

        if (e.target.classList.contains("cart-qty-plus")) {
            item.quantity++;
        } else if (e.target.classList.contains("cart-qty-minus")) {
            item.quantity--;
            if (item.quantity <= 0) {
                cart = cart.filter((c) => c.key !== key);
            }
        } else if (e.target.classList.contains("cart-item-remove")) {
            cart = cart.filter((c) => c.key !== key);
        } else {
            return;
        }

        renderCart();
        updateCartBadge();
    });
}

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) return;
        closeCart();
        openCheckoutModal();
    });
}


/* =========================
   CHECKOUT & API INTEGRATION
   ========================= */

function buildOrderItemsHTML(items) {
    let html = "";

    items.forEach((item) => {
        const unitPrice = item.price + item.addonPrice;
        const lineSubtotal = unitPrice * item.quantity;

        html += `
            <div class="checkout-summary-row">
                <span class="row-name">
                    ${item.quantity}x ${item.name}
                    ${item.addonName ? `<span class="row-addon">+ ${item.addonName}</span>` : ""}
                </span>
                <span class="row-price">${formatRupiah(lineSubtotal)}</span>
            </div>
        `;
    });

    return html;
}

function calculateCartTotal(items) {
    return items.reduce((sum, item) => {
        return sum + (item.price + item.addonPrice) * item.quantity;
    }, 0);
}


/* =========================
   PAYMENT HELPERS
   ========================= */

let paymentSettings = {
    adminWaNumber: "6285117122454",
    qrisImageUrl: "/images/qris.jpeg",
    qrisOwnerName: "Velacookies"
};

let confirmationRedirectTimer = null;

async function loadPaymentSettings() {
    try {
        const response = await fetch(`${API_BASE}/api/payment-settings`);
        const result = await response.json();

        if (result.success && result.settings) {
            paymentSettings = result.settings;
        }
    } catch (error) {
        console.error("Load payment settings error:", error);
    }
}

function getSelectedPaymentMethod() {
    let selected = "cash";
    checkoutPaymentRadios.forEach((radio) => {
        if (radio.checked) selected = radio.value;
    });
    return selected;
}

function resetPaymentField() {
    checkoutPaymentRadios.forEach((radio) => {
        radio.checked = radio.value === "cash";
    });
}

function getLocationLabel(location) {
    const map = {
        "sman1": "SMAN 1 Karawang",
        "sman5": "SMAN 5 Karawang",
        "others": "Lainnya"
    };
    return map[location] || "Lainnya";
}

function openWhatsApp(phone, message) {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

function buildCashWhatsAppMessage(order) {
    const lines = [];

    lines.push("Halo Velacookies! \uD83C\uDF6A");
    lines.push("");
    lines.push("Saya mau order dengan metode COD:");
    lines.push("");
    lines.push(`Order ID: ${order.orderId}`);
    lines.push(`Nama: ${order.name}`);
    lines.push(`Total: ${formatRupiah(order.total)} (${order.totalPcs} pcs)`);
    lines.push(`Lokasi: ${order.locationLabel}`);

    if (order.totalPcs >= 3) {
        const dp = Math.round(order.total * 0.5);
        lines.push("");
        lines.push(`Karena order saya \u22653 pcs, saya siap DP 50% dulu = ${formatRupiah(dp)}.`);
        lines.push("Mohon diinfo cara DP-nya ya. Terima kasih!");
    } else {
        lines.push("");
        lines.push("Mohon diinfo kapan bisa COD ya. Terima kasih!");
    }

    return lines.join("\n");
}

function clearConfirmationRedirect() {
    if (confirmationRedirectTimer) {
        clearInterval(confirmationRedirectTimer);
        confirmationRedirectTimer = null;
    }

    if (confirmationActionBtn) {
        confirmationActionBtn.disabled = false;
    }
}

function startCashRedirectCountdown(waMessage) {
    clearConfirmationRedirect();

    let secondsLeft = 2;
    const baseText = "Membuka WhatsApp...";

    if (confirmationActionBtn) {
        confirmationActionBtn.innerText = baseText;
        confirmationActionBtn.disabled = true;
    }

    confirmationRedirectTimer = setInterval(() => {
        secondsLeft--;

        if (secondsLeft <= 0) {
            clearConfirmationRedirect();
            openWhatsApp(paymentSettings.adminWaNumber, waMessage);
            return;
        }
    }, 1000);
}

function startQrisRedirectCountdown(orderId) {
    clearConfirmationRedirect();

    let secondsLeft = 3;
    const baseText = "Lanjut ke Pembayaran";

    if (confirmationActionBtn) {
        confirmationActionBtn.innerText = `${baseText} (${secondsLeft})`;
    }

    confirmationRedirectTimer = setInterval(() => {
        secondsLeft--;

        if (secondsLeft <= 0) {
            clearConfirmationRedirect();
            window.location.href = `payment.html?orderId=${orderId}`;
            return;
        }

        if (confirmationActionBtn) {
            confirmationActionBtn.innerText = `${baseText} (${secondsLeft})`;
        }
    }, 1000);
}


/* =========================
   CHECKOUT MODAL
   ========================= */

const checkoutModal = document.getElementById("checkout-modal");
const checkoutModalClose = document.getElementById("checkout-modal-close");
const checkoutSummaryItemsEl = document.getElementById("checkout-summary-items");
const checkoutSummaryTotalEl = document.getElementById("checkout-summary-total");
const checkoutNameInput = document.getElementById("checkout-name");
const checkoutWaInput = document.getElementById("checkout-wa");
const checkoutNoteInput = document.getElementById("checkout-note");
const checkoutNameError = document.getElementById("checkout-name-error");
const checkoutWaError = document.getElementById("checkout-wa-error");
const checkoutSubmitBtn = document.getElementById("checkout-submit");

/* LOKASI — DOM */
const checkoutLocationRadios = document.querySelectorAll('input[name="checkout-location"]');
const checkoutLocationError = document.getElementById("checkout-location-error");
const checkoutLocationDetailGroup = document.getElementById("checkout-location-detail-group");
const checkoutLocationDetailInput = document.getElementById("checkout-location-detail");
const checkoutLocationDetailError = document.getElementById("checkout-location-detail-error");

/* PAYMENT — DOM */
const checkoutPaymentRadios = document.querySelectorAll('input[name="checkout-payment"]');
const checkoutPaymentError = document.getElementById("checkout-payment-error");

function openCheckoutModal() {
    if (checkoutSummaryItemsEl) {
        checkoutSummaryItemsEl.innerHTML = buildOrderItemsHTML(cart);
    }
    if (checkoutSummaryTotalEl) {
        checkoutSummaryTotalEl.innerText = formatRupiah(calculateCartTotal(cart));
    }

    if (checkoutNameInput) checkoutNameInput.value = "";
    if (checkoutWaInput) checkoutWaInput.value = "";
    if (checkoutNoteInput) checkoutNoteInput.value = "";
    resetLocationFields();
    resetPaymentField();
    clearCheckoutErrors();

    if (checkoutModal) checkoutModal.classList.add("active");
}

function closeCheckoutModal() {
    if (checkoutModal) checkoutModal.classList.remove("active");
}

function clearCheckoutErrors() {
    if (checkoutNameError) checkoutNameError.innerText = "";
    if (checkoutWaError) checkoutWaError.innerText = "";
    if (checkoutLocationError) checkoutLocationError.innerText = "";
    if (checkoutLocationDetailError) checkoutLocationDetailError.innerText = "";
    if (checkoutPaymentError) checkoutPaymentError.innerText = "";
    if (checkoutNameInput) checkoutNameInput.classList.remove("invalid");
    if (checkoutWaInput) checkoutWaInput.classList.remove("invalid");
    if (checkoutLocationDetailInput) checkoutLocationDetailInput.classList.remove("invalid");
}

/* LOKASI — helper */
function getSelectedLocation() {
    let selected = null;
    checkoutLocationRadios.forEach((radio) => {
        if (radio.checked) selected = radio.value;
    });
    return selected;
}

function resetLocationFields() {
    checkoutLocationRadios.forEach((radio) => {
        radio.checked = false;
    });
    if (checkoutLocationDetailInput) {
        checkoutLocationDetailInput.value = "";
    }
    if (checkoutLocationDetailGroup) {
        checkoutLocationDetailGroup.hidden = true;
    }
}

checkoutLocationRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
        const selected = getSelectedLocation();

        if (selected === "others") {
            if (checkoutLocationDetailGroup) {
                checkoutLocationDetailGroup.hidden = false;
            }
        } else {
            if (checkoutLocationDetailGroup) {
                checkoutLocationDetailGroup.hidden = true;
            }
            if (checkoutLocationDetailInput) {
                checkoutLocationDetailInput.value = "";
            }
        }

        if (checkoutLocationError) checkoutLocationError.innerText = "";
        if (checkoutLocationDetailError) checkoutLocationDetailError.innerText = "";
    });
});

checkoutPaymentRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
        if (checkoutPaymentError) checkoutPaymentError.innerText = "";
    });
});

if (checkoutModalClose) checkoutModalClose.addEventListener("click", closeCheckoutModal);

if (checkoutModal) {
    checkoutModal.addEventListener("click", (e) => {
        if (e.target === checkoutModal) closeCheckoutModal();
    });
}

function isValidWhatsApp(value) {
    return /^08[0-9]{8,12}$/.test(value);
}


/* =========================
  PO STATUS
  ========================= */

async function checkPOStatus() {
    try {
        const response = await fetch(`${API_BASE}/api/po/status`);
        const result = await response.json();

        if (!response.ok || !result.success) return false;
        return result.isOpen === true;

    } catch (error) {
        console.error("Error checking PO status:", error);
        return false;
    }
}

async function updatePOStatusUI() {
    const poIndicator = document.querySelector(".po-indicator");
    const poTitle = document.querySelector(".po-status h2");
    const poDescription = document.querySelector(".po-status p");
    const poCountdown = document.getElementById("po-countdown");

    try {
        const response = await fetch(`${API_BASE}/api/po/status`);
        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error("Gagal mengambil status PO.");
        }

        if (result.isOpen) {
            if (poIndicator) poIndicator.classList.remove("closed");
            if (poTitle) poTitle.innerText = "PO Sedang Dibuka";
            if (poDescription) {
                poDescription.innerText = "Yuk amankan cookies favoritmu sebelum PO ditutup.";
            }
            if (poCountdown) poCountdown.style.display = "";
        } else {
            if (poIndicator) poIndicator.classList.add("closed");
            if (poTitle) poTitle.innerText = "PO Sedang Ditutup";
            if (poDescription) {
                poDescription.innerText = "Pemesanan sedang ditutup. Tunggu PO berikutnya ya!";
            }
            if (poCountdown) poCountdown.style.display = "none";
        }

    } catch (error) {
        console.error("Error loading PO status:", error);
        if (poTitle) poTitle.innerText = "Status PO Tidak Diketahui";
        if (poDescription) {
            poDescription.innerText = "Gagal terhubung ke server. Silakan coba lagi.";
        }
    }
}


/* =========================
  CHECKOUT SUBMIT
  ========================= */

if (checkoutSubmitBtn) {
    checkoutSubmitBtn.addEventListener("click", async () => {
        clearCheckoutErrors();

        const name = checkoutNameInput.value.trim();
        const wa = checkoutWaInput.value.trim();
        const note = checkoutNoteInput.value.trim();

        let hasError = false;

        /* VALIDASI NAMA */
        if (name === "") {
            checkoutNameError.innerText = "Nama wajib diisi.";
            checkoutNameInput.classList.add("invalid");
            hasError = true;
        }

        /* VALIDASI WHATSAPP */
        if (wa === "") {
            checkoutWaError.innerText = "Nomor WhatsApp wajib diisi.";
            checkoutWaInput.classList.add("invalid");
            hasError = true;
        } else if (!isValidWhatsApp(wa)) {
            checkoutWaError.innerText =
                "Harus diawali 08 dan hanya berisi angka (contoh: 08123456789).";
            checkoutWaInput.classList.add("invalid");
            hasError = true;
        }

        /* VALIDASI LOKASI */
        const selectedLocation = getSelectedLocation();
        const locationDetail = checkoutLocationDetailInput
            ? checkoutLocationDetailInput.value.trim()
            : "";

        if (!selectedLocation) {
            if (checkoutLocationError) {
                checkoutLocationError.innerText = "Lokasi pengiriman wajib dipilih.";
            }
            hasError = true;
        } else if (selectedLocation === "others" && !locationDetail) {
            if (checkoutLocationDetailError) {
                checkoutLocationDetailError.innerText = "Alamat lengkap wajib diisi.";
            }
            if (checkoutLocationDetailInput) {
                checkoutLocationDetailInput.classList.add("invalid");
            }
            hasError = true;
        }

        /* VALIDASI CART */
        if (cart.length === 0) hasError = true;

        if (hasError) return;

        /* CEK STATUS PO */
        const poIsOpen = await checkPOStatus();
        if (!poIsOpen) {
            alert("Maaf, PO sedang ditutup.");
            return;
        }

        /* SIAPKAN ORDER */
        const orderItems = cart.map((item) => ({ ...item }));

        const selectedPaymentMethod = getSelectedPaymentMethod();

        const orderPayload = {
            customerName: name,
            whatsapp: wa,
            note: note,
            location: selectedLocation,
            locationDetail: selectedLocation === "others" ? locationDetail : "",
            paymentMethod: selectedPaymentMethod,
            items: orderItems
        };

        /* KIRIM KE FLASK */
        try {
            checkoutSubmitBtn.disabled = true;
            checkoutSubmitBtn.innerText = "Mengirim...";

            const response = await fetch(`${API_BASE}/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderPayload)
            });

            const result = await response.json();

            if (result.success) {
                const totalPcs = cart.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                );

                showConfirmation({
                    orderId: result.orderId,
                    name: name,
                    wa: wa,
                    note: note,
                    items: result.items,
                    total: result.total,
                    paymentMethod: selectedPaymentMethod,
                    totalPcs: totalPcs,
                    locationLabel: getLocationLabel(selectedLocation)
                });

                cart = [];
                renderCart();
                updateCartBadge();
                closeCheckoutModal();

            } else {
                alert(result.message || "Gagal membuat pesanan.");
            }

        } catch (error) {
            console.error("Error submitting order:", error);
            alert("Terjadi kesalahan koneksi ke server.");

        } finally {
            checkoutSubmitBtn.disabled = false;
            checkoutSubmitBtn.innerText = "Kirim Pesanan";
        }
    });
}


/* =========================
   ORDER CONFIRMATION MODAL
   ========================= */

const confirmationModal = document.getElementById("confirmation-modal");
const confirmationOrderIdEl = document.getElementById("confirmation-order-id");
const confirmationCustomerEl = document.getElementById("confirmation-customer");
const confirmationItemsEl = document.getElementById("confirmation-items");
const confirmationTotalEl = document.getElementById("confirmation-total");
const confirmationDoneBtn = document.getElementById("confirmation-done");
const confirmationActionBtn = document.getElementById("confirmation-action");
const confirmationInfoBox = document.getElementById("confirmation-info-box");

function showConfirmation(order) {
    if (confirmationOrderIdEl) confirmationOrderIdEl.innerText = order.orderId;

    if (confirmationCustomerEl) {
        confirmationCustomerEl.innerText = order.name + " \u00B7 " + order.wa;
    }

    if (confirmationItemsEl) {
        confirmationItemsEl.innerHTML = buildOrderItemsHTML(order.items);
    }

    if (confirmationTotalEl) {
        confirmationTotalEl.innerText = formatRupiah(order.total);
    }

    /* Info box — cuma muncul untuk COD */
    if (confirmationInfoBox) {
        if (order.paymentMethod === "cash") {
            confirmationInfoBox.hidden = false;
        } else {
            confirmationInfoBox.hidden = true;
        }
    }

    /* Atur tombol action berdasarkan metode pembayaran */
    if (confirmationActionBtn) {
        if (order.paymentMethod === "qris") {
            confirmationActionBtn.onclick = () => {
                clearConfirmationRedirect();
                window.location.href = `payment.html?orderId=${order.orderId}`;
            };
            startQrisRedirectCountdown(order.orderId);
        } else {
            const waMessage = buildCashWhatsAppMessage(order);

            confirmationActionBtn.onclick = () => {
                clearConfirmationRedirect();
                openWhatsApp(paymentSettings.adminWaNumber, waMessage);
            };
            startCashRedirectCountdown(waMessage);
        }
    }

    if (confirmationModal) confirmationModal.classList.add("active");
}

function closeConfirmationModal() {
    clearConfirmationRedirect();

    if (confirmationInfoBox) {
        confirmationInfoBox.hidden = true;
    }

    if (confirmationModal) confirmationModal.classList.remove("active");
}

if (confirmationDoneBtn) {
    confirmationDoneBtn.addEventListener("click", () => {
        clearConfirmationRedirect();
        closeConfirmationModal();
    });
}

if (confirmationModal) {
    confirmationModal.addEventListener("click", (e) => {
        if (e.target === confirmationModal) {
            clearConfirmationRedirect();
            closeConfirmationModal();
        }
    });
}


/* =========================
   INIT
   ========================= */

updateFloatingCart();
updatePOStatusUI();
loadPaymentSettings();
loadStockStatus();

/* =========================
   SCROLLBAR AUTO-HIDE
   ========================= */

function attachScrollbarAutoHide(el) {
    if (!el) return;

    let hideTimeout;

    el.addEventListener("scroll", () => {
        el.classList.add("is-scrolling");

        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            el.classList.remove("is-scrolling");
        }, 800);
    }, { passive: true });
}

document
    .querySelectorAll(".modal-box, .cart-items, .checkout-summary-items")
    .forEach(attachScrollbarAutoHide);