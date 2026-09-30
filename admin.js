/* =========================
   ADMIN PANEL — VELACOOKIES
   ========================= */

const API_BASE = "https://velacookies-production.up.railway.app";
const TOKEN_KEY = "velacookies_admin_token";

/* =========================
   DOM REFERENCES
   ========================= */

const loginView = document.getElementById("login-view");
const dashboardView = document.getElementById("dashboard-view");
const loginForm = document.getElementById("login-form");
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const loginError = document.getElementById("login-error");
const loginSubmit = document.getElementById("login-submit");
const logoutBtn = document.getElementById("logout-btn");

/* Tab navigation */
const adminTabs = document.querySelectorAll(".admin-tab");
const tabContents = document.querySelectorAll(".tab-content");

/* Orders tab DOM */
const refreshBtn = document.getElementById("refresh-btn");
const searchInput = document.getElementById("search-input");
const locationFilter = document.getElementById("location-filter");
const statusFilter = document.getElementById("status-filter");
const ordersTbody = document.getElementById("orders-tbody");
const tableEmpty = document.getElementById("table-empty");
const tableLoading = document.getElementById("table-loading");
const summaryTotalOrders = document.getElementById("summary-total-orders");
const summaryTotalRevenue = document.getElementById("summary-total-revenue");
const summaryTodayOrders = document.getElementById("summary-today-orders");
const reportDateInput = document.getElementById("report-date");
const reportTodayBtn = document.getElementById("report-today");
const reportTotalOrders = document.getElementById("report-total-orders");
const reportTotalItems = document.getElementById("report-total-items");
const reportTotalRevenue = document.getElementById("report-total-revenue");
const reportTbody = document.getElementById("report-tbody");
const reportEmpty = document.getElementById("report-empty");
const reportLocationTbody = document.getElementById("report-location-tbody");
const reportLocationEmpty = document.getElementById("report-location-empty");
const reportExportBtn = document.getElementById("report-export");
const reportDeltaOrders = document.getElementById("report-delta-orders");
const reportDeltaItems = document.getElementById("report-delta-items");
const reportDeltaRevenue = document.getElementById("report-delta-revenue");
const chart7Day = document.getElementById("chart-7day");
const insightTotalCustomers = document.getElementById("insight-total-customers");
const insightRepeatRate = document.getElementById("insight-repeat-rate");
const insightRepeatDetail = document.getElementById("insight-repeat-detail");
const insightNewOldRatio = document.getElementById("insight-new-old-ratio");
const insightNewOldDetail = document.getElementById("insight-new-old-detail");
const orderModal = document.getElementById("order-modal");
const orderModalBody = document.getElementById("order-modal-body");
const orderModalClose = document.getElementById("order-modal-close");

/* Finance tab DOM */
const financeMonthInput = document.getElementById("finance-month");
const financeRefreshBtn = document.getElementById("finance-refresh");

const finRevenue = document.getElementById("fin-revenue");
const finPeriodStatus = document.getElementById("fin-period-status");

const finHppPct = document.getElementById("fin-hpp-pct");
const finHppAllocated = document.getElementById("fin-hpp-allocated");
const finHppSpent = document.getElementById("fin-hpp-spent");
const finHppRemaining = document.getElementById("fin-hpp-remaining");
const finHppBar = document.getElementById("fin-hpp-bar");

const finCashflowPct = document.getElementById("fin-cashflow-pct");
const finCashflowAllocated = document.getElementById("fin-cashflow-allocated");
const finCashflowSpent = document.getElementById("fin-cashflow-spent");
const finCashflowRemaining = document.getElementById("fin-cashflow-remaining");
const finCashflowBar = document.getElementById("fin-cashflow-bar");

const finProfitPct = document.getElementById("fin-profit-pct");
const finProfitAllocated = document.getElementById("fin-profit-allocated");
const finProfitDetail = document.getElementById("fin-profit-detail");
const finProfitFinal = document.getElementById("fin-profit-final");

/* Finance input tabs */
const financeTabs = document.querySelectorAll(".finance-tab");
const financeFormPanels = document.querySelectorAll(".finance-form-panel");

/* HPP form */
const hppForm = document.getElementById("hpp-form");
const hppDate = document.getElementById("hpp-date");
const hppItem = document.getElementById("hpp-item");
const hppQty = document.getElementById("hpp-qty");
const hppUnit = document.getElementById("hpp-unit");
const hppAmount = document.getElementById("hpp-amount");
const hppNote = document.getElementById("hpp-note");
const hppSubmit = document.getElementById("hpp-submit");

/* Cashflow form */
const cashflowForm = document.getElementById("cashflow-form");
const cfDate = document.getElementById("cf-date");
const cfCategory = document.getElementById("cf-category");
const cfDesc = document.getElementById("cf-desc");
const cfAmount = document.getElementById("cf-amount");
const cfNote = document.getElementById("cf-note");
const cfSubmit = document.getElementById("cf-submit");

/* History */
const hppHistoryTbody = document.getElementById("hpp-history-tbody");
const hppHistoryEmpty = document.getElementById("hpp-history-empty");
const hppHistoryMonth = document.getElementById("hpp-history-month");
const cfHistoryTbody = document.getElementById("cf-history-tbody");
const cfHistoryEmpty = document.getElementById("cf-history-empty");
const cfHistoryMonth = document.getElementById("cf-history-month");


/* =========================
   STATE
   ========================= */

let allOrders = [];
let currentFinanceMonth = "";
let currentFinanceSummary = null;
let cashflowCategories = [];

/* =========================
   HELPERS
   ========================= */

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

