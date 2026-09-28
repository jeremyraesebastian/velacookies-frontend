/* =========================
   ADMIN PANEL — VELACOOKIES
   ========================= */

const API_BASE = "https://velacookies-production.up.railway.app";
const TOKEN_KEY = "velacookies_admin_token";

/* DOM */
const loginView = document.getElementById("login-view");
const dashboardView = document.getElementById("dashboard-view");
const loginForm = document.getElementById("login-form");
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const loginError = document.getElementById("login-error");
const loginSubmit = document.getElementById("login-submit");
const logoutBtn = document.getElementById("logout-btn");
const refreshBtn = document.getElementById("refresh-btn");
const searchInput = document.getElementById("search-input");
const ordersTbody = document.getElementById("orders-tbody");
const tableEmpty = document.getElementById("table-empty");
const tableLoading = document.getElementById("table-loading");
const summaryTotalOrders = document.getElementById("summary-total-orders");
const summaryTotalRevenue = document.getElementById("summary-total-revenue");
const summaryTodayOrders = document.getElementById("summary-today-orders");
const orderModal = document.getElementById("order-modal");
const orderModalBody = document.getElementById("order-modal-body");
const orderModalClose = document.getElementById("order-modal-close");

/* STATE */
let allOrders = [];

/* HELPERS */
function formatRupiah(number) {
    return "Rp" + Number(number).toLocaleString("id-ID");
}

function formatDate(isoString) {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function getToken() { return localStorage.getItem(TOKEN_KEY); }
function setToken(token) { localStorage.setItem(TOKEN_KEY, token); }
function clearToken() { localStorage.removeItem(TOKEN_KEY); }

/* VIEW SWITCH */
function showLoginView() {
    loginView.hidden = false;
    dashboardView.hidden = true;
    loginUsername.value = "";
    loginPassword.value = "";
    loginError.innerText = "";
}

function showDashboardView() {
    loginView.hidden = true;
    dashboardView.hidden = false;
}

/* LOGIN */
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        loginError.innerText = "";
        loginSubmit.disabled = true;
        loginSubmit.innerText = "Memproses...";

        const username = loginUsername.value.trim();
        const password = loginPassword.value;

        try {
            const response = await fetch(`${API_BASE}/api/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                loginError.innerText = result.message || "Login gagal.";
                return;
            }

            setToken(result.token);
            showDashboardView();
            loadOrders();

        } catch (error) {
            console.error("Login error:", error);
            loginError.innerText = "Gagal terhubung ke server.";
        } finally {
            loginSubmit.disabled = false;
            loginSubmit.innerText = "Masuk";
        }
    });
}

/* LOGOUT */
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        clearToken();
        allOrders = [];
        showLoginView();
    });
}

/* FETCH ORDERS */
async function loadOrders() {
    tableLoading.hidden = false;
    tableEmpty.hidden = true;
    ordersTbody.innerHTML = "";

    try {
        const response = await fetch(`${API_BASE}/api/orders`, {
            headers: { "Authorization": `Bearer ${getToken()}` }
        });

        if (response.status === 401) {
            clearToken();
            showLoginView();
            return;
        }

        const result = await response.json();

        if (!response.ok || !result.success) {
            tableLoading.hidden = true;
            tableEmpty.hidden = false;
            tableEmpty.innerText = result.message || "Gagal memuat pesanan.";
            return;
        }

        allOrders = result.orders || [];
        renderSummary();
        renderOrders(allOrders);

    } catch (error) {
        console.error("Load orders error:", error);
        tableLoading.hidden = true;
        tableEmpty.hidden = false;
        tableEmpty.innerText = "Gagal terhubung ke server.";
    }
}

/* SUMMARY */
function renderSummary() {
    const totalOrders = allOrders.length;
    const totalRevenue = allOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const today = new Date().toDateString();
    const todayOrders = allOrders.filter((o) => {
        if (!o.createdAt) return false;
        return new Date(o.createdAt).toDateString() === today;
    }).length;

    summaryTotalOrders.innerText = totalOrders;
    summaryTotalRevenue.innerText = formatRupiah(totalRevenue);
    summaryTodayOrders.innerText = todayOrders;
}

/* RENDER TABLE */
function renderOrders(orders) {
    tableLoading.hidden = true;

    if (!orders || orders.length === 0) {
        ordersTbody.innerHTML = "";
        tableEmpty.hidden = false;
        tableEmpty.innerText = "Belum ada pesanan.";
        return;
    }

    tableEmpty.hidden = true;
    let html = "";

    orders.forEach((order, index) => {
        const waLink = `https://wa.me/${normalizeWA(order.whatsapp)}`;

        html += `
            <tr>
                <td class="cell-order-id">${order.orderId || "-"}</td>
                <td>${formatDate(order.createdAt)}</td>
                <td>${escapeHtml(order.customerName || "-")}</td>
                <td class="cell-wa">
                    <a href="${waLink}" target="_blank" rel="noopener">
                        ${escapeHtml(order.whatsapp || "-")}
                    </a>
                </td>
                <td class="cell-total">${formatRupiah(order.total || 0)}</td>
                <td>
                    <button class="btn-detail" data-index="${index}">Detail</button>
                </td>
            </tr>
        `;
    });

    ordersTbody.innerHTML = html;

    ordersTbody.querySelectorAll(".btn-detail").forEach((btn) => {
        btn.addEventListener("click", () => {
            const idx = Number(btn.dataset.index);
            openOrderModal(orders[idx]);
        });
    });
}

