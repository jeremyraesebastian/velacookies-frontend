/* =========================
   PAYMENT PAGE — VELACOOKIES
   ========================= */

const API_BASE = "https://velacookies-production.up.railway.app";


/* =========================
   DOM REFERENCES
   ========================= */

const loadingEl = document.getElementById("payment-loading");
const errorEl = document.getElementById("payment-error");
const errorTitleEl = document.getElementById("payment-error-title");
const errorMessageEl = document.getElementById("payment-error-message");
const mainEl = document.getElementById("payment-main");

const statusDot = document.getElementById("payment-status-dot");
const statusLabel = document.getElementById("payment-status-label");

const orderIdEl = document.getElementById("payment-order-id");
const customerNameEl = document.getElementById("payment-customer-name");
const locationEl = document.getElementById("payment-location");
const totalEl = document.getElementById("payment-total");

const qrImageEl = document.getElementById("payment-qr-image");
const qrisOwnerEl = document.getElementById("payment-qris-owner");

const itemsEl = document.getElementById("payment-items");
const itemsTotalEl = document.getElementById("payment-items-total");

const expiryInfoEl = document.getElementById("payment-expiry-info");
const expiryCountdownEl = document.getElementById("payment-expiry-countdown");

const confirmBtn = document.getElementById("payment-confirm-btn");
const waBtn = document.getElementById("payment-wa-btn");

const successModal = document.getElementById("payment-success-modal");
const modalWaBtn = document.getElementById("payment-modal-wa");
const modalCloseBtn = document.getElementById("payment-modal-close");


/* =========================
   STATE
   ========================= */

let currentOrder = null;
let paymentSettings = {
    adminWaNumber: "6285117122454",
    qrisImageUrl: "/images/qris.jpeg",
    qrisOwnerName: "Velacookies"
};

let countdownInterval = null;


/* =========================
   HELPERS
   ========================= */

function formatRupiah(number) {
    return "Rp" + Number(number).toLocaleString("id-ID");
}

function getOrderIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("orderId");
}

function getLocationLabel(location) {
    const map = {
        "sman1": "SMAN 1 Karawang",
        "sman5": "SMAN 5 Karawang",
        "others": "Lainnya"
    };
    return map[location] || "Lainnya";
}

function escapeHtml(text) {
    if (text === null || text === undefined) return "";
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function parseISOString(isoString) {
    if (!isoString) return null;
    const hasTz = /[Zz]$/.test(isoString) || /[+-]\d{2}:?\d{2}$/.test(isoString);
    const iso = hasTz ? isoString : isoString + "Z";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return null;
    return d;
}

function formatDateTimeWIB(isoString) {
    const d = parseISOString(isoString);
    if (!d) return "-";
    return d.toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
}

function openWhatsApp(phone, message) {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}


/* =========================
   LOAD FUNCTIONS
   ========================= */

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

async function loadOrder(orderId) {
    const response = await fetch(`${API_BASE}/api/orders/${orderId}/public`);
    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Order tidak ditemukan.");
    }

    return result.order;
}


/* =========================
   RENDER FUNCTIONS
   ========================= */

function renderOrder(order) {
    currentOrder = order;

    /* Status badge */
    const statusMap = {
        "pending": { label: "Menunggu Pembayaran", className: "" },
        "success": { label: "Pembayaran Sukses", className: "success" },
        "expired": { label: "Pesanan Expired", className: "expired" },
        "failed": { label: "Pembayaran Gagal", className: "expired" }
    };

    const statusInfo = statusMap[order.status] || statusMap["pending"];

    if (statusDot) {
        statusDot.className = "payment-status-dot " + statusInfo.className;
    }

    if (statusLabel) {
        statusLabel.className = "payment-status-label " + statusInfo.className;
        statusLabel.innerText = statusInfo.label;
    }

    /* Meta */
    if (orderIdEl) orderIdEl.innerText = order.orderId || "—";
    if (customerNameEl) customerNameEl.innerText = order.customerNameMasked || "—";
    if (locationEl) locationEl.innerText = getLocationLabel(order.location);
    if (totalEl) totalEl.innerText = formatRupiah(order.total || 0);

    /* QR */
    if (qrImageEl) {
        qrImageEl.src = paymentSettings.qrisImageUrl || "/images/qris.png";
    }
    if (qrisOwnerEl) {
        qrisOwnerEl.innerText = paymentSettings.qrisOwnerName || "Velacookies";
    }

    /* Items */
    renderOrderItems(order.items);

    /* Expiry countdown */
    renderExpiry(order);

    /* Sesuaikan tombol dengan status */
    updateActionsForStatus(order);
}