function formatDateShort(isoDate) {
    if (!isoDate) return "-";
    const date = new Date(isoDate + "T00:00:00");
    return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function getToken() { return localStorage.getItem(TOKEN_KEY); }
function setToken(token) { localStorage.setItem(TOKEN_KEY, token); }
function clearToken() { localStorage.removeItem(TOKEN_KEY); }

function getLocationLabel(location) {
    const map = {
        "sman1": "SMAN 1 Karawang",
        "sman5": "SMAN 5 Karawang",
        "others": "Lainnya"
    };
    return map[location] || "-";
}

function getLocationClass(location) {
    const map = {
        "sman1": "loc-sman1",
        "sman5": "loc-sman5",
        "others": "loc-others"
    };
    return map[location] || "";
}

function getStatusLabel(status) {
    const map = {
        "pending": "Pending",
        "success": "Success",
        "expired": "Expired",
        "failed": "Failed"
    };
    return map[status] || "Pending";
}

function getStatusClass(status) {
    const map = {
        "pending": "status-pending",
        "success": "status-success",
        "expired": "status-expired",
        "failed": "status-failed"
    };
    return map[status] || "status-pending";
}

function getLocalDateString(isoString) {
    if (!isoString) return "";
    const d = new Date(isoString);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getDateStringOffset(dateString, dayOffset) {
    const d = new Date(dateString + "T00:00:00");
    d.setDate(d.getDate() + dayOffset);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getMetrics(orders) {
    let totalItems = 0;
    let totalRevenue = 0;
    orders.forEach((order) => {
        totalRevenue += order.total || 0;
        (order.items || []).forEach((item) => {
            totalItems += item.quantity;
        });
    });
    return { orders: orders.length, items: totalItems, revenue: totalRevenue };
}

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

function getCustomerType(order) {
    const wa = normalizeWA(order.whatsapp);
    if (!wa) return "baru";
    const orderDate = new Date(order.createdAt).getTime();
    const previousOrders = allOrders.filter((o) => {
        if (normalizeWA(o.whatsapp) !== wa) return false;
        const otherDate = new Date(o.createdAt).getTime();
        return otherDate < orderDate;
    });
    return previousOrders.length > 0 ? "lama" : "baru";
}

function getCurrentMonthString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
}

function getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}


/* =========================
   VIEW SWITCH
   ========================= */

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


/* =========================
   TAB NAVIGATION (ORDERS / FINANCE)
   ========================= */

adminTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const targetTab = tab.dataset.tab;

        adminTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        tabContents.forEach((content) => {
            const isActive = content.dataset.tabContent === targetTab;
            content.classList.toggle("active", isActive);
            content.hidden = !isActive;
        });

        if (targetTab === "finance") {
            loadFinance();
        }
    });
});


/* =========================
   LOGIN
   ========================= */

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


/* =========================
   LOGOUT
   ========================= */

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        clearToken();
        allOrders = [];
        currentFinanceSummary = null;
        showLoginView();
    });
}


/* =========================
   FETCH ORDERS
   ========================= */

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
        renderCustomerInsights();
        applyFilters();
        renderDailyReport();

    } catch (error) {
        console.error("Load orders error:", error);
        tableLoading.hidden = true;
        tableEmpty.hidden = false;
        tableEmpty.innerText = "Gagal terhubung ke server.";
    }
}


/* =========================
   SUMMARY (ORDERS)
   ========================= */

function renderSummary() {
    // Cuma hitung order status "success"
    const successOrders = allOrders.filter(
        (o) => (o.status || "pending") === "success"
    );

    const totalOrders = successOrders.length;

    const totalRevenue = successOrders.reduce(
        (sum, o) => sum + (o.total || 0), 0
    );

    const today = new Date().toDateString();
    const todayOrders = successOrders.filter((o) => {
        if (!o.createdAt) return false;
        return new Date(o.createdAt).toDateString() === today;
    }).length;

    summaryTotalOrders.innerText = totalOrders;
    summaryTotalRevenue.innerText = formatRupiah(totalRevenue);
    summaryTodayOrders.innerText = todayOrders;
}

/* =========================
   CUSTOMER INSIGHTS
   ========================= */

function renderCustomerInsights() {
    if (!insightTotalCustomers) return;

        const successOrders = allOrders.filter(
        (o) => (o.status || "pending") === "success"
    );

    const customerMap = {};
    successOrders.forEach((order) => {
        const wa = normalizeWA(order.whatsapp);
        if (!wa) return;
        if (!customerMap[wa]) {
            customerMap[wa] = { orderCount: 0, totalSpent: 0 };
        }
        customerMap[wa].orderCount += 1;
        customerMap[wa].totalSpent += order.total || 0;
    });

    const customers = Object.values(customerMap);
    const totalCustomers = customers.length;
    const repeatCustomers = customers.filter((c) => c.orderCount > 1).length;
    const repeatRate = totalCustomers > 0
        ? Math.round((repeatCustomers / totalCustomers) * 100)
        : 0;

        let newOrdersCount = 0;
    let oldOrdersCount = 0;
    successOrders.forEach((order) => {
        const type = getCustomerType(order);
        if (type === "baru") newOrdersCount += 1;
        else oldOrdersCount += 1;
    });

    const totalOrdersCount = newOrdersCount + oldOrdersCount;
    const newPercent = totalOrdersCount > 0
        ? Math.round((newOrdersCount / totalOrdersCount) * 100)
        : 0;
    const oldPercent = totalOrdersCount > 0 ? 100 - newPercent : 0;

    insightTotalCustomers.innerText = totalCustomers;
    insightRepeatRate.innerText = repeatRate + "%";

    if (totalCustomers === 0) {
        insightRepeatDetail.innerText = "Belum ada data";
    } else {
        insightRepeatDetail.innerHTML =
            `<strong>${repeatCustomers}</strong> dari ${totalCustomers} customer order >1x`;
    }

    insightNewOldRatio.innerText = `${newPercent}% / ${oldPercent}%`;

    if (totalOrdersCount === 0) {
        insightNewOldDetail.innerText = "Belum ada data";
    } else {
        insightNewOldDetail.innerHTML =
            `<strong>${newOrdersCount}</strong> baru · <strong>${oldOrdersCount}</strong> lama`;
    }
}


/* =========================
   FILTERS
   ========================= */

function applyFilters() {
    const query = (searchInput?.value || "").trim().toLowerCase();
    const locFilter = locationFilter?.value || "all";
    const statFilter = statusFilter?.value || "all";

    let filtered = allOrders;

    if (locFilter !== "all") {
        filtered = filtered.filter((o) => o.location === locFilter);
    }

    if (statFilter !== "all") {
        filtered = filtered.filter((o) => {
            const s = o.status || "pending";
            return s === statFilter;
        });
    }

    if (query) {
        filtered = filtered.filter((order) => {
            const name = (order.customerName || "").toLowerCase();
            const wa = (order.whatsapp || "").toLowerCase();
            const orderId = (order.orderId || "").toLowerCase();
            return name.includes(query) || wa.includes(query) || orderId.includes(query);
        });
    }

    renderOrders(filtered);
}

if (searchInput) searchInput.addEventListener("input", applyFilters);
if (locationFilter) locationFilter.addEventListener("change", applyFilters);
if (statusFilter) statusFilter.addEventListener("change", applyFilters);
if (refreshBtn) refreshBtn.addEventListener("click", () => loadOrders());


