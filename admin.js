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
const locationFilter = document.getElementById("location-filter");
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
const orderModal = document.getElementById("order-modal");
const orderModalBody = document.getElementById("order-modal-body");
const orderModalClose = document.getElementById("order-modal-close");

/* STATE */
let allOrders = [];

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

    return {
        orders: orders.length,
        items: totalItems,
        revenue: totalRevenue
    };
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
   SUMMARY
   ========================= */

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

/* =========================
   FILTER (search + location)
   ========================= */

function applyFilters() {
    const query = (searchInput?.value || "").trim().toLowerCase();
    const locFilter = locationFilter?.value || "all";

    let filtered = allOrders;

    if (locFilter !== "all") {
        filtered = filtered.filter((o) => o.location === locFilter);
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

/* =========================
   RENDER TABLE
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

        html += `
            <tr>
                <td class="cell-order-id">${order.orderId || "-"}</td>
                <td>${formatDate(order.createdAt)}</td>
                <td>${escapeHtml(order.customerName || "-")}</td>
                <td>
                    <span class="location-badge ${locClass}">
                        ${escapeHtml(locLabel)}
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
   SEARCH + FILTER EVENT
   ========================= */

if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
}

if (locationFilter) {
    locationFilter.addEventListener("change", applyFilters);
}

/* =========================
   REFRESH
   ========================= */

if (refreshBtn) {
    refreshBtn.addEventListener("click", () => loadOrders());
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
            <span class="label">Nama</span>
            <span class="value">${escapeHtml(order.customerName || "-")}</span>
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

/* =========================
   DAILY REPORT — SETUP
   ========================= */

function setReportDateToToday() {
    if (!reportDateInput) return;
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    reportDateInput.value = `${year}-${month}-${day}`;
}

/* =========================
   REPORT — DELTA
   ========================= */

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

/* =========================
   REPORT — RENDER
   ========================= */

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

    const dayOrders = allOrders.filter((order) => {
        return getLocalDateString(order.createdAt) === selectedDate;
    });

    // Metrics untuk perbandingan
    const previousDate = getDateStringOffset(selectedDate, -1);
    const previousOrders = allOrders.filter((order) => {
        return getLocalDateString(order.createdAt) === previousDate;
    });

    const currentMetrics = getMetrics(dayOrders);
    const previousMetrics = getMetrics(previousOrders);

    // Delta calculation
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
            locationMap[locKey] = { count: 0, subtotal: 0 };
        }
        locationMap[locKey].count += 1;
        locationMap[locKey].subtotal += order.total || 0;

        (order.items || []).forEach((item) => {
            const key = item.productId || item.name;

            if (!variantMap[key]) {
                variantMap[key] = {
                    name: item.name,
                    qty: 0,
                    subtotal: 0
                };
            }

            variantMap[key].qty += item.quantity;
            variantMap[key].subtotal +=
                item.subtotal || (item.price * item.quantity);
        });
    });

    reportTotalOrders.innerText = currentMetrics.orders;
    reportTotalItems.innerText = currentMetrics.items;
    reportTotalRevenue.innerText = formatRupiah(currentMetrics.revenue);

    const variants = Object.values(variantMap).sort(
        (a, b) => b.qty - a.qty
    );

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
        locHtml += `
            <tr>
                <td>${escapeHtml(loc.label)}</td>
                <td class="align-right">${loc.count}</td>
                <td class="align-right">${formatRupiah(loc.subtotal)}</td>
            </tr>
        `;
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
        : (() => {
            const t = new Date();
            const y = t.getFullYear();
            const m = String(t.getMonth() + 1).padStart(2, "0");
            const d = String(t.getDate()).padStart(2, "0");
            return `${y}-${m}-${d}`;
        })();

    const days = [];
    for (let i = 6; i >= 0; i--) {
        const dateStr = getDateStringOffset(baseDate, -i);
        const orders = allOrders.filter((order) => {
            return getLocalDateString(order.createdAt) === dateStr;
        });

        const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

        days.push({
            date: dateStr,
            count: orders.length,
            revenue
        });
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
            const dateStr = bar.dataset.date;
            if (reportDateInput) {
                reportDateInput.value = dateStr;
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

    const dayOrders = allOrders.filter((order) => {
        return getLocalDateString(order.createdAt) === selectedDate;
    });

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
        "Order ID",
        "Tanggal",
        "Nama",
        "WhatsApp",
        "Lokasi",
        "Alamat",
        "Catatan",
        "Produk",
        "Total"
    ];

    const rows = [headers.map(csvCell).join(",")];

    dayOrders.forEach((order) => {
        const itemsText = (order.items || [])
            .map((item) => {
                const addon = item.addonName ? ` + ${item.addonName}` : "";
                return `${item.quantity}x ${item.name}${addon}`;
            })
            .join("; ");

        const row = [
            order.orderId || "",
            formatDate(order.createdAt),
            order.customerName || "",
            order.whatsapp || "",
            getLocationLabel(order.location),
            order.locationDetail || "",
            order.note || "",
            itemsText,
            order.total || 0
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

if (reportExportBtn) {
    reportExportBtn.addEventListener("click", exportDailyCSV);
}

/* =========================
   REPORT — EVENT LISTENERS
   ========================= */

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
   INIT
   ========================= */

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