function renderOrderItems(items) {
    if (!itemsEl) return;

    if (!items || items.length === 0) {
        itemsEl.innerHTML = "<p style='color:var(--text-muted);font-size:13px;'>-</p>";
        if (itemsTotalEl) itemsTotalEl.innerText = formatRupiah(0);
        return;
    }

    let html = "";
    let total = 0;

    items.forEach((item) => {
        const lineTotal = item.subtotal || (item.price * item.quantity);
        total += lineTotal;

        html += `
            <div class="payment-item">
                <div class="payment-item-left">
                    <div class="payment-item-name">
                        ${item.quantity}× ${escapeHtml(item.name)}
                    </div>
                    ${item.addonName ? `<div class="payment-item-addon">+ ${escapeHtml(item.addonName)}</div>` : ""}
                </div>
                <div class="payment-item-price">
                    ${formatRupiah(lineTotal)}
                </div>
            </div>
        `;
    });

    itemsEl.innerHTML = html;

    if (itemsTotalEl) {
        itemsTotalEl.innerText = formatRupiah(total);
    }
}

function renderExpiry(order) {
    if (!expiryInfoEl || !expiryCountdownEl) return;

    if (order.status !== "pending") {
        expiryInfoEl.classList.add("expired");
        expiryCountdownEl.innerText =
            order.status === "success" ? "Pembayaran Sukses" :
            order.status === "expired" ? "Pesanan Expired" :
            "Pesanan Tidak Aktif";
        return;
    }

    if (!order.expiredAt) {
        expiryCountdownEl.innerText = "—";
        return;
    }

    clearInterval(countdownInterval);

    const update = () => {
        const expiredDate = parseISOString(order.expiredAt);
        if (!expiredDate) {
            expiryCountdownEl.innerText = "—";
            return;
        }

        const now = new Date();
        const distance = expiredDate.getTime() - now.getTime();

        if (distance <= 0) {
            expiryInfoEl.classList.add("expired");
            expiryCountdownEl.innerText = "Sudah Expired";
            clearInterval(countdownInterval);

            if (confirmBtn) {
                confirmBtn.disabled = true;
                confirmBtn.innerText = "Pesanan Sudah Expired";
            }
            return;
        }

        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        expiryCountdownEl.innerText =
            `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;
    };

    update();
    countdownInterval = setInterval(update, 1000);
}

function updateActionsForStatus(order) {
    if (!confirmBtn) return;

    if (order.status === "pending") {
        confirmBtn.disabled = order.customerConfirmed === true;
        if (order.customerConfirmed) {
            confirmBtn.innerText = "✓ Konfirmasi Sudah Terkirim";
        } else {
            confirmBtn.innerText = "✓ Saya Sudah Bayar";
        }
    } else if (order.status === "success") {
        confirmBtn.disabled = true;
        confirmBtn.innerText = "✓ Pembayaran Berhasil";
    } else if (order.status === "expired") {
        confirmBtn.disabled = true;
        confirmBtn.innerText = "× Pesanan Expired";
    } else {
        confirmBtn.disabled = true;
        confirmBtn.innerText = "× Pesanan Tidak Aktif";
    }
}


/* =========================
   STATE SWITCHER
   ========================= */

function showLoading() {
    if (loadingEl) loadingEl.hidden = false;
    if (errorEl) errorEl.hidden = true;
    if (mainEl) mainEl.hidden = true;
}

function showError(title, message) {
    if (loadingEl) loadingEl.hidden = true;
    if (mainEl) mainEl.hidden = true;
    if (errorEl) errorEl.hidden = false;

    if (errorTitleEl) errorTitleEl.innerText = title;
    if (errorMessageEl) errorMessageEl.innerText = message;
}

function showMain() {
    if (loadingEl) loadingEl.hidden = true;
    if (errorEl) errorEl.hidden = true;
    if (mainEl) mainEl.hidden = false;
}


/* =========================
   WHATSAPP MESSAGES
   ========================= */

function buildConfirmWaMessage(order) {
    const lines = [];

    lines.push("Halo Velacookies! \uD83C\uDF6A");
    lines.push("");
    lines.push("Saya sudah transfer via QRIS:");
    lines.push("");
    lines.push(`Order ID: ${order.orderId}`);
    lines.push(`Nama: ${order.customerNameMasked}`);
    lines.push(`Total: ${formatRupiah(order.total)}`);
    lines.push(`Lokasi: ${getLocationLabel(order.location)}`);
    lines.push("");
    lines.push("Mohon dicek ya, terima kasih!");

    return lines.join("\n");
}

function buildGeneralWaMessage(order) {
    const lines = [];

    lines.push("Halo Velacookies! \uD83C\uDF6A");
    lines.push("");
    lines.push(`Saya mau tanya soal pesanan saya:`);
    lines.push("");
    lines.push(`Order ID: ${order ? order.orderId : "-"}`);
    if (order) {
        lines.push(`Nama: ${order.customerNameMasked}`);
        lines.push(`Total: ${formatRupiah(order.total)}`);
    }

    return lines.join("\n");
}


/* =========================
   CONFIRM PAYMENT
   ========================= */

async function handleConfirmPayment() {
    if (!currentOrder) return;

    if (currentOrder.status !== "pending") {
        alert("Pesanan tidak dalam status yang bisa dikonfirmasi.");
        return;
    }

    const originalText = confirmBtn.innerText;
    confirmBtn.disabled = true;
    confirmBtn.innerText = "Mengirim konfirmasi...";

    try {
        const response = await fetch(
            `${API_BASE}/api/orders/${currentOrder.orderId}/confirm-payment`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            alert(result.message || "Gagal konfirmasi pembayaran.");
            confirmBtn.disabled = false;
            confirmBtn.innerText = originalText;
            return;
        }

        currentOrder.customerConfirmed = true;
        currentOrder.customerConfirmedAt = result.confirmedAt;

        confirmBtn.innerText = "✓ Konfirmasi Sudah Terkirim";

        openSuccessModal();

    } catch (error) {
        console.error("Confirm payment error:", error);
        alert("Gagal terhubung ke server. Coba lagi ya.");
        confirmBtn.disabled = false;
        confirmBtn.innerText = originalText;
    }
}


/* =========================
   SUCCESS MODAL
   ========================= */

function openSuccessModal() {
    if (successModal) successModal.classList.add("active");
}

function closeSuccessModal() {
    if (successModal) successModal.classList.remove("active");
}


/* =========================
   INIT
   ========================= */

async function init() {
    showLoading();

    const orderId = getOrderIdFromURL();

    if (!orderId) {
        showError("Order ID Tidak Ditemukan", "Pastikan kamu membuka halaman ini dari link yang benar.");
        return;
    }

    /* Load payment settings + order secara paralel */
    await Promise.all([
        loadPaymentSettings(),
        (async () => {
            try {
                const order = await loadOrder(orderId);

                renderOrder(order);
                showMain();

            } catch (error) {
                console.error("Load order error:", error);
                showError(
                    "Pesanan Tidak Ditemukan",
                    error.message || "Order ID salah atau pesanan sudah dihapus."
                );
            }
        })()
    ]);
}


/* =========================
   EVENT LISTENERS
   ========================= */

if (confirmBtn) {
    confirmBtn.addEventListener("click", handleConfirmPayment);
}

if (waBtn) {
    waBtn.addEventListener("click", () => {
        const message = currentOrder
            ? buildConfirmWaMessage(currentOrder)
            : buildGeneralWaMessage(null);

        openWhatsApp(paymentSettings.adminWaNumber, message);
    });
}

if (modalWaBtn) {
    modalWaBtn.addEventListener("click", () => {
        if (!currentOrder) return;
        const message = buildConfirmWaMessage(currentOrder);
        openWhatsApp(paymentSettings.adminWaNumber, message);
    });
}

if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeSuccessModal);
}

if (successModal) {
    successModal.addEventListener("click", (e) => {
        if (e.target === successModal) closeSuccessModal();
    });
}

/* Cleanup interval kalau tab di-close */
window.addEventListener("beforeunload", () => {
    clearInterval(countdownInterval);
});


/* =========================
   RUN
   ========================= */

init();