/* =========================
   RENDER ORDERS TABLE
   ========================= */

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
        const locLabel = getLocationLabel(order.location);
        const locClass = getLocationClass(order.location);
        const custType = getCustomerType(order);
        const statusVal = order.status || "pending";
        const statusClass = getStatusClass(statusVal);
        const statusLabel = getStatusLabel(statusVal);

        html += `
            <tr>
                <td class="cell-order-id">${order.orderId || "-"}</td>
                <td>${formatDate(order.createdAt)}</td>
                <td>
                    <div class="cell-customer">
                        <span class="customer-name">${escapeHtml(order.customerName || "-")}</span>
                        <span class="customer-badge ${custType}">
                            ${custType === "baru" ? "Baru" : "Lama"}
                        </span>
                    </div>
                </td>
                <td>
                    <span class="location-badge ${locClass}">
                        ${escapeHtml(locLabel)}
                    </span>
                </td>
                <td>
                    <span class="status-badge ${statusClass}">
                        ${statusLabel}
                    </span>
                </td>
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


/* =========================
   ORDER DETAIL MODAL
   ========================= */

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

    const locLabel = getLocationLabel(order.location);
    const locClass = getLocationClass(order.location);
    const custType = getCustomerType(order);
    const custLabel = custType === "baru" ? "Customer Baru" : "Customer Lama";
    const statusVal = order.status || "pending";
    const statusClass = getStatusClass(statusVal);
    const statusLabel = getStatusLabel(statusVal);

    const locDetail = order.locationDetail
        ? `<div class="detail-row">
               <span class="label">Alamat</span>
               <span class="value">${escapeHtml(order.locationDetail)}</span>
           </div>`
        : "";

    orderModalBody.innerHTML = `
        <div class="detail-header">
            <div class="detail-order-id">${order.orderId || "-"}</div>
            <div class="detail-date">${formatDate(order.createdAt)}</div>
        </div>

        <div class="detail-row">
            <span class="label">Status</span>
            <span class="value">
                <span class="status-badge ${statusClass}">${statusLabel}</span>
            </span>
        </div>

        <div class="detail-row">
            <span class="label">Nama</span>
            <span class="value">
                <div class="cell-customer">
                    <span class="customer-name">${escapeHtml(order.customerName || "-")}</span>
                    <span class="customer-badge ${custType}">${custLabel}</span>
                </div>
            </span>
        </div>

        <div class="detail-row">
            <span class="label">Lokasi</span>
            <span class="value">
                <span class="location-badge ${locClass}">${escapeHtml(locLabel)}</span>
            </span>
        </div>

        ${locDetail}

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

        <div class="modal-actions">
            <p class="modal-actions-label">Ubah Status</p>

            ${statusVal !== "success"
                ? `<button class="action-btn success" data-action="success" data-order-id="${order.orderId}">✓ Tandai Sukses</button>`
                : ""}

            ${statusVal !== "pending"
                ? `<button class="action-btn pending" data-action="pending" data-order-id="${order.orderId}">⏳ Tandai Pending</button>`
                : ""}

            ${statusVal !== "expired"
                ? `<button class="action-btn expired" data-action="expired" data-order-id="${order.orderId}">× Tandai Expired</button>`
                : ""}
        </div>
    `;

    orderModal.classList.add("active");

    orderModalBody.querySelectorAll(".action-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const action = btn.dataset.action;
            const orderId = btn.dataset.orderId;
            if (action && orderId) {
                updateOrderStatus(orderId, action, btn);
            }
        });
    });
}

function closeOrderModal() {
    orderModal.classList.remove("active");
}

if (orderModalClose) orderModalClose.addEventListener("click", closeOrderModal);
if (orderModal) {
    orderModal.addEventListener("click", (e) => {
        if (e.target === orderModal) closeOrderModal();
    });
}


/* =========================
   UPDATE ORDER STATUS
   ========================= */

async function updateOrderStatus(orderId, newStatus, btnEl) {
    if (!orderId || !newStatus) return;

    const originalText = btnEl.innerText;
    btnEl.disabled = true;
    btnEl.innerText = "Mengubah...";

    try {
        const response = await fetch(
            `${API_BASE}/api/admin/orders/${orderId}/status`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify({ status: newStatus })
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            alert(result.message || "Gagal mengubah status.");
            btnEl.disabled = false;
            btnEl.innerText = originalText;
            return;
        }

        const order = allOrders.find((o) => o.orderId === orderId);
        if (order) {
            order.status = newStatus;
            if (newStatus === "success" && !order.paidAt) {
                order.paidAt = new Date().toISOString();
            }
            if (newStatus === "expired" && !order.expiredAt) {
                order.expiredAt = new Date().toISOString();
            }
        }

        applyFilters();
        renderSummary();
        renderCustomerInsights();

        btnEl.innerText = "✓ Berhasil";
        setTimeout(() => {
            closeOrderModal();
        }, 600);

    } catch (error) {
        console.error("Update status error:", error);
        alert("Gagal terhubung ke server.");
        btnEl.disabled = false;
        btnEl.innerText = originalText;
    }
}


/* =========================
   DAILY REPORT
   ========================= */

function setReportDateToToday() {
    if (!reportDateInput) return;
    reportDateInput.value = getTodayDateString();
}

function renderDelta(element, current, previous) {
    if (!element) return;
    element.classList.remove("up", "down", "neutral");

    if (previous === 0 && current === 0) {
        element.innerText = "";
        return;
    }
    if (previous === 0) {
        element.innerText = "Baru hari ini";
        element.classList.add("up");
        return;
    }

    const diff = current - previous;
    const percent = Math.round((diff / previous) * 100);

    if (diff === 0) {
        element.innerText = "Sama dengan kemarin";
        element.classList.add("neutral");
    } else if (diff > 0) {
        element.innerText = `↑ ${percent}% dari kemarin`;
        element.classList.add("up");
    } else {
        element.innerText = `↓ ${Math.abs(percent)}% dari kemarin`;
        element.classList.add("down");
    }
}

function renderDailyReport() {
    if (!reportDateInput) return;

    const selectedDate = reportDateInput.value;

    if (!selectedDate) {
        reportTotalOrders.innerText = "—";
        reportTotalItems.innerText = "—";
        reportTotalRevenue.innerText = "—";
        reportDeltaOrders.innerText = "";
        reportDeltaItems.innerText = "";
        reportDeltaRevenue.innerText = "";
        reportTbody.innerHTML = "";
        reportLocationTbody.innerHTML = "";
        reportEmpty.hidden = false;
        reportLocationEmpty.hidden = false;
        reportEmpty.innerText = "Pilih tanggal untuk melihat laporan.";
        reportLocationEmpty.innerText = "Pilih tanggal untuk melihat laporan.";
        render7DayChart();
        return;
    }

        const dayOrders = allOrders.filter(
        (order) =>
            getLocalDateString(order.createdAt) === selectedDate &&
            (order.status || "pending") === "success"
    );

    const previousDate = getDateStringOffset(selectedDate, -1);
    const previousOrders = allOrders.filter(
        (order) =>
            getLocalDateString(order.createdAt) === previousDate &&
            (order.status || "pending") === "success"
    );
    const currentMetrics = getMetrics(dayOrders);
    const previousMetrics = getMetrics(previousOrders);

    renderDelta(reportDeltaOrders, currentMetrics.orders, previousMetrics.orders);
    renderDelta(reportDeltaItems, currentMetrics.items, previousMetrics.items);
    renderDelta(reportDeltaRevenue, currentMetrics.revenue, previousMetrics.revenue);

    if (dayOrders.length === 0) {
        reportTotalOrders.innerText = "0";
        reportTotalItems.innerText = "0";
        reportTotalRevenue.innerText = formatRupiah(0);
        reportTbody.innerHTML = "";
        reportLocationTbody.innerHTML = "";
        reportEmpty.hidden = false;
        reportLocationEmpty.hidden = false;
        reportEmpty.innerText = "Belum ada order di tanggal ini.";
        reportLocationEmpty.innerText = "Belum ada order di tanggal ini.";
        render7DayChart();
        return;
    }

    reportEmpty.hidden = true;
    reportLocationEmpty.hidden = true;

        const variantMap = {};
    const locationMap = {};

    dayOrders.forEach((order) => {
        const locKey = order.location || "unknown";

        if (!locationMap[locKey]) {
            locationMap[locKey] = {
                count: 0,
                subtotal: 0,
                variants: {}
            };
        }
        locationMap[locKey].count += 1;
        locationMap[locKey].subtotal += order.total || 0;

        (order.items || []).forEach((item) => {
            // Key include addon
            const key = (item.productId || item.name) +
                        (item.addonName ? "||" + item.addonName : "");

            const displayName = item.addonName
                ? `${item.name} (+ ${item.addonName})`
                : item.name;

            const lineQty = item.quantity;
            const lineSubtotal = item.subtotal || (item.price * item.quantity);

            // Untuk global variant breakdown
            if (!variantMap[key]) {
                variantMap[key] = {
                    name: displayName,
                    qty: 0,
                    subtotal: 0
                };
            }
            variantMap[key].qty += lineQty;
            variantMap[key].subtotal += lineSubtotal;

            // Untuk per-location variant breakdown (NEW)
            if (!locationMap[locKey].variants[key]) {
                locationMap[locKey].variants[key] = {
                    name: displayName,
                    qty: 0,
                    subtotal: 0
                };
            }
            locationMap[locKey].variants[key].qty += lineQty;
            locationMap[locKey].variants[key].subtotal += lineSubtotal;
        });
    });

    reportTotalOrders.innerText = currentMetrics.orders;
    reportTotalItems.innerText = currentMetrics.items;
    reportTotalRevenue.innerText = formatRupiah(currentMetrics.revenue);

    // Sort: qty terbanyak dulu, kalau sama sort by nama
    const variants = Object.values(variantMap).sort((a, b) => {
        if (b.qty !== a.qty) return b.qty - a.qty;
        return a.name.localeCompare(b.name);
    });

    let html = "";
    variants.forEach((v) => {
        html += `
            <tr>
                <td>${escapeHtml(v.name)}</td>
                <td class="align-right">${v.qty}</td>
                <td class="align-right">${formatRupiah(v.subtotal)}</td>
            </tr>
        `;
    });
    reportTbody.innerHTML = html;

    const locOrder = { "sman1": 1, "sman5": 2, "others": 3, "unknown": 99 };
    const locations = Object.entries(locationMap)
        .map(([key, val]) => ({
            key,
            label: getLocationLabel(key),
            count: val.count,
            subtotal: val.subtotal
        }))
        .sort((a, b) => (locOrder[a.key] || 50) - (locOrder[b.key] || 50));

        let locHtml = "";

    locations.forEach((loc) => {
        const locData = locationMap[loc.key];
        const variantsInLoc = Object.values(locData.variants || {})
            .sort((a, b) => {
                if (b.qty !== a.qty) return b.qty - a.qty;
                return a.name.localeCompare(b.name);
            });

        // Parent row (lokasi)
        locHtml += `
            <tr class="report-location-parent">
                <td>${escapeHtml(loc.label)}</td>
                <td class="align-right">${loc.count}</td>
                <td class="align-right">${formatRupiah(loc.subtotal)}</td>
            </tr>
        `;

        // Child rows (varian per lokasi)
        variantsInLoc.forEach((v) => {
            locHtml += `
                <tr class="report-location-child">
                    <td>${escapeHtml(v.name)}</td>
                    <td class="align-right">${v.qty}</td>
                    <td class="align-right">${formatRupiah(v.subtotal)}</td>
                </tr>
            `;
        });
    });

    reportLocationTbody.innerHTML = locHtml;

    render7DayChart();
}


/* =========================
   7-DAY CHART
   ========================= */

function render7DayChart() {
    if (!chart7Day) return;

    const baseDate = reportDateInput && reportDateInput.value
        ? reportDateInput.value
        : getTodayDateString();

    const days = [];
    for (let i = 6; i >= 0; i--) {
        const dateStr = getDateStringOffset(baseDate, -i);
                const orders = allOrders.filter(
            (order) =>
                getLocalDateString(order.createdAt) === dateStr &&
                (order.status || "pending") === "success"
        );
        const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
        days.push({ date: dateStr, count: orders.length, revenue });
    }

    const maxCount = Math.max(...days.map((d) => d.count), 1);
    let html = "";

    days.forEach((day) => {
        const heightPercent = (day.count / maxCount) * 100;
        const isActive = day.date === baseDate;
        const d = new Date(day.date + "T00:00:00");
        const dayNum = String(d.getDate()).padStart(2, "0");
        const monthNum = String(d.getMonth() + 1).padStart(2, "0");

        html += `
            <div class="chart-bar-wrap ${isActive ? "is-active" : ""}" data-date="${day.date}" title="${day.count} order · ${formatRupiah(day.revenue)}">
                <span class="chart-bar-value">${day.count}</span>
                <div class="chart-bar" style="height: ${Math.max(heightPercent, 3)}%;"></div>
                <span class="chart-bar-label">${dayNum}/${monthNum}</span>
            </div>
        `;
    });

    chart7Day.innerHTML = html;

    chart7Day.querySelectorAll(".chart-bar-wrap").forEach((bar) => {
        bar.addEventListener("click", () => {
            if (reportDateInput) {
                reportDateInput.value = bar.dataset.date;
                renderDailyReport();
            }
        });
    });
}


/* =========================
   EXPORT CSV
   ========================= */

function exportDailyCSV() {
    if (!reportDateInput || !reportDateInput.value) {
        alert("Pilih tanggal dulu.");
        return;
    }

    const selectedDate = reportDateInput.value;
    const dayOrders = allOrders.filter(
        (order) => getLocalDateString(order.createdAt) === selectedDate
    );

    if (dayOrders.length === 0) {
        alert("Belum ada order di tanggal ini.");
        return;
    }

    function csvCell(value) {
        if (value === null || value === undefined) return "";
        const str = String(value).replace(/"/g, '""');
        return `"${str}"`;
    }

    const headers = [
        "Order ID", "Tanggal", "Nama", "Tipe Customer", "WhatsApp",
        "Lokasi", "Alamat", "Catatan", "Produk", "Total", "Status"
    ];

    const rows = [headers.map(csvCell).join(",")];

    dayOrders.forEach((order) => {
        const itemsText = (order.items || [])
            .map((item) => {
                const addon = item.addonName ? ` + ${item.addonName}` : "";
                return `${item.quantity}x ${item.name}${addon}`;
            })
            .join("; ");

        const custType = getCustomerType(order);
        const statusVal = order.status || "pending";

        const row = [
            order.orderId || "",
            formatDate(order.createdAt),
            order.customerName || "",
            custType === "baru" ? "Baru" : "Lama",
            order.whatsapp || "",
            getLocationLabel(order.location),
            order.locationDetail || "",
            order.note || "",
            itemsText,
            order.total || 0,
            statusVal
        ];

        rows.push(row.map(csvCell).join(","));
    });

    const BOM = "\uFEFF";
    const csvContent = BOM + rows.join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `velacookies-orders-${selectedDate}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