/* SEARCH */
if (searchInput) {
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();

        if (!query) {
            renderOrders(allOrders);
            return;
        }

        const filtered = allOrders.filter((order) => {
            const name = (order.customerName || "").toLowerCase();
            const wa = (order.whatsapp || "").toLowerCase();
            const orderId = (order.orderId || "").toLowerCase();
            return name.includes(query) || wa.includes(query) || orderId.includes(query);
        });

        renderOrders(filtered);
    });
}

/* REFRESH */
if (refreshBtn) {
    refreshBtn.addEventListener("click", () => loadOrders());
}

/* MODAL */
function openOrderModal(order) {
    if (!order) return;

    let itemsHtml = "";

    (order.items || []).forEach((item) => {
        itemsHtml += `
            <div class="detail-item">
                <span class="item-name">
                    ${item.quantity}x ${escapeHtml(item.name)}
                    ${item.addonName ? `<span class="item-addon">+ ${escapeHtml(item.addonName)}</span>` : ""}
                </span>
                <span class="item-price">
                    ${formatRupiah(item.subtotal || (item.price * item.quantity))}
                </span>
            </div>
        `;
    });

    orderModalBody.innerHTML = `
        <div class="detail-header">
            <div class="detail-order-id">${order.orderId || "-"}</div>
            <div class="detail-date">${formatDate(order.createdAt)}</div>
        </div>

        <div class="detail-row">
            <span class="label">Nama</span>
            <span class="value">${escapeHtml(order.customerName || "-")}</span>
        </div>

        <div class="detail-row">
            <span class="label">WhatsApp</span>
            <span class="value">
                <a href="https://wa.me/${normalizeWA(order.whatsapp)}" target="_blank" rel="noopener">
                    ${escapeHtml(order.whatsapp || "-")}
                </a>
            </span>
        </div>

        <div class="detail-row">
            <span class="label">Catatan</span>
            <span class="value">${escapeHtml(order.note || "-")}</span>
        </div>

        <div class="detail-items">
            <h4>Produk</h4>
            ${itemsHtml || "<p style='color:var(--cream-soft);font-size:13px;'>-</p>"}
        </div>

        <div class="detail-total">
            <span>Total</span>
            <strong>${formatRupiah(order.total || 0)}</strong>
        </div>
    `;

    orderModal.classList.add("active");
}

function closeOrderModal() {
    orderModal.classList.remove("active");
}

if (orderModalClose) {
    orderModalClose.addEventListener("click", closeOrderModal);
}

if (orderModal) {
    orderModal.addEventListener("click", (e) => {
        if (e.target === orderModal) closeOrderModal();
    });
}

/* UTILITIES */
function normalizeWA(wa) {
    if (!wa) return "";
    let cleaned = String(wa).replace(/\D/g, "");
    if (cleaned.startsWith("0")) {
        cleaned = "62" + cleaned.slice(1);
    }
    return cleaned;
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

/* INIT */
(async function init() {
    const token = getToken();

    if (!token) {
        showLoginView();
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/api/admin/me`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) {
            clearToken();
            showLoginView();
            return;
        }

        showDashboardView();
        loadOrders();

    } catch (error) {
        console.error("Init error:", error);
        clearToken();
        showLoginView();
    }
})();