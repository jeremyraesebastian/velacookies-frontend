console.log("Velacookies website loaded!");

/* =========================
   HERO IMAGE SLIDER
   ========================= */

const heroImages = [
    {
        src: "images/lotushero.jpeg",
        alt: "Vela Lotus Biscoff"
    },
    {
        src: "images/strawhero.jpeg",
        alt: "Scoopable Strawberry Nutella"
    },
    {
        src: "images/butterhero.jpeg",
        alt: "Butter Cookies"
    },
    {
        src: "images/nutthero.jpeg",
        alt: "Nutella Cookies"
    },
    {
        src: "images/chocohero.jpeg",
        alt: "Velaclassic Chocochip"
    },
       {
        src: "images/lotuscream.jpeg",
        alt: "Lotus Cream Cookies"
    }
];

const heroImageContainer = document.querySelector(".hero-image");
const heroImage = document.getElementById("hero-slider-image");
const dotsContainer = document.getElementById("hero-dots");

let currentSlide = 0;
let sliderInterval;

let startX = 0;
let isDragging = false;
let isAnimating = false;


/* Preload Images */
heroImages.forEach((item) => {
    const image = new Image();
    image.src = item.src;
});


/* Buat Elemen Gambar Transisi */
const nextImage = document.createElement("img");
nextImage.className = "hero-slider-next";
if (heroImageContainer && dotsContainer) {
    heroImageContainer.insertBefore(nextImage, dotsContainer);
}


/* Create Dots */
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