if (reportExportBtn) reportExportBtn.addEventListener("click", exportDailyCSV);

if (reportDateInput) {
    reportDateInput.addEventListener("change", renderDailyReport);
    setReportDateToToday();
    render7DayChart();
}

if (reportTodayBtn) {
    reportTodayBtn.addEventListener("click", () => {
        setReportDateToToday();
        renderDailyReport();
    });
}


/* =========================
   FINANCE — LOAD DATA
   ========================= */

async function loadFinance() {
    if (!financeMonthInput) return;

    currentFinanceMonth = financeMonthInput.value || getCurrentMonthString();
    financeMonthInput.value = currentFinanceMonth;

    await Promise.all([
        loadFinanceSummary(),
        loadHppHistory(),
        loadCashflowHistory(),
        loadCategories()
    ]);
}

async function loadFinanceSummary() {
    try {
        const response = await fetch(
            `${API_BASE}/api/admin/finance/summary?month=${currentFinanceMonth}`,
            { headers: { "Authorization": `Bearer ${getToken()}` } }
        );

        if (response.status === 401) {
            clearToken();
            showLoginView();
            return;
        }

        const result = await response.json();
        if (!response.ok || !result.success) return;

        currentFinanceSummary = result.summary;
        renderFinanceSummary(result.summary);

    } catch (error) {
        console.error("Load finance summary error:", error);
    }
}

async function loadCategories() {
    if (!cfCategory) return;

    if (cashflowCategories.length > 0) {
        populateCategorySelect();
        return;
    }

    try {
        const response = await fetch(
            `${API_BASE}/api/admin/finance/cashflow-categories`,
            { headers: { "Authorization": `Bearer ${getToken()}` } }
        );

        const result = await response.json();
        if (!response.ok || !result.success) return;

        cashflowCategories = result.categories || [];
        populateCategorySelect();

    } catch (error) {
        console.error("Load categories error:", error);
    }
}

function populateCategorySelect() {
    if (!cfCategory) return;

    const currentVal = cfCategory.value;
    let html = '<option value="">— Pilih kategori —</option>';

    cashflowCategories.forEach((c) => {
        html += `<option value="${c.id}">${escapeHtml(c.name)}</option>`;
    });

    cfCategory.innerHTML = html;
    if (currentVal) cfCategory.value = currentVal;
}


/* =========================
   FINANCE — RENDER SUMMARY
   ========================= */

function renderFinanceSummary(s) {
    if (!s) return;

    finRevenue.innerText = formatRupiah(s.revenue);

    const statusMap = {
        "open": "Periode masih berjalan",
        "reviewed": "Periode sedang direview",
        "closed": "Periode sudah ditutup"
    };
    finPeriodStatus.innerText = statusMap[s.periodStatus] || "—";

    finHppPct.innerText = s.hppPct + "%";
    finHppAllocated.innerText = formatRupiah(s.hppAllocated);
    finHppSpent.innerText = formatRupiah(s.hppSpent);
    finHppRemaining.innerText = formatRupiah(s.hppRemaining);
    updateProgressBar(finHppBar, s.hppSpent, s.hppAllocated);

    finCashflowPct.innerText = s.cashflowPct + "%";
    finCashflowAllocated.innerText = formatRupiah(s.cashflowAllocated);
    finCashflowSpent.innerText = formatRupiah(s.cashflowSpent);
    finCashflowRemaining.innerText = formatRupiah(s.cashflowRemaining);
    updateProgressBar(finCashflowBar, s.cashflowSpent, s.cashflowAllocated);

    finProfitPct.innerText = s.profitPct + "%";
    finProfitAllocated.innerText = formatRupiah(s.profitAllocated);

    const spent = (s.hppSpent || 0) + (s.cashflowSpent || 0);
    finProfitDetail.innerText = `−${formatRupiah(spent)}`;
    finProfitFinal.innerText = formatRupiah(s.profitFinal);
}

function updateProgressBar(el, spent, allocated) {
    if (!el) return;
    if (allocated <= 0) {
        el.style.width = "0%";
        el.classList.remove("over");
        return;
    }
    const pct = Math.min((spent / allocated) * 100, 100);
    el.style.width = pct + "%";
    el.classList.toggle("over", spent > allocated);
}


/* =========================
   FINANCE — HISTORY: HPP
   ========================= */

async function loadHppHistory() {
    if (!hppHistoryTbody) return;

    hppHistoryMonth.innerText = currentFinanceMonth;

    try {
        const response = await fetch(
            `${API_BASE}/api/admin/finance/hpp-purchases?month=${currentFinanceMonth}`,
            { headers: { "Authorization": `Bearer ${getToken()}` } }
        );

        const result = await response.json();
        if (!response.ok || !result.success) return;

        const items = result.items || [];

        if (items.length === 0) {
            hppHistoryTbody.innerHTML = "";
            hppHistoryEmpty.hidden = false;
            return;
        }

        hppHistoryEmpty.hidden = true;
        let html = "";
        items.forEach((item) => {
            const qtyText = item.quantity
                ? `${item.quantity}${item.unit ? " " + item.unit : ""}`
                : "-";

            html += `
                <tr>
                    <td>${formatDateShort(item.purchaseDate)}</td>
                    <td>${escapeHtml(item.itemName)}</td>
                    <td>${escapeHtml(qtyText)}</td>
                    <td class="align-right cell-amount">${formatRupiah(item.amount)}</td>
                    <td>
                        <button class="btn-delete-small" data-hpp-id="${item.id}">Hapus</button>
                    </td>
                </tr>
            `;
        });

        hppHistoryTbody.innerHTML = html;

        hppHistoryTbody.querySelectorAll(".btn-delete-small").forEach((btn) => {
            btn.addEventListener("click", () => {
                deleteHppPurchase(Number(btn.dataset.hppId));
            });
        });

    } catch (error) {
        console.error("Load HPP history error:", error);
    }
}