/* Show Slide (Mulus Tanpa Glitch) */
function showSlide(index, direction = "next") {
    if (!heroImage || isAnimating || index === currentSlide) return;
    isAnimating = true;

    // Pasang gambar tujuan di layer transisi
    nextImage.src = heroImages[index].src;
    nextImage.alt = heroImages[index].alt;

    const startPos = direction === "next" ? "100%" : "-100%";
    const exitPos = direction === "next" ? "-100%" : "100%";

    // Posisikan nextImage di luar layar tanpa animasi dulu
    nextImage.style.transition = "none";
    nextImage.style.transform = `translateX(${startPos})`;
    nextImage.style.opacity = "1";

    // Force Reflow
    void nextImage.offsetWidth;

    // Aktifkan transisi pergerakan
    nextImage.style.transition = "transform 0.5s ease-in-out";
    heroImage.style.transition = "transform 0.5s ease-in-out";

    // Jalankan animasi geser
    heroImage.style.transform = `translateX(${exitPos})`;
    nextImage.style.transform = "translateX(0)";

    setTimeout(() => {
        currentSlide = index;

        // Samakan gambar utama dengan gambar baru secara instan
        heroImage.style.transition = "none";
        heroImage.src = heroImages[currentSlide].src;
        heroImage.alt = heroImages[currentSlide].alt;
        heroImage.style.transform = "translateX(0)";

        // Sembunyikan layer transisi
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


/* Touch & Mouse Events (Swipe/Drag) */
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


/* Init Hero Slider */
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
        const response = await fetch(
            "https://velacookies-production.up.railway.app/api/po/status"
        );

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

    if (!poEndDate) {
        return;
    }

    const now = new Date().getTime();
    const distance = poEndDate - now;

    if (distance < 0) {

        if (poCountdownEl) {
            poCountdownEl.innerHTML =
                "<span style='color: var(--gold); font-weight: bold;'>PO Telah Ditutup</span>";
        }

        return;
    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    const elDays = document.getElementById("cd-days");
    const elHours = document.getElementById("cd-hours");
    const elMinutes = document.getElementById("cd-minutes");
    const elSeconds = document.getElementById("cd-seconds");

    if (elDays) {
        elDays.innerText = String(days).padStart(2, "0");
    }

    if (elHours) {
        elHours.innerText = String(hours).padStart(2, "0");
    }

    if (elMinutes) {
        elMinutes.innerText = String(minutes).padStart(2, "0");
    }

    if (elSeconds) {
        elSeconds.innerText = String(seconds).padStart(2, "0");
    }
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
        description: "nanti di isi",
        hasAddon: false
    },
    "biscoff": {
        name: "Vela Lotus Biscoff",
        category: "FAVORITE",
        price: 15000,
        image: "images/biscoff.jpeg",
        description: "nanti di isi",
        hasAddon: false
    },
    "scoopable": {
        name: "Scoopable Nutella Cookies",
        category: "SPECIAL",
        price: 28000,
        image: "images/scoopable.jpeg",
        description: "nanti di isi",
        hasAddon: true,
        addonName: "Strawberry + Extra Nutella",
        addonPrice: 8000
    },
    "nutella-tin": {
        name: "Cookie Nutella Tin",
        category: "PREMIUM",
        price: 80000,
        image: "images/nutella-tin.jpeg",
        description: "nanti di isi",
        hasAddon: true,
        addonName: "Strawberry + Extra Nutella",
        addonPrice: 15000
    }
};


/* Format angka ke Rupiah */
function formatRupiah(number) {
    return "Rp" + number.toLocaleString("id-ID");
}


/* =========================
   CART STATE
   ========================= */

let cart = [];

const cartCountElement = document.querySelector(".cart-count");
const cartButton = document.querySelector(".cart-button");


function updateCartBadge() {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCountElement) {
        cartCountElement.innerText = totalQty;
    }

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

    // Kosong → sembunyikan
    if (totalQty === 0) {
        floatingCartBtn.classList.remove("visible", "pulse");
        return;
    }

    if (floatingCartCountEl) {
        floatingCartCountEl.innerText =
            totalQty + (totalQty === 1 ? " item" : " items");
    }

    if (floatingCartTotalEl) {
        floatingCartTotalEl.innerText = formatRupiah(totalPrice);
    }

    const wasHidden = !floatingCartBtn.classList.contains("visible");
    floatingCartBtn.classList.add("visible");

    // Pulse hanya kalau sebelumnya sudah tampil
    if (!wasHidden) {
        floatingCartBtn.classList.remove("pulse");
        void floatingCartBtn.offsetWidth; // force reflow
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
        if (productId) openProductModal(productId);
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
    clearCheckoutErrors();

    if (checkoutModal) checkoutModal.classList.add("active");
}

function closeCheckoutModal() {
    if (checkoutModal) checkoutModal.classList.remove("active");
}

function clearCheckoutErrors() {
    if (checkoutNameError) checkoutNameError.innerText = "";
    if (checkoutWaError) checkoutWaError.innerText = "";
    if (checkoutNameInput) checkoutNameInput.classList.remove("invalid");
    if (checkoutWaInput) checkoutWaInput.classList.remove("invalid");
}

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
        const response = await fetch("https://velacookies-production.up.railway.app/api/po/status");
        const result = await response.json();

        if (!response.ok || !result.success) {
            return false;
        }

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

        const response = await fetch(
            "https://velacookies-production.up.railway.app/api/po/status"
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error("Gagal mengambil status PO.");
        }


        /* =========================
           PO OPEN
           ========================= */

        if (result.isOpen) {

            if (poIndicator) {
                poIndicator.classList.remove("closed");
            }

            if (poTitle) {
                poTitle.innerText = "PO Sedang Dibuka";
            }

            if (poDescription) {
                poDescription.innerText =
                    "Yuk amankan cookies favoritmu sebelum PO ditutup.";
            }

            if (poCountdown) {
                poCountdown.style.display = "";
            }

        }


        /* =========================
           PO CLOSED
           ========================= */

        else {

            if (poIndicator) {
                poIndicator.classList.add("closed");
            }

            if (poTitle) {
                poTitle.innerText = "PO Sedang Ditutup";
            }

            if (poDescription) {
                poDescription.innerText =
                    "Pemesanan sedang ditutup. Tunggu PO berikutnya ya!";
            }

            if (poCountdown) {
                poCountdown.style.display = "none";
            }

        }

    } catch (error) {

        console.error("Error loading PO status:", error);

        if (poTitle) {
            poTitle.innerText = "Status PO Tidak Diketahui";
        }

        if (poDescription) {
            poDescription.innerText =
                "Gagal terhubung ke server. Silakan coba lagi.";
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


        /* =========================
           VALIDASI NAMA
           ========================= */

        if (name === "") {

            checkoutNameError.innerText = "Nama wajib diisi.";

            checkoutNameInput.classList.add("invalid");

            hasError = true;

        }


        /* =========================
           VALIDASI WHATSAPP
           ========================= */

        if (wa === "") {

            checkoutWaError.innerText =
                "Nomor WhatsApp wajib diisi.";

            checkoutWaInput.classList.add("invalid");

            hasError = true;

        } else if (!isValidWhatsApp(wa)) {

            checkoutWaError.innerText =
                "Harus diawali 08 dan hanya berisi angka (contoh: 08123456789).";

            checkoutWaInput.classList.add("invalid");

            hasError = true;

        }


        /* =========================
           VALIDASI CART
           ========================= */

        if (cart.length === 0) {
            hasError = true;
        }


        if (hasError) {
            return;
        }


        /* =========================
           CEK STATUS PO
           ========================= */

        const poIsOpen = await checkPOStatus();

        if (!poIsOpen) {

            alert("Maaf, PO sedang ditutup.");

            return;

        }


        /* =========================
           SIAPKAN ORDER
           ========================= */

        const orderItems = cart.map((item) => ({
            ...item
        }));

        const orderTotal = calculateCartTotal(orderItems);


        const orderPayload = {

            customerName: name,

            whatsapp: wa,

            note: note,

            items: orderItems

        };


        /* =========================
           KIRIM KE FLASK
           ========================= */

        try {

            checkoutSubmitBtn.disabled = true;

            checkoutSubmitBtn.innerText = "Mengirim...";


            const response = await fetch(
                "https://velacookies-production.up.railway.app/api/orders",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(orderPayload)
                }
            );


            const result = await response.json();


            /* =========================
               ORDER BERHASIL
               ========================= */

            if (result.success) {

                showConfirmation({

                    orderId: result.orderId,

                    name: name,

                    wa: wa,

                    note: note,

                    items: result.items,

                    total: result.total

                });


                cart = [];

                renderCart();

                updateCartBadge();

                closeCheckoutModal();

            }


            /* =========================
               ORDER GAGAL
               ========================= */

            else {

                alert(
                    result.message ||
                    "Gagal membuat pesanan."
                );

            }


        } catch (error) {

            console.error(
                "Error submitting order:",
                error
            );

            alert(
                "Terjadi kesalahan koneksi ke server."
            );

        } finally {

            checkoutSubmitBtn.disabled = false;

            checkoutSubmitBtn.innerText =
                "Kirim Pesanan";

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

function showConfirmation(order) {
    if (confirmationOrderIdEl) confirmationOrderIdEl.innerText = order.orderId;

    if (confirmationCustomerEl) {
        confirmationCustomerEl.innerText = order.name + " · " + order.wa;
    }

    if (confirmationItemsEl) {
        confirmationItemsEl.innerHTML = buildOrderItemsHTML(order.items);
    }

    if (confirmationTotalEl) {
        confirmationTotalEl.innerText = formatRupiah(order.total);
    }

    if (confirmationModal) confirmationModal.classList.add("active");
}

function closeConfirmationModal() {
    if (confirmationModal) confirmationModal.classList.remove("active");
}

if (confirmationDoneBtn) {
    confirmationDoneBtn.addEventListener("click", closeConfirmationModal);
}


/* Init Floating Cart */
updateFloatingCart();

/* Init PO Status */
updatePOStatusUI();