/* =========================
   FINANCE — HISTORY: CASHFLOW
   ========================= */

async function loadCashflowHistory() {
    if (!cfHistoryTbody) return;

    cfHistoryMonth.innerText = currentFinanceMonth;

    try {
        const response = await fetch(
            `${API_BASE}/api/admin/finance/cashflow-transactions?month=${currentFinanceMonth}`,
            { headers: { "Authorization": `Bearer ${getToken()}` } }
        );

        const result = await response.json();
        if (!response.ok || !result.success) return;

        const items = result.items || [];

        if (items.length === 0) {
            cfHistoryTbody.innerHTML = "";
            cfHistoryEmpty.hidden = false;
            return;
        }

        cfHistoryEmpty.hidden = true;
        let html = "";
        items.forEach((item) => {
            html += `
                <tr>
                    <td>${formatDateShort(item.transactionDate)}</td>
                    <td>${escapeHtml(item.categoryName || "-")}</td>
                    <td>${escapeHtml(item.description)}</td>
                    <td class="align-right cell-amount">${formatRupiah(item.amount)}</td>
                    <td>
                        <button class="btn-delete-small" data-cf-id="${item.id}">Hapus</button>
                    </td>
                </tr>
            `;
        });

        cfHistoryTbody.innerHTML = html;

        cfHistoryTbody.querySelectorAll(".btn-delete-small").forEach((btn) => {
            btn.addEventListener("click", () => {
                deleteCashflowTransaction(Number(btn.dataset.cfId));
            });
        });

    } catch (error) {
        console.error("Load cashflow history error:", error);
    }
}


/* =========================
   FINANCE — FORM: HPP
   ========================= */

if (hppForm) {
    hppForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const purchaseDate = hppDate.value;
        const itemName = hppItem.value.trim();
        const quantity = hppQty.value ? parseFloat(hppQty.value) : null;
        const unit = hppUnit.value.trim() || null;
        const amount = parseInt(hppAmount.value, 10);
        const note = hppNote.value.trim() || null;

        if (!purchaseDate || !itemName || !amount) {
            alert("Tanggal, nama item, dan harga wajib diisi.");
            return;
        }

        const originalText = hppSubmit.innerText;
        hppSubmit.disabled = true;
        hppSubmit.innerText = "Menyimpan...";

        try {
            const response = await fetch(
                `${API_BASE}/api/admin/finance/hpp-purchases`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${getToken()}`
                    },
                    body: JSON.stringify({
                        purchaseDate,
                        itemName,
                        quantity,
                        unit,
                        amount,
                        note
                    })
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                alert(result.message || "Gagal menyimpan.");
                return;
            }

            hppForm.reset();
            hppDate.value = getTodayDateString();

            await Promise.all([
                loadFinanceSummary(),
                loadHppHistory()
            ]);

            hppSubmit.innerText = "✓ Tersimpan";
            setTimeout(() => {
                hppSubmit.innerText = originalText;
            }, 1500);

        } catch (error) {
            console.error("Save HPP error:", error);
            alert("Gagal terhubung ke server.");
        } finally {
            hppSubmit.disabled = false;
            if (hppSubmit.innerText === "Menyimpan...") {
                hppSubmit.innerText = originalText;
            }
        }
    });
}


/* =========================
   FINANCE — FORM: CASHFLOW
   ========================= */

if (cashflowForm) {
    cashflowForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const transactionDate = cfDate.value;
        const categoryId = cfCategory.value ? parseInt(cfCategory.value, 10) : null;
        const description = cfDesc.value.trim();
        const amount = parseInt(cfAmount.value, 10);
        const note = cfNote.value.trim() || null;

        if (!transactionDate || !description || !amount) {
            alert("Tanggal, deskripsi, dan jumlah wajib diisi.");
            return;
        }

        const originalText = cfSubmit.innerText;
        cfSubmit.disabled = true;
        cfSubmit.innerText = "Menyimpan...";

        try {
            const response = await fetch(
                `${API_BASE}/api/admin/finance/cashflow-transactions`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${getToken()}`
                    },
                    body: JSON.stringify({
                        transactionDate,
                        categoryId,
                        description,
                        amount,
                        note
                    })
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                alert(result.message || "Gagal menyimpan.");
                return;
            }

            cashflowForm.reset();
            cfDate.value = getTodayDateString();

            await Promise.all([
                loadFinanceSummary(),
                loadCashflowHistory()
            ]);

            cfSubmit.innerText = "✓ Tersimpan";
            setTimeout(() => {
                cfSubmit.innerText = originalText;
            }, 1500);

        } catch (error) {
            console.error("Save cashflow error:", error);
            alert("Gagal terhubung ke server.");
        } finally {
            cfSubmit.disabled = false;
            if (cfSubmit.innerText === "Menyimpan...") {
                cfSubmit.innerText = originalText;
            }
        }
    });
}


/* =========================
   FINANCE — DELETE
   ========================= */

async function deleteHppPurchase(id) {
    if (!confirm("Hapus pembelian ini?")) return;

    try {
        const response = await fetch(
            `${API_BASE}/api/admin/finance/hpp-purchases/${id}`,
            {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${getToken()}` }
            }
        );

        const result = await response.json();
        if (!response.ok || !result.success) {
            alert(result.message || "Gagal menghapus.");
            return;
        }

        await Promise.all([
            loadFinanceSummary(),
            loadHppHistory()
        ]);

    } catch (error) {
        console.error("Delete HPP error:", error);
        alert("Gagal terhubung ke server.");
    }
}

async function deleteCashflowTransaction(id) {
    if (!confirm("Hapus transaksi ini?")) return;

    try {
        const response = await fetch(
            `${API_BASE}/api/admin/finance/cashflow-transactions/${id}`,
            {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${getToken()}` }
            }
        );

        const result = await response.json();
        if (!response.ok || !result.success) {
            alert(result.message || "Gagal menghapus.");
            return;
        }

        await Promise.all([
            loadFinanceSummary(),
            loadCashflowHistory()
        ]);

    } catch (error) {
        console.error("Delete cashflow error:", error);
        alert("Gagal terhubung ke server.");
    }
}


/* =========================
   FINANCE — INPUT TABS
   ========================= */

financeTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = tab.dataset.financeTab;

        financeTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        financeFormPanels.forEach((panel) => {
            const isActive = panel.dataset.financeContent === target;
            panel.hidden = !isActive;
        });
    });
});


/* =========================
   FINANCE — EVENT LISTENERS
   ========================= */

if (financeMonthInput) {
    financeMonthInput.value = getCurrentMonthString();
    financeMonthInput.addEventListener("change", () => {
        currentFinanceMonth = financeMonthInput.value;
        loadFinance();
    });
}

if (financeRefreshBtn) {
    financeRefreshBtn.addEventListener("click", () => loadFinance());
}


/* =========================
   FINANCE — EXPORT EXCEL
   ========================= */

const financeExportBtn = document.getElementById("finance-export");

async function exportFinanceExcel() {
    if (typeof ExcelJS === "undefined") {
        alert("Library Excel belum ke-load. Coba refresh halaman.");
        return;
    }

    if (!currentFinanceMonth) {
        alert("Pilih bulan dulu.");
        return;
    }

    const originalText = financeExportBtn.innerText;
    financeExportBtn.disabled = true;
    financeExportBtn.innerText = "Menyiapkan...";

    try {
        const [summaryRes, hppRes, cfRes] = await Promise.all([
            fetch(`${API_BASE}/api/admin/finance/summary?month=${currentFinanceMonth}`, {
                headers: { "Authorization": `Bearer ${getToken()}` }
            }),
            fetch(`${API_BASE}/api/admin/finance/hpp-purchases?month=${currentFinanceMonth}`, {
                headers: { "Authorization": `Bearer ${getToken()}` }
            }),
            fetch(`${API_BASE}/api/admin/finance/cashflow-transactions?month=${currentFinanceMonth}`, {
                headers: { "Authorization": `Bearer ${getToken()}` }
            })
        ]);

        const summaryData = await summaryRes.json();
        const hppData = await hppRes.json();
        const cfData = await cfRes.json();

        if (!summaryData.success || !hppData.success || !cfData.success) {
            alert("Gagal mengambil data finance.");
            return;
        }

        const summary = summaryData.summary;
        const hppItems = hppData.items || [];
        const cfItems = cfData.items || [];

        const COLOR = {
            maroon: "FF250B0D",
            maroonLight: "FF42191C",
            gold: "FFD8A84E",
            goldLight: "FFE7C77D",
            cream: "FFF7EFE3",
            creamSoft: "FFD9CABB",
            white: "FFFFFAF3",
            green: "FF246B49",
            greenLight: "FF8BD28B",
            error: "FFE2725B",
            rowAlt: "FFFAF6EF"
        };

        const thinBorder = {
            top:    { style: "thin", color: { argb: COLOR.gold } },
            left:   { style: "thin", color: { argb: COLOR.gold } },
            bottom: { style: "thin", color: { argb: COLOR.gold } },
            right:  { style: "thin", color: { argb: COLOR.gold } }
        };

        const wb = new ExcelJS.Workbook();
        wb.creator = "Velacookies Admin";
        wb.created = new Date();

        /* SHEET 1: SUMMARY */
        const ws1 = wb.addWorksheet("Summary", {
            properties: { tabColor: { argb: COLOR.maroon } },
            views: [{ showGridLines: false }]
        });

        ws1.mergeCells("A1:E1");
        const titleCell = ws1.getCell("A1");
        titleCell.value = "LAPORAN KEUANGAN — VELACOOKIES";
        titleCell.font = { name: "Calibri", size: 16, bold: true, color: { argb: COLOR.cream } };
        titleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.maroon } };
        titleCell.alignment = { horizontal: "center", vertical: "middle" };
        ws1.getRow(1).height = 36;

        ws1.mergeCells("A2:E2");
        const subCell = ws1.getCell("A2");
        subCell.value = `Periode: ${currentFinanceMonth}   •   Dibuat: ${new Date().toLocaleString("id-ID")}`;
        subCell.font = { size: 11, italic: true, color: { argb: COLOR.maroonLight } };
        subCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.cream } };
        subCell.alignment = { horizontal: "center", vertical: "middle" };
        ws1.getRow(2).height = 22;

        ws1.addRow([]);

        ws1.getCell("A4").value = "OMZET BULAN INI";
        ws1.getCell("A4").font = { size: 11, bold: true, color: { argb: COLOR.maroonLight } };
        ws1.mergeCells("A4:B4");
        ws1.getCell("D4").value = summary.revenue;
        ws1.getCell("D4").numFmt = '"Rp"#,##0';
        ws1.getCell("D4").font = { size: 14, bold: true, color: { argb: COLOR.green } };
        ws1.mergeCells("D4:E4");
        ws1.getCell("D4").alignment = { horizontal: "right", vertical: "middle" };
        ws1.getRow(4).height = 28;

        ws1.addRow([]);

        const headerRow = ws1.addRow([
            "BUCKET",
            "PERSENTASE",
            "ALOKASI",
            "TERPAKAI",
            "SISA"
        ]);
        headerRow.eachCell((cell) => {
            cell.font = { bold: true, color: { argb: COLOR.maroon }, size: 11 };
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.gold } };
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.border = thinBorder;
        });
        headerRow.height = 26;

        const buckets = [
            {
                name: "HPP (Bahan Baku)",
                pct: summary.hppPct + "%",
                alloc: summary.hppAllocated,
                spent: summary.hppSpent,
                remain: summary.hppRemaining
            },
            {
                name: "Cash Flow (Operasional)",
                pct: summary.cashflowPct + "%",
                alloc: summary.cashflowAllocated,
                spent: summary.cashflowSpent,
                remain: summary.cashflowRemaining
            },
            {
                name: "Profit (Laba)",
                pct: summary.profitPct + "%",
                alloc: summary.profitAllocated,
                spent: null,
                remain: summary.profitFinal,
                isProfit: true
            }
        ];

        buckets.forEach((b, i) => {
            const row = ws1.addRow([
                b.name,
                b.pct,
                b.alloc,
                b.spent === null ? "—" : b.spent,
                b.remain
            ]);

            row.eachCell((cell, colNumber) => {
                cell.border = thinBorder;
                cell.alignment = { vertical: "middle" };
                if (colNumber >= 3 && colNumber <= 5) {
                    cell.numFmt = '"Rp"#,##0';
                    cell.alignment = { horizontal: "right", vertical: "middle" };
                }
                if (colNumber === 2) {
                    cell.alignment = { horizontal: "center", vertical: "middle" };
                }

                if (i % 2 === 1) {
                    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.rowAlt } };
                }

                if (b.isProfit) {
                    cell.font = { color: { argb: COLOR.green }, bold: true };
                } else {
                    cell.font = { color: { argb: COLOR.maroonLight } };
                }
            });

            const sisaCell = row.getCell(5);
            if (b.remain < 0) {
                sisaCell.font = { color: { argb: COLOR.error }, bold: true };
            }

            row.height = 22;
        });

        ws1.addRow([]);

        const totalSpent = (summary.hppSpent || 0) + (summary.cashflowSpent || 0);
        const totalRow = ws1.addRow(["", "", "", "TOTAL PENGELUARAN", totalSpent]);
        totalRow.getCell(4).font = { bold: true, color: { argb: COLOR.maroon } };
        totalRow.getCell(4).alignment = { horizontal: "right" };
        totalRow.getCell(5).numFmt = '"Rp"#,##0';
        totalRow.getCell(5).font = { bold: true, color: { argb: COLOR.error }, size: 12 };
        totalRow.getCell(5).alignment = { horizontal: "right" };
        totalRow.height = 24;

        const finalRow = ws1.addRow(["", "", "", "LABA FINAL", summary.profitFinal]);
        finalRow.getCell(4).font = { bold: true, color: { argb: COLOR.maroon } };
        finalRow.getCell(4).alignment = { horizontal: "right" };
        finalRow.getCell(5).numFmt = '"Rp"#,##0';
        finalRow.getCell(5).font = {
            bold: true,
            size: 14,
            color: { argb: summary.profitFinal >= 0 ? COLOR.green : COLOR.error }
        };
        finalRow.getCell(5).alignment = { horizontal: "right" };
        finalRow.height = 28;

        ws1.columns = [
            { width: 28 },
            { width: 14 },
            { width: 18 },
            { width: 18 },
            { width: 18 }
        ];

        /* SHEET 2: HPP */
        const ws2 = wb.addWorksheet("HPP", {
            properties: { tabColor: { argb: COLOR.green } },
            views: [{ showGridLines: false }]
        });

        ws2.mergeCells("A1:F1");
        const title2 = ws2.getCell("A1");
        title2.value = `PEMBELIAN HPP — ${currentFinanceMonth}`;
        title2.font = { size: 14, bold: true, color: { argb: COLOR.cream } };
        title2.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.maroon } };
        title2.alignment = { horizontal: "center", vertical: "middle" };
        ws2.getRow(1).height = 32;

        ws2.addRow([]);

        const hppHeader = ws2.addRow(["TANGGAL", "ITEM", "QTY", "UNIT", "HARGA", "CATATAN"]);
        hppHeader.eachCell((cell) => {
            cell.font = { bold: true, color: { argb: COLOR.maroon }, size: 11 };
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.gold } };
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.border = thinBorder;
        });
        hppHeader.height = 26;

        let totalHpp = 0;
        hppItems.forEach((item, i) => {
            const row = ws2.addRow([
                item.purchaseDate || "-",
                item.itemName || "-",
                item.quantity != null ? item.quantity : "-",
                item.unit || "-",
                item.amount || 0,
                item.note || "-"
            ]);

            row.eachCell((cell, colNumber) => {
                cell.border = thinBorder;
                cell.alignment = { vertical: "middle" };
                if (colNumber === 5) {
                    cell.numFmt = '"Rp"#,##0';
                    cell.alignment = { horizontal: "right", vertical: "middle" };
                }
                if (colNumber === 3 || colNumber === 4) {
                    cell.alignment = { horizontal: "center", vertical: "middle" };
                }
                if (i % 2 === 1) {
                    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.rowAlt } };
                }
                cell.font = { color: { argb: COLOR.maroonLight } };
            });

            totalHpp += item.amount || 0;
            row.height = 20;
        });

        if (hppItems.length > 0) {
            const tRow = ws2.addRow(["", "", "", "TOTAL", totalHpp, ""]);
            tRow.getCell(4).font = { bold: true, color: { argb: COLOR.maroon } };
            tRow.getCell(4).alignment = { horizontal: "right" };
            tRow.getCell(5).numFmt = '"Rp"#,##0';
            tRow.getCell(5).font = { bold: true, color: { argb: COLOR.error }, size: 12 };
            tRow.getCell(5).alignment = { horizontal: "right" };
            tRow.getCell(5).border = thinBorder;
            tRow.height = 24;
        } else {
            ws2.addRow(["", "", "", "", "Belum ada data", ""]);
        }

        ws2.columns = [
            { width: 14 },
            { width: 28 },
            { width: 8 },
            { width: 10 },
            { width: 16 },
            { width: 30 }
        ];

        /* SHEET 3: CASHFLOW */
        const ws3 = wb.addWorksheet("Cashflow", {
            properties: { tabColor: { argb: COLOR.gold } },
            views: [{ showGridLines: false }]
        });

        ws3.mergeCells("A1:E1");
        const title3 = ws3.getCell("A1");
        title3.value = `CASH FLOW — ${currentFinanceMonth}`;
        title3.font = { size: 14, bold: true, color: { argb: COLOR.cream } };
        title3.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.maroon } };
        title3.alignment = { horizontal: "center", vertical: "middle" };
        ws3.getRow(1).height = 32;

        ws3.addRow([]);

        const cfHeader = ws3.addRow(["TANGGAL", "KATEGORI", "DESKRIPSI", "JUMLAH", "CATATAN"]);
        cfHeader.eachCell((cell) => {
            cell.font = { bold: true, color: { argb: COLOR.maroon }, size: 11 };
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.gold } };
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.border = thinBorder;
        });
        cfHeader.height = 26;

        let totalCf = 0;
        cfItems.forEach((item, i) => {
            const row = ws3.addRow([
                item.transactionDate || "-",
                item.categoryName || "-",
                item.description || "-",
                item.amount || 0,
                item.note || "-"
            ]);

            row.eachCell((cell, colNumber) => {
                cell.border = thinBorder;
                cell.alignment = { vertical: "middle" };
                if (colNumber === 4) {
                    cell.numFmt = '"Rp"#,##0';
                    cell.alignment = { horizontal: "right", vertical: "middle" };
                }
                if (i % 2 === 1) {
                    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.rowAlt } };
                }
                cell.font = { color: { argb: COLOR.maroonLight } };
            });

            totalCf += item.amount || 0;
            row.height = 20;
        });

        if (cfItems.length > 0) {
            const tRow = ws3.addRow(["", "", "TOTAL", totalCf, ""]);
            tRow.getCell(3).font = { bold: true, color: { argb: COLOR.maroon } };
            tRow.getCell(3).alignment = { horizontal: "right" };
            tRow.getCell(4).numFmt = '"Rp"#,##0';
            tRow.getCell(4).font = { bold: true, color: { argb: COLOR.error }, size: 12 };
            tRow.getCell(4).alignment = { horizontal: "right" };
            tRow.getCell(4).border = thinBorder;
            tRow.height = 24;
        } else {
            ws3.addRow(["", "", "", "Belum ada data", ""]);
        }

        ws3.columns = [
            { width: 14 },
            { width: 20 },
            { width: 32 },
            { width: 16 },
            { width: 30 }
        ];

        const buffer = await wb.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `velacookies-keuangan-${currentFinanceMonth}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

    } catch (error) {
        console.error("Export Excel error:", error);
        alert("Gagal export Excel.");
    } finally {
        financeExportBtn.disabled = false;
        financeExportBtn.innerText = originalText;
    }
}

if (financeExportBtn) {
    financeExportBtn.addEventListener("click", exportFinanceExcel);
}


/* =========================
   INIT
   ========================= */

(async function init() {
    if (hppDate) hppDate.value = getTodayDateString();
    if (cfDate) cfDate.value = getTodayDateString();

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