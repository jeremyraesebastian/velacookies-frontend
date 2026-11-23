/* =========================================================
   ADMIN PANEL — VELACOOKIES (FULL EDITION + WA AI CHATBOT)
   ========================================================= */

const API_BASE = "https://velacookies-production-d6e05223.up.railway.app";
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

/* Sidebar & Topbar */
const adminSidebar = document.getElementById("admin-sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const topbarCurrentPage = document.getElementById("topbar-current-page");
const sidebarOrdersBadge = document.getElementById("sidebar-orders-badge");
const adminTabs = document.querySelectorAll(".admin-tab");
const tabContents = document.querySelectorAll(".tab-content");

/* Overview & Orders DOM */
const overviewRefreshBtn = document.getElementById("overview-refresh-btn");
const goToOrdersBtn = document.getElementById("go-to-orders-btn");
const refreshBtn = document.getElementById("refresh-btn");
const searchInput = document.getElementById("search-input");
const locationFilter = document.getElementById("location-filter");
const statusFilter = document.getElementById("status-filter");
const dateFilter = document.getElementById("date-filter");
const clearDateBtn = document.getElementById("clear-date-btn");
const ordersTbody = document.getElementById("orders-tbody");
const overviewRecentTbody = document.getElementById("overview-recent-tbody");
const tableEmpty = document.getElementById("table-empty");
const tableLoading = document.getElementById("table-loading");

/* Pagination & Inline Detail */
const ordersPaginationInfo = document.getElementById("orders-pagination-info");
const ordersPaginationBtns = document.getElementById("orders-pagination-btns");
const ordersExportCsvBtn = document.getElementById("orders-export-csv-btn");

/* Summary Metrics */
const summaryTotalOrders = document.getElementById("summary-total-orders");
const summaryTotalRevenue = document.getElementById("summary-total-revenue");
const summaryTodayOrders = document.getElementById("summary-today-orders");
const summaryTotalPcs = document.getElementById("summary-total-pcs");
const summaryAvgPcs = document.getElementById("summary-avg-pcs");
const summaryRevenueSub = document.getElementById("summary-revenue-sub");

/* Orders Tab Status Cards */
const ordersCardTotal = document.getElementById("orders-card-total");
const ordersCardTotalSub = document.getElementById("orders-card-total-sub");
const ordersCardPending = document.getElementById("orders-card-pending");
const ordersCardPendingSub = document.getElementById("orders-card-pending-sub");
const ordersCardSuccess = document.getElementById("orders-card-success");
const ordersCardFinished = document.getElementById("orders-card-finished");
const ordersCardReview = document.getElementById("orders-card-review");
const ordersCardReviewSub = document.getElementById("orders-card-review-sub");
const ordersListSubtitle = document.getElementById("orders-list-subtitle");
const overviewOrdersCountBadge = document.getElementById("overview-orders-count-badge");
const overviewPendingSubtitle = document.getElementById("overview-pending-subtitle");

/* Daily Report & Insights */
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
const overviewVariantBars = document.getElementById("overview-variant-bars");
const overviewVariantTotalPcs = document.getElementById("overview-variant-total-pcs");

/* Location Strip in Overview */
const overviewLocationDateLabel = document.getElementById("overview-location-date-label");
const stripSman1Count = document.getElementById("strip-sman1-count");
const stripSman1Rev = document.getElementById("strip-sman1-rev");
const stripSman5Count = document.getElementById("strip-sman5-count");
const stripSman5Rev = document.getElementById("strip-sman5-rev");
const stripOthersCount = document.getElementById("strip-others-count");
const stripOthersRev = document.getElementById("strip-others-rev");

/* Customer Insights */
const insightTotalCustomers = document.getElementById("insight-total-customers");
const insightRepeatRate = document.getElementById("insight-repeat-rate");
const insightRepeatDetail = document.getElementById("insight-repeat-detail");
const insightNewOldRatio = document.getElementById("insight-new-old-ratio");
const insightNewOldDetail = document.getElementById("insight-new-old-detail");
const insightBarNew = document.getElementById("insight-bar-new");
const insightBarOld = document.getElementById("insight-bar-old");

/* Modals */
const orderModal = document.getElementById("order-modal");
const orderModalBody = document.getElementById("order-modal-body");
const orderModalClose = document.getElementById("order-modal-close");

const bulkDeleteModal = document.getElementById("bulk-delete-modal");
const bulkDeleteOpenBtn = document.getElementById("bulk-delete-open-btn");
const bulkDeleteCloseBtn = document.getElementById("bulk-delete-close");
const bulkDeleteCancelBtn = document.getElementById("bulk-delete-cancel-btn");
const bulkStatusSelect = document.getElementById("bulk-status-select");
const bulkStartDate = document.getElementById("bulk-start-date");
const bulkEndDate = document.getElementById("bulk-end-date");
const bulkPreviewCount = document.getElementById("bulk-preview-count");
const bulkPreviewNote = document.getElementById("bulk-preview-note");
const bulkDeleteSubmitBtn = document.getElementById("bulk-delete-submit-btn");

const finishOrderModal = document.getElementById("finish-order-modal");
const finishOrderCloseBtn = document.getElementById("finish-order-modal-close") || document.getElementById("finish-order-close");
const finishOrderCancelBtn = document.getElementById("finish-order-cancel-btn");
const finishOrderSubmitBtn = document.getElementById("finish-order-confirm-btn") || document.getElementById("finish-order-submit-btn");
const finishOrderSummaryBox = document.getElementById("finish-order-summary") || document.getElementById("finish-order-summary-box");

/* Settings DOM */
const settingsForm = document.getElementById("settings-form");
const settingsQrisOwner = document.getElementById("settings-qris-owner");
const settingsQrisImage = document.getElementById("settings-qris-image");
const settingsQrisPreview = document.getElementById("settings-qris-preview");
const settingsWa = document.getElementById("settings-wa");
const settingsSubmit = document.getElementById("settings-submit");
const settingsStatus = document.getElementById("settings-status");
const settingsUpdated = document.getElementById("settings-updated");

/* PO Management DOM */
const headerPoBadge = document.getElementById("header-po-badge");
const headerPoText = document.getElementById("header-po-text");
const poCurrentBadge = document.getElementById("po-current-badge");
const poInfoStatus = document.getElementById("po-info-status");
const poInfoClose = document.getElementById("po-info-close");
const poInfoProduction = document.getElementById("po-info-production");
const btnClosePo = document.getElementById("btn-close-po");
const poForm = document.getElementById("po-form");
const poFormTitle = document.getElementById("po-form-title");
const poCloseDate = document.getElementById("po-close-date");
const poProductionDate = document.getElementById("po-production-date");
const poSubmitBtn = document.getElementById("po-submit-btn");
const poStatusMsg = document.getElementById("po-status-msg");

/* Stocks Tab & Modal DOM */
const stocksTbody = document.getElementById("stocks-tbody");
const stocksLoading = document.getElementById("stocks-loading");
const stocksEmpty = document.getElementById("stocks-empty");
const stocksRefreshBtn = document.getElementById("stocks-refresh");
const stocksSummaryTotalPcs = document.getElementById("stocks-summary-total-pcs");
const stocksSummarySkuCount = document.getElementById("stocks-summary-sku-count");
const stocksSummaryLowCount = document.getElementById("stocks-summary-low-count");
const stocksSummaryOutCount = document.getElementById("stocks-summary-out-count");
const stockAlertBanner = document.getElementById("stock-alert-banner");
const stockAlertText = document.getElementById("stock-alert-text");
const stockHistoryTbody = document.getElementById("stock-history-tbody");

/* Inline Stock Form */
const inlineStockForm = document.getElementById("inline-stock-form");
const inlineStockSelect = document.getElementById("inline-stock-select");
const inlineStockCurrent = document.getElementById("inline-stock-current");
const inlineStockInput = document.getElementById("inline-stock-input");
const inlineStepMinus = document.getElementById("inline-step-minus");
const inlineStepPlus = document.getElementById("inline-step-plus");
const inlineStockReason = document.getElementById("inline-stock-reason");
const inlineStockNote = document.getElementById("inline-stock-note");
const inlineStockSubmit = document.getElementById("inline-stock-submit");
const inlineStockMsg = document.getElementById("inline-stock-msg");

/* Stock Popup Modal */
const stockModal = document.getElementById("stock-modal");
const stockModalClose = document.getElementById("stock-modal-close");
const stockModalCancel = document.getElementById("stock-modal-cancel");
const stockModalForm = document.getElementById("stock-modal-form");
const stockModalId = document.getElementById("stock-modal-id");
const stockModalProductName = document.getElementById("stock-modal-product-name");
const stockModalCurrentDisplay = document.getElementById("stock-modal-current-display");
const stockModalNewInput = document.getElementById("stock-modal-new-input");
const stockStepMinus = document.getElementById("stock-step-minus");
const stockStepPlus = document.getElementById("stock-step-plus");
const stockModalReason = document.getElementById("stock-modal-reason");
const stockModalNote = document.getElementById("stock-modal-note");
const stockModalSave = document.getElementById("stock-modal-save");
const stockModalError = document.getElementById("stock-modal-error");

/* Dashboard Period Filter DOM */
const dashDateInput = document.getElementById("dash-date-input");
const dashMonthInput = document.getElementById("dash-month-input");
const dashYearSelect = document.getElementById("dash-year-select");

/* Finance Tab DOM */
const financeDateInput = document.getElementById("finance-date");
const financeMonthInput = document.getElementById("finance-month");
const financeYearSelect = document.getElementById("finance-year");
const financeRefreshBtn = document.getElementById("finance-refresh");
const finRevenue = document.getElementById("fin-revenue");
const finPeriodStatus = document.getElementById("fin-period-status");
const finGeneralHpp = document.getElementById("fin-general-hpp");
const finNetRemaining = document.getElementById("fin-net-remaining");
const financeVariantTbody = document.getElementById("finance-variant-tbody");
const financeVariantTfoot = document.getElementById("finance-variant-tfoot");

/* WhatsApp Chatbot & Verification DOM */
const sidebarWaBadge = document.getElementById("sidebar-wa-badge");
const waBotStatusPill = document.getElementById("wa-bot-status-pill");
const waMetricTotal = document.getElementById("wa-metric-total");
const waMetricVerify = document.getElementById("wa-metric-verify");
const waMetricDp = document.getElementById("wa-metric-dp");
const waMetricHuman = document.getElementById("wa-metric-human");

const waPanelInbox = document.getElementById("wa-subview-inbox");
const waPanelGateway = document.getElementById("wa-subview-gateway");
const waPanelKnowledge = document.getElementById("wa-subview-knowledge");

const waConvCountLabel = document.getElementById("wa-conv-count-label");
const waConvFilterSelect = document.getElementById("wa-conv-filter-select");
const waConvSearch = document.getElementById("wa-conv-search");
const waConvList = document.getElementById("wa-conv-list");

const waActiveAvatar = document.getElementById("wa-active-avatar");
const waActiveCustomerName = document.getElementById("wa-active-name");
const waActiveOrderPill = document.getElementById("wa-active-order-pill");
const waActiveModePill = document.getElementById("wa-active-mode-pill");
const waActiveCustomerSub = document.getElementById("wa-active-phone");
const waToggleModeBtn = document.getElementById("wa-toggle-mode-btn");
const waOpenExternalLink = document.getElementById("wa-open-external-link");
const waMessagesViewport = document.getElementById("wa-messages-viewport");
const waReplyForm = document.getElementById("wa-reply-form");
const waReplyInput = document.getElementById("wa-reply-input");
const waReplySubmitBtn = document.getElementById("wa-reply-submit");

const waOrderContextBody = document.getElementById("wa-order-context-body");
const waWebhookUrlDisplay = document.getElementById("wa-webhook-url-display");

const waGatewayForm = document.getElementById("wa-gateway-form");
const waSettingProvider = document.getElementById("wa-setting-provider");
const waSettingSender = document.getElementById("wa-setting-number");
const waSettingToken = document.getElementById("wa-setting-secret");
const waSettingAutoReply = document.getElementById("wa-setting-bot-active");
const waSettingBotActiveTitle = document.getElementById("wa-setting-bot-active-title");
const waSettingAutoRedirect = document.getElementById("wa-setting-auto-notify");
const waSettingTemplateApproved = document.getElementById("wa-setting-approve-tpl");
const waSettingTemplateRejected = document.getElementById("wa-setting-reject-tpl");
const waGatewaySaveBtn = document.getElementById("wa-gateway-save-btn");
const waGatewaySaveFeedback = document.getElementById("wa-gateway-status");

/* Phase 3: Knowledge Base Editor & AI Health Monitor DOM */
const waKnowledgeSectionsList = document.getElementById("wa-knowledge-sections-list");
const waKnowledgeSaveBtn = document.getElementById("wa-knowledge-save-btn");
const waKnowledgeResetAllBtn = document.getElementById("wa-knowledge-reset-all-btn");
const waKnowledgeStatus = document.getElementById("wa-knowledge-status");

const waHealthStatusBadge = document.getElementById("wa-health-status-badge");
const waHealthRefreshBtn = document.getElementById("wa-health-refresh-btn");
const waHealthActiveModel = document.getElementById("wa-health-active-model");
const waHealthModelsPair = document.getElementById("wa-health-models-pair");
const waHealthThinkingTimeout = document.getElementById("wa-health-thinking-timeout");
const waHealthApikeyStatus = document.getElementById("wa-health-apikey-status");
const waHealthStatTotal = document.getElementById("wa-health-stat-total");
const waHealthStatSuccess = document.getElementById("wa-health-stat-success");
const waHealthStatFallback = document.getElementById("wa-health-stat-fallback");
const waHealthStatLatency = document.getElementById("wa-health-stat-latency");
const waHealthLastErrorBox = document.getElementById("wa-health-last-error-box");
const waHealthLastErrorTime = document.getElementById("wa-health-last-error-time");
const waHealthLastErrorMsg = document.getElementById("wa-health-last-error-msg");
const waHealthLogsCount = document.getElementById("wa-health-logs-count");
const waAiLogsTbody = document.getElementById("wa-ai-logs-tbody");

const waOpenTestModalBtn = document.getElementById("wa-open-test-modal-btn");
const waRefreshBtn = document.getElementById("wa-refresh-btn");
const waTestModal = document.getElementById("wa-test-modal");
const waTestModalClose = document.getElementById("wa-test-modal-close");
const waTestCancelBtn = document.getElementById("wa-test-cancel-btn");
const waTestForm = document.getElementById("wa-test-form");
const waTestPreset = document.getElementById("wa-test-preset");
const waTestName = document.getElementById("wa-test-name");
const waTestPhone = document.getElementById("wa-test-phone");
const waTestMessage = document.getElementById("wa-test-message");
const waTestAttachReceipt = document.getElementById("wa-test-attach-receipt");
const waTestReceiptFields = document.getElementById("wa-test-receipt-options");
const waTestReceiptAmount = document.getElementById("wa-test-receipt-amount");
const waTestReceiptBank = document.getElementById("wa-test-receipt-bank");
const waTestSubmitBtn = document.getElementById("wa-test-submit-btn");


/* =========================
   STATE
   ========================= */

let allOrders = [];
let filteredOrdersList = [];
let currentOrderPage = 1;
const ORDERS_PER_PAGE = 8;
let selectedInlineOrderId = null;

const DEFAULT_SKU_HPP_CATALOG = [
    { productId: "chocochip", addonName: "", skuKey: "chocochip", displayName: "Velaclassic Chocochip", sellPrice: 12000, hppUnit: 6000 },
    { productId: "biscoff", addonName: "", skuKey: "biscoff", displayName: "Vela Lotus Biscoff", sellPrice: 15000, hppUnit: 6000 },
    { productId: "scoopable", addonName: "", skuKey: "scoopable", displayName: "Scoopable Nutella Cookies", sellPrice: 28000, hppUnit: 15000 },
    { productId: "scoopable", addonName: "Strawberry + Extra Nutella", skuKey: "scoopable||Strawberry + Extra Nutella", displayName: "Scoopable Nutella Cookies (+ Strawberry + Extra Nutella)", sellPrice: 36000, hppUnit: 20000 },
    { productId: "nutella-tin", addonName: "", skuKey: "nutella-tin", displayName: "Cookie Nutella Tin", sellPrice: 80000, hppUnit: 54500 },
    { productId: "nutella-tin", addonName: "Strawberry + Extra Nutella", skuKey: "nutella-tin||Strawberry + Extra Nutella", displayName: "Cookie Nutella Tin (+ Strawberry + Extra Nutella)", sellPrice: 95000, hppUnit: 64500 }
];

let allStocks = [];
let dashPeriodMode = "day";
let financePeriodMode = "month";
let currentFinanceReport = null;
let skuHppCatalogCache = [...DEFAULT_SKU_HPP_CATALOG];
let currentPOData = null;
let poStatusCache = null;
let selectedViewPoId = null;
let poDeleteTarget = null;
let currentStockFilter = "all";
let stockAdjustMode = "add";

/* WA Chatbot State */
let waConversationsCache = [];
let waSelectedConvId = null;
let waActiveFilter = "all";
let waSearchQuery = "";
let waCurrentSettings = null;
let waActiveConvObject = null;

/* Multi-Role Auth State (admin | investor) */
let currentAdminRole = "admin";
let currentAdminUsername = "Admin";

function isInvestorRole() {
    return currentAdminRole === "investor";
}

function applyRolePermissionsUI() {
    const isInvestor = isInvestorRole();
    document.body.classList.toggle("is-investor-readonly", isInvestor);

    const readonlyBadge = document.getElementById("investor-readonly-badge");
    if (readonlyBadge) readonlyBadge.hidden = !isInvestor;

    const sidebarAvatar = document.getElementById("sidebar-user-avatar");
    const sidebarName = document.getElementById("sidebar-user-name");
    const sidebarRole = document.getElementById("sidebar-user-role");
    if (sidebarAvatar) sidebarAvatar.innerText = isInvestor ? "IV" : "AD";
    if (sidebarName) sidebarName.innerText = currentAdminUsername || (isInvestor ? "Investor" : "Admin");
    if (sidebarRole) sidebarRole.innerText = isInvestor ? "Investor · Hanya Lihat" : "Administrator";

    const secInvestorCard = document.getElementById("sec-investor-account");
    const navInvestorBtn = document.getElementById("settings-nav-investor");
    if (secInvestorCard) secInvestorCard.hidden = isInvestor;
    if (navInvestorBtn) navInvestorBtn.hidden = isInvestor;

    const sessionRoleBadge = document.getElementById("settings-session-role-badge");
    const sessionAvatar = document.getElementById("settings-account-avatar");
    const sessionTitle = document.getElementById("settings-account-title");
    const sessionDesc = document.getElementById("settings-account-desc");
    if (sessionRoleBadge) {
        sessionRoleBadge.innerText = isInvestor ? "Mode Baca Saja (Read-Only)" : "Akses Penuh (Admin)";
        sessionRoleBadge.className = `badge-pill ${isInvestor ? "badge-gold" : "badge-green"}`;
    }
    if (sessionAvatar) sessionAvatar.innerText = isInvestor ? "IV" : "AD";
    if (sessionTitle) {
        sessionTitle.innerText = isInvestor
            ? `Akun Investor (${currentAdminUsername || "velainvestor"})`
            : `Administrator Utama (${currentAdminUsername || "velaadmin"})`;
    }
    if (sessionDesc) {
        sessionDesc.innerText = isInvestor
            ? "Akses transparan (Read-Only): dapat melihat seluruh data, detail pesanan, dan ekspor laporan tanpa mengubah data."
            : "Akses penuh (100% kontrol). Token terenkripsi berlaku selama 8 jam sejak login terakhir.";
    }

    // Nonaktifkan input form yang bersifat mengubah data saat login sebagai Investor,
    // namun JANGAN pernah menonaktifkan input pencarian, filter, tanggal laporan, atau paginasi.
    const writeFormSelectors = [
        "#inline-stock-form input, #inline-stock-form select, #inline-stock-form textarea, #inline-stock-form button",
        "#po-form input, #po-form select, #po-form textarea, #po-form button",
        "#po-referral-add-form input, #po-referral-add-form button",
        "#settings-form input, #settings-form select, #settings-form textarea, #settings-form button",
        "#sku-hpp-form input, #sku-hpp-form button",
        "#wa-gateway-form input, #wa-gateway-form select, #wa-gateway-form textarea, #wa-gateway-form button",
        "#wa-setting-approve-tpl, #wa-setting-reject-tpl"
    ];
    document.querySelectorAll(writeFormSelectors.join(", ")).forEach((el) => {
        el.disabled = isInvestor;
    });

    if (poStatusCache) {
        if (btnClosePo) btnClosePo.style.display = (poStatusCache.isOpen === true && !isInvestor) ? "inline-flex" : "none";
        renderPOHistory(getPOHistoryWithCurrent());
    }
}


/* =========================
   HELPERS — TIMEZONE (WIB)
   ========================= */

function parseISOString(isoString) {
    if (!isoString) return null;
    const hasTz = /[Zz]$/.test(isoString) || /[+-]\d{2}:?\d{2}$/.test(isoString);
    const iso = hasTz ? isoString : isoString + "Z";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return null;
    return d;
}

function getWIBParts(date) {
    if (!date || isNaN(date.getTime())) return null;
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).formatToParts(date);

    const get = (type) => parts.find((p) => p.type === type)?.value;
    return {
        year: get("year"),
        month: get("month"),
        day: get("day"),
        hour: get("hour"),
        minute: get("minute")
    };
}

/* =========================
   HELPERS — FORMAT
   ========================= */

function formatRupiah(number) {
    return "Rp" + Number(number || 0).toLocaleString("id-ID");
}

function formatDate(isoString) {
    const date = parseISOString(isoString);
    if (!date) return "-";
    return date.toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
}

function formatDateShort(isoDate) {
    if (!isoDate) return "-";
    const parts = String(isoDate).split("-");
    if (parts.length !== 3) return isoDate;
    const d = new Date(Date.UTC(+parts[0], +parts[1] - 1, +parts[2]));
    return d.toLocaleDateString("id-ID", {
        timeZone: "UTC",
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function getLocalDateString(isoString) {
    const d = parseISOString(isoString);
    if (!d) return "";
    const p = getWIBParts(d);
    if (!p) return "";
    return `${p.year}-${p.month}-${p.day}`;
}

function getDateStringOffset(dateString, dayOffset) {
    const parts = String(dateString).split("-");
    if (parts.length !== 3) return dateString;
    const d = new Date(Date.UTC(+parts[0], +parts[1] - 1, +parts[2]));
    d.setUTCDate(d.getUTCDate() + dayOffset);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getCurrentMonthString() {
    const p = getWIBParts(new Date());
    if (!p) return "";
    return `${p.year}-${p.month}`;
}

function getTodayDateString() {
    const p = getWIBParts(new Date());
    if (!p) return "";
    return `${p.year}-${p.month}-${p.day}`;
}

/* =========================
   HELPERS — LAINNYA
   ========================= */

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

function isPaidOrder(order) {
    const s = (order && order.status) || "pending";
    return s === "success" || s === "finished";
}

function getStatusLabel(status) {
    const map = {
        "pending": "Pending",
        "success": "Success",
        "finished": "Finish",
        "expired": "Expired",
        "failed": "Failed"
    };
    return map[status] || "Pending";
}

function getStatusClass(status) {
    const map = {
        "pending": "status-pending",
        "success": "status-success",
        "finished": "status-finished",
        "expired": "status-expired",
        "failed": "status-failed"
    };
    return map[status] || "status-pending";
}

function getMetrics(orders) {
    let totalItems = 0;
    let totalRevenue = 0;
    orders.forEach((order) => {
        totalRevenue += order.total || 0;
        (order.items || []).forEach((item) => {
            totalItems += item.quantity || 0;
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
    const orderDateObj = parseISOString(order.createdAt);
    if (!orderDateObj) return "baru";
    const orderDate = orderDateObj.getTime();

    const previousOrders = allOrders.filter((o) => {
        if (normalizeWA(o.whatsapp) !== wa) return false;
        const otherDateObj = parseISOString(o.createdAt);
        if (!otherDateObj) return false;
        return otherDateObj.getTime() < orderDate;
    });

    return previousOrders.length > 0 ? "lama" : "baru";
}

function getOrderTotalCookies(order) {
    return (order.items || []).reduce((acc, it) => acc + (it.quantity || 0), 0);
}

/* =========================
   VIEW & SIDEBAR SWITCH
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

function closeMobileSidebar() {
    if (adminSidebar) adminSidebar.classList.remove("open");
    if (sidebarOverlay) sidebarOverlay.classList.remove("active");
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
        adminSidebar.classList.toggle("open");
        sidebarOverlay.classList.toggle("active");
    });
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeMobileSidebar);
}

const TAB_LABELS = {
    dashboard: "Dashboard",
    orders: "Pesanan",
    "order-detail": "Detail pesanan",
    stocks: "Stok produk",
    preorder: "Pre-order",
    finance: "Keuangan",
    referrals: "Kode Referral",
    reports: "Laporan harian",
    whatsapp: "WhatsApp",
    settings: "Pengaturan"
};

function switchTab(targetTab) {
    if (!TAB_LABELS[targetTab]) targetTab = "dashboard";
    const navTab = targetTab === "order-detail" ? "orders" : targetTab;

    adminTabs.forEach((t) => {
        t.classList.toggle("active", t.dataset.tab === navTab);
    });

    tabContents.forEach((content) => {
        const isActive = content.dataset.tabContent === targetTab;
        content.classList.toggle("active", isActive);
        content.hidden = !isActive;
    });

    if (topbarCurrentPage) {
        topbarCurrentPage.innerText = TAB_LABELS[targetTab];
    }

    closeMobileSidebar();
    window.scrollTo({ top: 0 });

    if (targetTab === "dashboard") renderDashboard();
    if (targetTab === "finance") loadFinance();
    if (targetTab === "referrals") loadPOReferrals(userPickedReferralBatch ? selectedReferralPoId : null);
    if (targetTab === "stocks") loadStocks();
    if (targetTab === "preorder") loadPOSettings();
    if (targetTab === "reports") renderDailyReport();
    if (targetTab === "whatsapp") loadWaWorkspace();
    if (targetTab === "settings") {
        loadSettings();
        loadSkuHppSettings();
        if (!isInvestorRole()) {
            loadInvestorAccountSettings();
        }
    }
}

adminTabs.forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
});

if (goToOrdersBtn) {
    goToOrdersBtn.addEventListener("click", () => switchTab("orders"));
}

/* =========================
   LOGIN & LOGOUT
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
            currentAdminRole = result.role || "admin";
            currentAdminUsername = result.username || username || "Admin";
            applyRolePermissionsUI();
            showDashboardView();
            bootWorkspace();

        } catch (error) {
            console.error("Login error:", error);
            loginError.innerText = "Gagal terhubung ke server.";
        } finally {
            loginSubmit.disabled = false;
            loginSubmit.innerText = "Masuk ke Ruang Kerja";
        }
    });
}

function doLogout() {
    clearToken();
    currentAdminRole = "admin";
    currentAdminUsername = "Admin";
    applyRolePermissionsUI();
    allOrders = [];
    currentFinanceReport = null;
    skuHppCatalogCache = [...DEFAULT_SKU_HPP_CATALOG];
    selectedViewPoId = null;
    if (typeof closePODeleteModal === "function") closePODeleteModal(true);
    else poDeleteTarget = null;
    referralReportCache = null;
    selectedReferralPoId = null;
    userPickedReferralBatch = false;
    proofLoadPromises.clear();
    showLoginView();
}

if (logoutBtn) logoutBtn.addEventListener("click", doLogout);

function bootWorkspace() {
    applyRolePermissionsUI();
    initPeriodFilterControls();
    switchTab("dashboard");
    loadSkuHppSettings();
    loadOrders();
    loadStocks();
    loadPOSettings();
    loadWaWorkspace({ silent: true });
}

/* =========================
   FETCH & RENDER ORDERS
   ========================= */

async function loadOrders() {
    if (tableLoading) tableLoading.hidden = false;
    if (tableEmpty) tableEmpty.hidden = true;
    if (ordersTbody) ordersTbody.innerHTML = "";

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
            if (tableLoading) tableLoading.hidden = true;
            if (tableEmpty) {
                tableEmpty.hidden = false;
                tableEmpty.innerText = result.message || "Gagal memuat pesanan.";
            }
            return;
        }

        allOrders = result.orders || [];
        renderSummary();
        renderCustomerInsights();
        applyFilters();
        renderOverviewRecentOrders();
        renderDailyReport();
        renderDashboard();
        if (allStocks.length) renderStocks(allStocks);
        if (poStatusCache) renderPOPage();
        if (document.querySelector('[data-tab-content="finance"]:not([hidden])')) loadFinance();

    } catch (error) {
        console.error("Load orders error:", error);
        if (tableLoading) tableLoading.hidden = true;
        if (tableEmpty) {
            tableEmpty.hidden = false;
            tableEmpty.innerText = "Gagal terhubung ke server.";
        }
    }
}

function renderSummary() {
    const paidOrders = allOrders.filter(isPaidOrder);
    const successOnlyOrders = allOrders.filter((o) => (o.status || "pending") === "success");
    const finishedOrders = allOrders.filter((o) => o.status === "finished");
    const pendingOrders = allOrders.filter((o) => (o.status || "pending") === "pending");
    const expiredOrders = allOrders.filter((o) => o.status === "expired");
    const failedOrders = allOrders.filter((o) => o.status === "failed");

    const metricsSuccess = getMetrics(paidOrders);
    const metricsAll = getMetrics(allOrders);

    const todayWIB = getTodayDateString();
    const todayOrders = paidOrders.filter((o) => getLocalDateString(o.createdAt) === todayWIB).length;

    if (summaryTotalOrders) summaryTotalOrders.innerText = metricsSuccess.orders;
    if (summaryTotalRevenue) summaryTotalRevenue.innerText = formatRupiah(metricsSuccess.revenue);
    if (summaryTodayOrders) summaryTodayOrders.innerText = todayOrders;
    if (summaryTotalPcs) summaryTotalPcs.innerText = `${metricsSuccess.items} pcs`;

    const avgPcs = metricsSuccess.orders > 0
        ? (metricsSuccess.items / metricsSuccess.orders).toFixed(1).replace(".0", "")
        : 0;
    if (summaryAvgPcs) summaryAvgPcs.innerText = `Rata-rata ${avgPcs} cookies per pesanan`;
    if (summaryRevenueSub) summaryRevenueSub.innerText = `Nilai ${metricsSuccess.orders} pesanan sukses`;

    if (sidebarOrdersBadge) sidebarOrdersBadge.innerText = pendingOrders.length || allOrders.length;
    if (overviewOrdersCountBadge) overviewOrdersCountBadge.innerText = `${allOrders.length} pesanan`;
    if (overviewPendingSubtitle) {
        overviewPendingSubtitle.innerText = `Kelola pesanan masuk. Ada ${pendingOrders.length} pesanan menunggu konfirmasi.`;
    }

    if (ordersCardTotal) ordersCardTotal.innerText = allOrders.length;
    if (ordersCardTotalSub) ordersCardTotalSub.innerText = `${metricsAll.items} cookies · Nilai ${formatRupiah(metricsAll.revenue)}`;
    if (ordersCardPending) ordersCardPending.innerText = pendingOrders.length;

    const claimedCount = pendingOrders.filter((o) => o.customerConfirmed === true).length;
    if (ordersCardPendingSub) {
        ordersCardPendingSub.innerText = claimedCount > 0
            ? `${claimedCount} pelanggan klaim sudah bayar`
            : "Periksa konfirmasi pelanggan";
    }

    if (ordersCardSuccess) ordersCardSuccess.innerText = successOnlyOrders.length;
    if (ordersCardFinished) ordersCardFinished.innerText = finishedOrders.length;
    const verifyCountEl = document.getElementById("orders-card-verify");
    if (verifyCountEl) verifyCountEl.innerText = pendingOrders.filter(isAwaitingVerification).length;
    if (ordersCardReview) ordersCardReview.innerText = expiredOrders.length + failedOrders.length;
    if (ordersCardReviewSub) {
        ordersCardReviewSub.innerText = `${expiredOrders.length} kedaluwarsa · ${failedOrders.length} gagal`;
    }
    if (ordersListSubtitle) {
        ordersListSubtitle.innerText = `${allOrders.length} total pesanan · ${pendingOrders.length} menunggu konfirmasi`;
    }
}

function hasOrderProof(o) {
    return Boolean(o && (o.hasPaymentProof || o.paymentProofUrl));
}

function isAwaitingVerification(o) {
    return (o.status || "pending") === "pending" && Boolean(hasOrderProof(o) || o.customerConfirmed);
}

document.querySelectorAll("[data-quick-status]").forEach((card) => {
    card.addEventListener("click", () => {
        if (!statusFilter) return;
        statusFilter.value = card.dataset.quickStatus;
        document.querySelectorAll("[data-quick-status]").forEach((c) => c.classList.toggle("active", c === card));
        currentOrderPage = 1;
        applyFilters();
    });
});

/* =========================
   DASHBOARD (FIGMA)
   ========================= */

let waMetricsCache = {};

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
}

function getStockReservedMap() {
    const map = {};
    allOrders.forEach((o) => {
        if ((o.status || "pending") !== "pending") return;
        (o.items || []).forEach((it) => {
            const key = `${it.productId || ""}||${it.addonName || ""}`;
            map[key] = (map[key] || 0) + (it.quantity || 0);
        });
    });
    return map;
}

function getReservedForStock(item, reservedMap) {
    return reservedMap[`${item.productId || ""}||${item.addonName || ""}`] || 0;
}

function getLowStockItems() {
    return allStocks.filter((s) => (s.stock || 0) <= 5);
}

function getCurrentYearString() {
    const p = getWIBParts(new Date());
    return p ? String(p.year) : String(new Date().getFullYear());
}

function getPreviousMonthString(ym) {
    if (!ym || !/^\d{4}-\d{2}$/.test(ym)) return "";
    const [yStr, mStr] = ym.split("-");
    let y = parseInt(yStr, 10);
    let m = parseInt(mStr, 10) - 1;
    if (m <= 0) {
        m = 12;
        y -= 1;
    }
    return `${y}-${String(m).padStart(2, "0")}`;
}

function formatMonthLabelID(ym) {
    if (!ym || !/^\d{4}-\d{2}$/.test(ym)) return ym || "-";
    const [y, m] = ym.split("-").map(Number);
    const d = new Date(Date.UTC(y, m - 1, 1, 12, 0, 0));
    return d.toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta", month: "long", year: "numeric" });
}

function collectAvailableYears(extraYears = []) {
    const set = new Set([getCurrentYearString()]);
    allOrders.forEach((o) => {
        const ds = getLocalDateString(o.createdAt);
        if (ds && ds.length >= 4) set.add(ds.slice(0, 4));
    });
    (extraYears || []).forEach((y) => {
        if (y) set.add(String(y));
    });
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
}

function syncYearSelectOptions(selectEl, extraYears = []) {
    if (!selectEl) return;
    const years = collectAvailableYears(extraYears);
    const prev = selectEl.value;
    selectEl.innerHTML = years.map((y) => `<option value="${y}">${y}</option>`).join("");
    if (prev && years.includes(prev)) {
        selectEl.value = prev;
    } else if (years.length > 0) {
        selectEl.value = years[0];
    }
}

function toggleDashPeriodInputs() {
    document.querySelectorAll("#dash-period-tabs [data-dash-period]").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.dashPeriod === dashPeriodMode);
    });
    if (dashDateInput) dashDateInput.hidden = dashPeriodMode !== "day";
    if (dashMonthInput) dashMonthInput.hidden = dashPeriodMode !== "month";
    if (dashYearSelect) dashYearSelect.hidden = dashPeriodMode !== "year";
}

function toggleFinancePeriodInputs() {
    document.querySelectorAll("#finance-period-tabs [data-fin-period]").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.finPeriod === financePeriodMode);
    });
    if (financeDateInput) financeDateInput.hidden = financePeriodMode !== "day";
    if (financeMonthInput) financeMonthInput.hidden = financePeriodMode !== "month";
    if (financeYearSelect) financeYearSelect.hidden = financePeriodMode !== "year";
}

function initPeriodFilterControls() {
    if (dashDateInput && !dashDateInput.value) dashDateInput.value = getTodayDateString();
    if (dashMonthInput && !dashMonthInput.value) dashMonthInput.value = getCurrentMonthString();
    syncYearSelectOptions(dashYearSelect);
    toggleDashPeriodInputs();

    if (financeDateInput && !financeDateInput.value) financeDateInput.value = getTodayDateString();
    if (financeMonthInput && !financeMonthInput.value) financeMonthInput.value = getCurrentMonthString();
    syncYearSelectOptions(financeYearSelect);
    toggleFinancePeriodInputs();
}

function computeClientSalesAnalytics(ordersList, catalog) {
    const skuSource = Array.isArray(catalog) && catalog.length ? catalog : DEFAULT_SKU_HPP_CATALOG;
    const vMap = new Map();
    const byNameMap = new Map();

    skuSource.forEach((sku, idx) => {
        const pid = String(sku.productId || "").trim().toLowerCase();
        const addon = String(sku.addonName || "").trim();
        const key = `${pid}||${addon}`;
        const sellPrice = Number(sku.sellPrice || 0);
        const hppUnit = Math.max(0, Number(sku.hppUnit || 0));
        const entry = {
            _idx: idx,
            isCanonical: true,
            productId: pid,
            addonName: addon,
            skuKey: addon ? `${pid}||${addon}` : pid,
            displayName: sku.displayName || pid,
            sellPrice,
            hppUnit,
            profitUnit: sellPrice - hppUnit,
            qty: 0,
            totalRevenue: 0,
            totalHpp: 0,
            totalProfit: 0,
            marginPct: 0,
            sharePct: 0,
            _orderIds: new Set()
        };
        vMap.set(key, entry);
        byNameMap.set(String(entry.displayName).trim().toLowerCase(), entry);
    });

    let paidOrdersCount = 0;
    let paidOrderTotalSum = 0;
    let qrisRevenue = 0;
    let codRevenue = 0;
    let nextExtraIdx = vMap.size;

    (ordersList || []).forEach((order) => {
        const oId = order.orderId || order.id || Math.random();
        const oTotal = Number(order.total || 0);
        paidOrdersCount += 1;
        paidOrderTotalSum += oTotal;
        if ((order.paymentMethod || "cash") === "qris") qrisRevenue += oTotal;
        else codRevenue += oTotal;

        (order.items || []).forEach((it) => {
            const qty = Number(it.quantity || 0);
            if (qty <= 0) return;
            const pid = String(it.productId || "").trim().toLowerCase();
            const addon = String(it.addonName || "").trim();
            const pName = String(it.name || pid).trim();
            const displayNm = addon ? `${pName} (+ ${addon})` : pName;
            const unitSell = Number(it.price || 0) + Number(it.addonPrice || 0);
            const subtotal = it.subtotal != null ? Number(it.subtotal) : unitSell * qty;

            let key = `${pid}||${addon}`;
            let entry = vMap.get(key) || byNameMap.get(displayNm.toLowerCase());
            if (!entry) {
                key = `${pid || pName.toLowerCase()}||${addon}`;
                entry = vMap.get(key);
            }
            if (!entry) {
                entry = {
                    _idx: nextExtraIdx++,
                    isCanonical: false,
                    productId: pid || pName.toLowerCase(),
                    addonName: addon,
                    skuKey: addon ? `${pid || pName}||${addon}` : (pid || pName),
                    displayName: displayNm || "-",
                    sellPrice: unitSell,
                    hppUnit: 0,
                    profitUnit: unitSell,
                    qty: 0,
                    totalRevenue: 0,
                    totalHpp: 0,
                    totalProfit: 0,
                    marginPct: 0,
                    sharePct: 0,
                    _orderIds: new Set()
                };
                vMap.set(key, entry);
            }
            entry.qty += qty;
            entry.totalRevenue += subtotal;
            entry._orderIds.add(oId);
        });
    });

    let totalPcs = 0;
    let generalRevenue = 0;
    let generalHpp = 0;
    const allVariants = Array.from(vMap.values()).map((entry) => {
        const totalHpp = entry.qty * entry.hppUnit;
        const totalProfit = entry.totalRevenue - totalHpp;
        const marginPct = entry.totalRevenue > 0
            ? Math.round((totalProfit / entry.totalRevenue) * 1000) / 10
            : (entry.sellPrice > 0 ? Math.round((entry.profitUnit / entry.sellPrice) * 1000) / 10 : 0);
        totalPcs += entry.qty;
        generalRevenue += entry.totalRevenue;
        generalHpp += totalHpp;
        return {
            productId: entry.productId,
            addonName: entry.addonName,
            skuKey: entry.skuKey,
            displayName: entry.displayName,
            sellPrice: entry.sellPrice,
            hppUnit: entry.hppUnit,
            profitUnit: entry.profitUnit,
            qty: entry.qty,
            orderCount: entry._orderIds.size,
            totalRevenue: entry.totalRevenue,
            totalHpp,
            totalProfit,
            marginPct,
            sharePct: 0,
            _idx: entry._idx,
            _isCanonical: entry.isCanonical
        };
    });

    if (generalRevenue === 0 && paidOrderTotalSum > 0) {
        generalRevenue = paidOrderTotalSum;
    }

    const generalProfit = generalRevenue - generalHpp;
    const generalMarginPct = generalRevenue > 0 ? Math.round((generalProfit / generalRevenue) * 1000) / 10 : 0;

    allVariants.forEach((v) => {
        v.sharePct = totalPcs > 0 ? Math.round((v.qty / totalPcs) * 1000) / 10 : 0;
    });

    const soldVariants = allVariants.filter((v) => v.qty > 0);
    const canonicalVariants = allVariants.filter((v) => v._isCanonical);
    const poolLeast = canonicalVariants.length ? canonicalVariants : allVariants;

    const bestSeller = soldVariants.length
        ? soldVariants.reduce((best, cur) => {
            if (cur.qty !== best.qty) return cur.qty > best.qty ? cur : best;
            if (cur.totalRevenue !== best.totalRevenue) return cur.totalRevenue > best.totalRevenue ? cur : best;
            return cur._idx < best._idx ? cur : best;
        }, soldVariants[0])
        : null;

    const leastSeller = soldVariants.length && poolLeast.length
        ? poolLeast.reduce((least, cur) => {
            if (cur.qty !== least.qty) return cur.qty < least.qty ? cur : least;
            if (cur.totalRevenue !== least.totalRevenue) return cur.totalRevenue < least.totalRevenue ? cur : least;
            return cur._idx < least._idx ? cur : least;
        }, poolLeast[0])
        : null;

    const leastSellerSold = soldVariants.length
        ? soldVariants.reduce((least, cur) => {
            if (cur.qty !== least.qty) return cur.qty < least.qty ? cur : least;
            if (cur.totalRevenue !== least.totalRevenue) return cur.totalRevenue < least.totalRevenue ? cur : least;
            return cur._idx < least._idx ? cur : least;
        }, soldVariants[0])
        : null;

    const zeroSalesVariants = soldVariants.length
        ? poolLeast.filter((v) => v.qty === 0).map((v) => v.displayName)
        : [];

    const bestKey = bestSeller ? bestSeller.skuKey : null;
    const leastKey = leastSeller ? leastSeller.skuKey : null;

    const variants = allVariants
        .slice()
        .sort((a, b) => (b.qty - a.qty) || (b.totalRevenue - a.totalRevenue) || (a._idx - b._idx))
        .map((v) => ({
            ...v,
            isBestSeller: Boolean(bestKey && v.skuKey === bestKey),
            isLeastSeller: Boolean(leastKey && v.skuKey === leastKey && (!bestKey || leastKey !== bestKey))
        }));

    return {
        generalRevenue,
        generalHpp,
        generalProfit,
        generalMarginPct,
        totalPcs,
        paidOrdersCount,
        qrisRevenue,
        codRevenue,
        bestSeller,
        leastSeller,
        leastSellerSold,
        zeroSalesVariants,
        variants
    };
}

function renderVariantHighlightPair(prefix, data, emptyLabel = "Belum ada penjualan") {
    const best = data?.bestSeller || null;
    const least = data?.leastSeller || null;
    const leastSold = data?.leastSellerSold || null;
    const zeroList = Array.isArray(data?.zeroSalesVariants) ? data.zeroSalesVariants : [];

    if (best) {
        setText(`${prefix}-best-variant-name`, best.displayName);
        setText(`${prefix}-best-variant-meta`, `${best.qty} pcs terjual · Omzet ${formatRupiah(best.totalRevenue)} · Profit ${formatRupiah(best.totalProfit)}`);
        if (document.getElementById(`${prefix}-best-variant-profit`)) {
            setText(`${prefix}-best-variant-profit`, `Profit ${formatRupiah(best.totalProfit)} (${best.marginPct}%)`);
        }
    } else {
        setText(`${prefix}-best-variant-name`, emptyLabel);
        setText(`${prefix}-best-variant-meta`, "0 pcs terjual · Omzet Rp 0");
        if (document.getElementById(`${prefix}-best-variant-profit`)) {
            setText(`${prefix}-best-variant-profit`, "Profit Rp 0");
        }
    }

    if (least) {
        let leastName = least.displayName;
        let leastMeta = `${least.qty} pcs terjual · Omzet ${formatRupiah(least.totalRevenue)} · Profit ${formatRupiah(least.totalProfit)}`;
        let leastProfitText = `Profit ${formatRupiah(least.totalProfit)}`;

        if (least.qty === 0) {
            if (zeroList.length > 1) {
                leastName = `${zeroList.length} varian belum terjual`;
                leastMeta = zeroList.join(", ");
            } else {
                leastMeta = `0 pcs terjual · Belum ada pembelian`;
            }
            if (leastSold && leastSold.skuKey !== best?.skuKey) {
                leastProfitText = `Terendah laku: ${leastSold.displayName} (${leastSold.qty} pcs)`;
            } else {
                leastProfitText = zeroList.length ? "Belum terjual pada periode ini" : leastProfitText;
            }
        }
        setText(`${prefix}-least-variant-name`, leastName);
        setText(`${prefix}-least-variant-meta`, leastMeta);
        if (document.getElementById(`${prefix}-least-variant-profit`)) {
            setText(`${prefix}-least-variant-profit`, leastProfitText);
        }
    } else {
        setText(`${prefix}-least-variant-name`, emptyLabel);
        setText(`${prefix}-least-variant-meta`, "0 pcs terjual · Omzet Rp 0");
        if (document.getElementById(`${prefix}-least-variant-profit`)) {
            setText(`${prefix}-least-variant-profit`, "Profit Rp 0");
        }
    }
}

function renderDashboard() {
    syncYearSelectOptions(dashYearSelect);
    toggleDashPeriodInputs();

    const todayWIB = getTodayDateString();
    const curMonthWIB = getCurrentMonthString();
    const curYearWIB = getCurrentYearString();

    const paidOrdersAll = allOrders.filter(isPaidOrder);
    const pendingOrders = allOrders.filter((o) => (o.status || "pending") === "pending");
    const verifyOrders = pendingOrders.filter(isAwaitingVerification);

    let periodVal = todayWIB;
    let prevVal = getDateStringOffset(todayWIB, -1);
    let periodLabel = "HARI INI";
    let periodDesc = "hari ini";
    let matchFn = (o, val) => getLocalDateString(o.createdAt) === val;

    if (dashPeriodMode === "month") {
        periodVal = (dashMonthInput && dashMonthInput.value) || curMonthWIB;
        if (dashMonthInput) dashMonthInput.value = periodVal;
        prevVal = getPreviousMonthString(periodVal);
        periodLabel = `BULAN (${formatMonthLabelID(periodVal).toUpperCase()})`;
        periodDesc = formatMonthLabelID(periodVal);
        matchFn = (o, val) => getLocalDateString(o.createdAt).startsWith(val);
    } else if (dashPeriodMode === "year") {
        periodVal = (dashYearSelect && dashYearSelect.value) || curYearWIB;
        if (dashYearSelect) dashYearSelect.value = periodVal;
        prevVal = String(Number(periodVal) - 1);
        periodLabel = `TAHUN ${periodVal}`;
        periodDesc = `Tahun ${periodVal}`;
        matchFn = (o, val) => getLocalDateString(o.createdAt).startsWith(val + "-");
    } else {
        periodVal = (dashDateInput && dashDateInput.value) || todayWIB;
        if (dashDateInput) dashDateInput.value = periodVal;
        prevVal = getDateStringOffset(periodVal, -1);
        periodLabel = periodVal === todayWIB ? "HARI INI" : formatDateShort(periodVal).toUpperCase();
        periodDesc = periodVal === todayWIB ? "hari ini" : formatDateShort(periodVal);
        matchFn = (o, val) => getLocalDateString(o.createdAt) === val;
    }

    const periodPaidOrders = paidOrdersAll.filter((o) => matchFn(o, periodVal));
    const prevPaidOrders = prevVal ? paidOrdersAll.filter((o) => matchFn(o, prevVal)) : [];

    const periodAnalytics = computeClientSalesAnalytics(periodPaidOrders, skuHppCatalogCache);
    const prevMetrics = getMetrics(prevPaidOrders);
    const allMetrics = getMetrics(paidOrdersAll);

    setText("dashboard-date-subtitle", `Periode: ${periodDesc} · ${pendingOrders.length} pesanan menunggu tindakan`);

    setText("dash-rev-label", `OMZET PENJUALAN ${periodLabel}`);
    setText("dash-today-revenue", formatRupiah(periodAnalytics.generalRevenue));
    renderDelta(document.getElementById("dash-today-rev-delta"), periodAnalytics.generalRevenue, prevMetrics.revenue);
    setText("dash-today-rev-sub", `Dari ${periodAnalytics.paidOrdersCount} pesanan terbayar · total semua waktu ${formatRupiah(allMetrics.revenue)}`);

    setText("dash-profit-label", `PROFIT & HPP (${periodLabel})`);
    setText("dash-period-profit", formatRupiah(periodAnalytics.generalProfit));
    setText("dash-period-margin-pill", `Margin ${periodAnalytics.generalMarginPct}%`);
    setText("dash-period-hpp-sub", `General HPP ${formatRupiah(periodAnalytics.generalHpp)} · ${periodAnalytics.paidOrdersCount} pesanan`);

    setText("dash-active-orders", String(pendingOrders.length + periodAnalytics.paidOrdersCount));
    setText("dash-pending-pill", `${pendingOrders.length} menunggu`);
    setText("dash-active-orders-sub", `${periodAnalytics.paidOrdersCount} terbayar (${periodDesc}) · ${verifyOrders.length} menunggu verifikasi`);

    setText("dash-pcs-label", `PCS TERJUAL (${periodLabel})`);
    setText("dash-today-pcs", `${periodAnalytics.totalPcs} pcs`);
    const avg = periodAnalytics.paidOrdersCount ? (periodAnalytics.totalPcs / periodAnalytics.paidOrdersCount).toFixed(1).replace(".0", "") : 0;
    setText("dash-avg-pcs", `${periodAnalytics.paidOrdersCount} pesanan · rata-rata ${avg} pcs/pesanan`);

    const needsHuman = Number(waMetricsCache.needsHumanCount || 0);
    const lowStocks = getLowStockItems();
    setText("dash-action-count", String(verifyOrders.length + needsHuman + lowStocks.length));
    setText("dash-action-sub", `${verifyOrders.length} bukti bayar · ${needsHuman} chat · ${lowStocks.length} stok rendah`);

    setText("dash-q-verify-badge", `${verifyOrders.length} menunggu`);
    setText("dash-q-verify-desc", verifyOrders.length
        ? `${verifyOrders.slice(0, 3).map((o) => o.orderId).join(", ")}${verifyOrders.length > 3 ? " dan lainnya" : ""} menunggu dicocokkan dengan mutasi.`
        : "Belum ada kiriman struk baru yang menunggu verifikasi.");
    setText("dash-q-wa-badge", `${needsHuman} chat`);
    setText("dash-q-wa-desc", needsHuman
        ? `${needsHuman} percakapan diserahkan ke admin dan menunggu balasan manual.`
        : "Semua percakapan pelanggan ditangani oleh AI Bot.");
    setText("dash-q-stock-badge", lowStocks.length ? `${lowStocks.length} SKU` : "Aman");
    setText("dash-q-stock-desc", lowStocks.length
        ? lowStocks.map((s) => `${s.displayName} (${s.stock} pcs)`).join(", ")
        : "Seluruh SKU memiliki stok cukup untuk dipesan.");

    renderVariantHighlightPair("dash", periodAnalytics, `Belum ada penjualan (${periodDesc})`);
    renderDashboardChart(periodVal);
    renderDashboardPOCard();
    renderDashboardStockList();
}

function renderDashboardChart(selectedVal) {
    const chartEl = document.getElementById("dash-chart-7day");
    if (!chartEl) return;

    const bars = [];
    let totalOrdersCount = 0;
    let totalPcsCount = 0;
    let totalRev = 0;

    if (dashPeriodMode === "year") {
        const yr = selectedVal || (dashYearSelect?.value || getCurrentYearString());
        const monthShort = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
        setText("dash-chart-title", `Tren penjualan Tahun ${yr}`);
        setText("dash-chart-subtitle", "Omzet bulanan & total pcs terjual (klik bulan untuk melihat detail dashboard bulan tersebut)");
        setText("dash-chart-total-label", `TOTAL TAHUN ${yr}`);
        setText("dash-chart-avg-label", "RATA-RATA BULANAN");
        chartEl.classList.add("dash-chart-wide");

        for (let m = 1; m <= 12; m++) {
            const ym = `${yr}-${String(m).padStart(2, "0")}`;
            const mData = getMetrics(allOrders.filter((o) => isPaidOrder(o) && getLocalDateString(o.createdAt).startsWith(ym)));
            bars.push({ key: ym, label: monthShort[m - 1], clickType: "month", ...mData });
        }
    } else if (dashPeriodMode === "month") {
        const ym = selectedVal || (dashMonthInput?.value || getCurrentMonthString());
        const [y, m] = ym.split("-").map(Number);
        const daysInMonth = (y && m) ? new Date(y, m, 0).getDate() : 30;
        setText("dash-chart-title", `Tren harian — ${formatMonthLabelID(ym)}`);
        setText("dash-chart-subtitle", "Omzet harian dalam bulan terpilih (klik batang untuk melihat laporan harian)");
        setText("dash-chart-total-label", "TOTAL BULAN INI");
        setText("dash-chart-avg-label", "RATA-RATA HARIAN");
        chartEl.classList.add("dash-chart-wide");

        for (let d = 1; d <= daysInMonth; d++) {
            const ds = `${ym}-${String(d).padStart(2, "0")}`;
            const mData = getMetrics(allOrders.filter((o) => isPaidOrder(o) && getLocalDateString(o.createdAt) === ds));
            bars.push({ key: ds, label: String(d), clickType: "date", ...mData });
        }
    } else {
        const anchor = selectedVal || (dashDateInput?.value || getTodayDateString());
        setText("dash-chart-title", "Penjualan 7 hari terakhir");
        setText("dash-chart-subtitle", "Omzet harian dan jumlah pesanan terbayar (klik batang untuk rincian laporan)");
        setText("dash-chart-total-label", "TOTAL 7 HARI");
        setText("dash-chart-avg-label", "RATA-RATA HARIAN");
        chartEl.classList.remove("dash-chart-wide");

        for (let i = 6; i >= 0; i--) {
            const dateStr = getDateStringOffset(anchor, -i);
            const mData = getMetrics(allOrders.filter((o) => isPaidOrder(o) && getLocalDateString(o.createdAt) === dateStr));
            const [, mm, dd] = dateStr.split("-");
            bars.push({ key: dateStr, label: `${dd}/${mm}`, isActive: dateStr === anchor, clickType: "date", ...mData });
        }
    }

    const maxRev = Math.max(...bars.map((d) => d.revenue), 1);
    const maxPcs = Math.max(...bars.map((d) => d.items), 1);

    chartEl.innerHTML = bars.map((d) => {
        totalRev += d.revenue;
        totalOrdersCount += d.orders;
        totalPcsCount += d.items;
        return `
            <div class="chart-bar-wrap ${d.isActive ? "is-active" : ""}" data-bar-type="${d.clickType}" data-bar-key="${d.key}" title="${d.key} · ${formatRupiah(d.revenue)} · ${d.orders} pesanan · ${d.items} pcs">
                <span class="chart-bar-value">${d.orders > 0 ? d.orders : ""}</span>
                <div class="chart-bar-pair">
                    <div class="chart-bar bar-rev" style="height:${Math.max((d.revenue / maxRev) * 100, d.revenue > 0 ? 6 : 2)}%;"></div>
                    <div class="chart-bar bar-pcs" style="height:${Math.max((d.items / maxPcs) * 100, d.items > 0 ? 6 : 2)}%;"></div>
                </div>
                <span class="chart-bar-label">${d.label}</span>
            </div>
        `;
    }).join("");

    chartEl.querySelectorAll(".chart-bar-wrap").forEach((bar) => {
        bar.addEventListener("click", () => {
            if (bar.dataset.barType === "month") {
                dashPeriodMode = "month";
                if (dashMonthInput) dashMonthInput.value = bar.dataset.barKey;
                renderDashboard();
            } else {
                if (reportDateInput) reportDateInput.value = bar.dataset.barKey;
                switchTab("reports");
            }
        });
    });

    const divisor = bars.length || 1;
    setText("dash-7d-total-rev", formatRupiah(totalRev));
    setText("dash-7d-avg-rev", formatRupiah(Math.round(totalRev / divisor)));
    setText("dash-7d-total-orders", `${totalOrdersCount} pesanan`);
    setText("dash-7d-total-pcs", `${totalPcsCount} pcs`);
}

function getPOBatchOrders(poId) {
    if (!poId) return [];
    return allOrders.filter((o) => String(o.poPeriodId) === String(poId) && ["pending", "success", "finished"].includes(o.status || "pending"));
}

function renderDashboardPOCard() {
    const po = currentPOData;
    const isOpen = poStatusCache ? poStatusCache.isOpen === true : false;
    const pill = document.getElementById("dash-po-status-pill");
    if (pill) {
        pill.innerText = po ? (isOpen ? "Dibuka" : "Ditutup") : "Belum ada batch";
        pill.className = `badge-pill ${isOpen ? "badge-green" : "badge-neutral"}`;
    }
    setText("dash-po-batch-code", po ? `Batch #${po.batchNumber || po.id}` : "Batch PO");
    setText("dash-po-title", po ? po.batchName : "Belum ada batch pre-order");

    const orders = po ? getPOBatchOrders(po.id) : [];
    const pcs = orders.reduce((s, o) => s + getOrderTotalCookies(o), 0);
    const quota = po ? Number(po.maxQuota || 100) : 100;
    const pct = quota > 0 ? Math.min(Math.round((pcs / quota) * 100), 100) : 0;
    setText("dash-po-quota-text", `${pcs} / ${quota} pcs (${pct}%)`);
    const bar = document.getElementById("dash-po-quota-bar");
    if (bar) bar.style.width = `${pct}%`;

    const closeD = po && parseISOString(po.tanggalTutup);
    const closeP = closeD ? getWIBParts(closeD) : null;
    setText("dash-po-close-date", po?.tanggalTutup ? formatDateShort(getLocalDateString(po.tanggalTutup)) : "-");
    setText("dash-po-close-time", closeP ? `${closeP.hour}:${closeP.minute} WIB` : "WIB");
    setText("dash-po-prod-date", po?.tanggalProduksi ? formatDateShort(getLocalDateString(po.tanggalProduksi)) : "-");

    const locList = document.getElementById("dash-po-loc-list");
    if (locList) {
        const locs = [["sman1", "SMAN 1 Karawang"], ["sman5", "SMAN 5 Karawang"], ["others", "Pengiriman luar"]];
        locList.innerHTML = locs.map(([key, label]) => {
            const lo = orders.filter((o) => (key === "others" ? !["sman1", "sman5"].includes(o.location) : o.location === key));
            const lpcs = lo.reduce((s, o) => s + getOrderTotalCookies(o), 0);
            return `<div class="meta-kv-row"><span>${label}</span><strong>${lo.length} pesanan · ${lpcs} pcs</strong></div>`;
        }).join("");
    }
}

function getStockStatus(stock) {
    if (stock <= 0) return { key: "out", label: "Habis" };
    if (stock <= 5) return { key: "low", label: "Stok rendah" };
    return { key: "available", label: "Tersedia" };
}

function renderDashboardStockList() {
    const listEl = document.getElementById("dash-stock-list");
    if (!listEl) return;
    if (!allStocks.length) {
        listEl.innerHTML = `<p class="empty-state-sm">Belum ada data stok.</p>`;
        return;
    }
    listEl.innerHTML = allStocks.map((s) => {
        const st = getStockStatus(s.stock || 0);
        return `
            <div class="dash-stock-row">
                <span class="dash-stock-name">${escapeHtml(s.displayName || s.productId)}</span>
                <strong class="stocks-count ${st.key === "available" ? "" : st.key}">${s.stock} pcs</strong>
                <span class="stocks-badge ${st.key}">${st.label}</span>
            </div>
        `;
    }).join("");
}

function bindClick(id, handler) {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", handler);
}

document.querySelectorAll("#dash-period-tabs [data-dash-period]").forEach((btn) => {
    btn.addEventListener("click", () => {
        dashPeriodMode = btn.dataset.dashPeriod || "day";
        initPeriodFilterControls();
        renderDashboard();
    });
});
if (dashDateInput) dashDateInput.addEventListener("change", renderDashboard);
if (dashMonthInput) dashMonthInput.addEventListener("change", renderDashboard);
if (dashYearSelect) dashYearSelect.addEventListener("change", renderDashboard);

bindClick("dash-queue-verify", () => { switchTab("whatsapp"); switchWaSubtab("verification"); });
bindClick("dash-queue-wa", () => { switchTab("whatsapp"); setWaInboxFilter("needs_human"); switchWaSubtab("inbox"); });
bindClick("dash-queue-stock", () => { currentStockFilter = "low"; switchTab("stocks"); });
bindClick("dash-go-po-btn", () => switchTab("preorder"));
bindClick("dash-go-stocks-btn", () => switchTab("stocks"));
bindClick("dash-export-btn", () => {
    if (dashPeriodMode === "day") {
        if (reportDateInput) reportDateInput.value = dashDateInput?.value || getTodayDateString();
        exportDailyCSV();
    } else if (dashPeriodMode === "month") {
        exportFinanceExcel("month", dashMonthInput?.value || getCurrentMonthString());
    } else {
        exportFinanceExcel("year", dashYearSelect?.value || getCurrentYearString());
    }
});

/* =========================
   CUSTOMER INSIGHTS
   ========================= */

function renderCustomerInsights() {
    if (!insightTotalCustomers) return;

    const successOrders = allOrders.filter(isPaidOrder);
    const customerMap = {};

    successOrders.forEach((order) => {
        const wa = normalizeWA(order.whatsapp);
        if (!wa) return;
        if (!customerMap[wa]) customerMap[wa] = { orderCount: 0, totalSpent: 0 };
        customerMap[wa].orderCount += 1;
        customerMap[wa].totalSpent += order.total || 0;
    });

    const customers = Object.values(customerMap);
    const totalCustomers = customers.length;
    const repeatCustomers = customers.filter((c) => c.orderCount > 1).length;
    const repeatRate = totalCustomers > 0 ? Math.round((repeatCustomers / totalCustomers) * 100) : 0;

    let newOrdersCount = 0;
    let oldOrdersCount = 0;
    successOrders.forEach((order) => {
        const type = getCustomerType(order);
        if (type === "baru") newOrdersCount += 1;
        else oldOrdersCount += 1;
    });

    const totalOrdersCount = newOrdersCount + oldOrdersCount;
    const newPercent = totalOrdersCount > 0 ? Math.round((newOrdersCount / totalOrdersCount) * 100) : 0;
    const oldPercent = totalOrdersCount > 0 ? 100 - newPercent : 0;

    insightTotalCustomers.innerText = totalCustomers;
    insightRepeatRate.innerText = repeatRate + "%";

    if (insightBarNew) insightBarNew.style.width = `${totalOrdersCount > 0 ? newPercent : 50}%`;
    if (insightBarOld) insightBarOld.style.width = `${totalOrdersCount > 0 ? oldPercent : 50}%`;

    if (totalCustomers === 0) {
        insightRepeatDetail.innerText = "Belum ada data";
    } else {
        insightRepeatDetail.innerHTML =
            `<strong>${repeatCustomers}</strong> dari ${totalCustomers} customer order &gt;1x`;
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
   FILTERS & PAGINATION
   ========================= */

function applyFilters() {
    const query = (searchInput?.value || "").trim().toLowerCase();
    const locFilter = locationFilter?.value || "all";
    const statFilter = statusFilter?.value || "all";
    const dateVal = dateFilter?.value || "";

    if (clearDateBtn) clearDateBtn.hidden = !dateVal;

    let filtered = allOrders;

    if (dateVal) {
        filtered = filtered.filter((o) => getLocalDateString(o.createdAt) === dateVal);
    }

    if (locFilter !== "all") {
        filtered = filtered.filter((o) => o.location === locFilter);
    }

    if (statFilter === "awaiting_verification") {
        filtered = filtered.filter(isAwaitingVerification);
    } else if (statFilter === "review") {
        filtered = filtered.filter((o) => o.status === "expired" || o.status === "failed");
    } else if (statFilter !== "all") {
        filtered = filtered.filter((o) => (o.status || "pending") === statFilter);
    }

    const payFilter = document.getElementById("payment-filter")?.value || "all";
    if (payFilter !== "all") {
        filtered = filtered.filter((o) => (o.paymentMethod || "cash") === payFilter);
    }

    if (query) {
        filtered = filtered.filter((order) => {
            const name = (order.customerName || "").toLowerCase();
            const wa = (order.whatsapp || "").toLowerCase();
            const orderId = (order.orderId || "").toLowerCase();
            const refCode = (order.referralCode || "").toLowerCase();
            const items = (order.items || []).map((it) => `${it.name} ${it.addonName || ""}`).join(" ").toLowerCase();
            return name.includes(query) || wa.includes(query) || orderId.includes(query) || refCode.includes(query) || items.includes(query);
        });
    }

    filteredOrdersList = filtered;
    const totalPages = Math.max(1, Math.ceil(filteredOrdersList.length / ORDERS_PER_PAGE));
    if (currentOrderPage > totalPages) currentOrderPage = 1;

    renderOrders(filteredOrdersList);
}

if (searchInput) searchInput.addEventListener("input", () => { currentOrderPage = 1; applyFilters(); });
if (locationFilter) locationFilter.addEventListener("change", () => { currentOrderPage = 1; applyFilters(); });
if (statusFilter) statusFilter.addEventListener("change", () => { currentOrderPage = 1; applyFilters(); });
if (dateFilter) dateFilter.addEventListener("change", () => { currentOrderPage = 1; applyFilters(); });
if (clearDateBtn) {
    clearDateBtn.addEventListener("click", () => {
        if (dateFilter) dateFilter.value = "";
        currentOrderPage = 1;
        applyFilters();
    });
}
if (refreshBtn) refreshBtn.addEventListener("click", () => { loadOrders(); if (poStatusCache) loadPOReferrals(selectedReferralPoId); });
if (overviewRefreshBtn) overviewRefreshBtn.addEventListener("click", () => { loadOrders(); loadStocks(); loadPOSettings(); loadPOReferrals(userPickedReferralBatch ? selectedReferralPoId : null); loadWaWorkspace({ silent: true }); });

const paymentFilterEl = document.getElementById("payment-filter");
if (paymentFilterEl) paymentFilterEl.addEventListener("change", () => { currentOrderPage = 1; applyFilters(); });

const ordersResetFilterBtn = document.getElementById("orders-reset-filter-btn");
if (ordersResetFilterBtn) {
    ordersResetFilterBtn.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        if (locationFilter) locationFilter.value = "all";
        if (paymentFilterEl) paymentFilterEl.value = "all";
        if (dateFilter) dateFilter.value = "";
        if (statusFilter) statusFilter.value = "all";
        document.querySelectorAll("[data-quick-status]").forEach((c) => c.classList.toggle("active", c.dataset.quickStatus === "all"));
        currentOrderPage = 1;
        applyFilters();
    });
}

const globalSearchInput = document.getElementById("global-search-input");
if (globalSearchInput) {
    const runGlobalSearch = () => {
        if (searchInput) searchInput.value = globalSearchInput.value;
        currentOrderPage = 1;
        switchTab("orders");
        applyFilters();
    };
    globalSearchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); runGlobalSearch(); }
    });
    globalSearchInput.addEventListener("search", runGlobalSearch);
}

function getOrderItemsSummary(order) {
    const items = order.items || [];
    if (items.length === 0) return "-";
    return items.map((it) => `${it.quantity}x ${it.name}${it.addonName ? " + " + it.addonName : ""}`).join(", ");
}

function getPaymentStatusSub(order) {
    const statusVal = order.status || "pending";
    if (statusVal === "finished") return { text: "Lunas · Finish", cls: "" };
    if (statusVal === "success") return { text: "Lunas", cls: "" };
    if (statusVal === "pending" && hasOrderProof(order)) return { text: "Bukti terunggah", cls: "claimed" };
    if (statusVal === "pending" && order.customerConfirmed) return { text: "Klaim sudah bayar", cls: "claimed" };
    if (statusVal === "pending") return { text: "Belum lunas", cls: "" };
    return { text: "-", cls: "" };
}

function getOrderStatusBadgeHtml(order) {
    if (isAwaitingVerification(order)) {
        return `<span class="status-badge status-pending">Perlu verifikasi</span>`;
    }
    const statusVal = order.status || "pending";
    return `<span class="status-badge ${getStatusClass(statusVal)}">${getStatusLabel(statusVal)}</span>`;
}

function getOrderBatchBadgeHtml(order) {
    const batchNum = order?.poBatchNumber || order?.poPeriodId;
    if (!batchNum) return "";
    const titleAttr = order?.poBatchName ? ` title="${escapeHtml(order.poBatchName)}"` : "";
    return `<span class="batch-pill-inline"${titleAttr}>Batch #${escapeHtml(String(batchNum))}</span>`;
}

function buildOrderRowHtml(order, isOverviewTable = false) {
    const locLabel = getLocationLabel(order.location);
    const locClass = getLocationClass(order.location);
    const custType = getCustomerType(order);
    const paymentLabel = (order.paymentMethod || "cash") === "qris" ? "QRIS" : "COD";
    const pcsCount = getOrderTotalCookies(order);
    const paySub = getPaymentStatusSub(order);
    const itemsText = escapeHtml(getOrderItemsSummary(order));
    const batchBadge = getOrderBatchBadgeHtml(order);
    const detailBtn = `<button type="button" class="btn-detail" data-order-id="${escapeHtml(order.orderId)}">Detail &rarr;</button>`;

    if (isOverviewTable) {
        return `
            <tr>
                <td>
                    <span class="cell-order-id">${escapeHtml(order.orderId || "-")}</span>
                    ${batchBadge ? `<div>${batchBadge}</div>` : ""}
                </td>
                <td><span class="customer-name">${escapeHtml(order.customerName || "-")}</span></td>
                <td><span class="cell-items-text">${itemsText}</span></td>
                <td><span class="location-badge ${locClass}">${escapeHtml(locLabel)}</span></td>
                <td>${paymentLabel}</td>
                <td class="align-right"><span class="cell-total-amount">${formatRupiah(order.total || 0)}</span></td>
                <td>${getOrderStatusBadgeHtml(order)}</td>
                <td class="align-right">${detailBtn}</td>
            </tr>
        `;
    }

    return `
        <tr>
            <td>
                <span class="cell-order-id">${escapeHtml(order.orderId || "-")}</span>
                ${batchBadge ? `<div>${batchBadge}</div>` : ""}
            </td>
            <td><span class="cell-order-date">${formatDate(order.createdAt)}</span></td>
            <td>
                <div class="cell-customer">
                    <span class="customer-name">${escapeHtml(order.customerName || "-")}</span>
                    <span class="customer-badge ${custType}">${custType === "baru" ? "Baru" : "Lama"}</span>
                    ${order.referralCode ? `<span class="badge-pill badge-gold ref-pill-inline">Ref: ${escapeHtml(order.referralCode)}</span>` : ""}
                </div>
                <span class="location-subtext">${escapeHtml(order.whatsapp || "-")}</span>
            </td>
            <td>
                <span class="cell-items-text">${itemsText}</span>
                <span class="cell-total-pcs">${pcsCount} pcs</span>
            </td>
            <td>
                <span class="location-badge ${locClass}">${escapeHtml(locLabel)}</span>
                ${order.locationDetail ? `<span class="location-subtext">${escapeHtml(order.locationDetail)}</span>` : ""}
            </td>
            <td>
                <span class="payment-cell-title">${paymentLabel}</span>
                <span class="payment-cell-sub ${paySub.cls}">${paySub.text}</span>
            </td>
            <td class="align-right"><span class="cell-total-amount">${formatRupiah(order.total || 0)}</span></td>
            <td>${getOrderStatusBadgeHtml(order)}</td>
            <td class="align-right">${detailBtn}</td>
        </tr>
    `;
}

function renderOverviewRecentOrders() {
    if (!overviewRecentTbody) return;
    const recent = allOrders.slice(0, 6);
    if (recent.length === 0) {
        overviewRecentTbody.innerHTML = `<tr><td colspan="8" class="empty-state-sm">Belum ada pesanan.</td></tr>`;
        return;
    }
    overviewRecentTbody.innerHTML = recent.map((o) => buildOrderRowHtml(o, true)).join("");
    overviewRecentTbody.querySelectorAll(".btn-detail").forEach((btn) => {
        btn.addEventListener("click", () => openOrderDetailPage(btn.dataset.orderId));
    });
}

function renderOrders(orders) {
    if (tableLoading) tableLoading.hidden = true;

    if (!orders || orders.length === 0) {
        if (ordersTbody) ordersTbody.innerHTML = "";
        if (tableEmpty) {
            tableEmpty.hidden = false;
            tableEmpty.innerText = allOrders.length ? "Tidak ada pesanan yang cocok dengan filter." : "Belum ada pesanan.";
        }
        if (ordersPaginationInfo) ordersPaginationInfo.innerText = "Menampilkan 0 pesanan";
        if (ordersPaginationBtns) ordersPaginationBtns.innerHTML = "";
        return;
    }

    if (tableEmpty) tableEmpty.hidden = true;

    const totalItems = orders.length;
    const totalPages = Math.ceil(totalItems / ORDERS_PER_PAGE);
    const startIdx = (currentOrderPage - 1) * ORDERS_PER_PAGE;
    const pageOrders = orders.slice(startIdx, startIdx + ORDERS_PER_PAGE);

    ordersTbody.innerHTML = pageOrders.map((o) => buildOrderRowHtml(o, false)).join("");

    ordersTbody.querySelectorAll(".btn-detail").forEach((btn) => {
        btn.addEventListener("click", () => openOrderDetailPage(btn.dataset.orderId));
    });

    if (ordersPaginationInfo) {
        const endNum = Math.min(startIdx + ORDERS_PER_PAGE, totalItems);
        ordersPaginationInfo.innerText = `Menampilkan ${startIdx + 1}-${endNum} dari ${totalItems} pesanan`;
    }

    if (ordersPaginationBtns) {
        let pHtml = `<button type="button" class="page-btn" data-page="${currentOrderPage - 1}" ${currentOrderPage <= 1 ? "disabled" : ""}>Sebelumnya</button>`;
        for (let p = 1; p <= totalPages; p++) {
            if (totalPages <= 6 || p === 1 || p === totalPages || Math.abs(p - currentOrderPage) <= 1) {
                pHtml += `<button type="button" class="page-btn ${p === currentOrderPage ? "active" : ""}" data-page="${p}">${p}</button>`;
            }
        }
        pHtml += `<button type="button" class="page-btn" data-page="${currentOrderPage + 1}" ${currentOrderPage >= totalPages ? "disabled" : ""}>Berikutnya</button>`;
        ordersPaginationBtns.innerHTML = pHtml;

        ordersPaginationBtns.querySelectorAll(".page-btn").forEach((b) => {
            b.addEventListener("click", () => {
                const targetPage = Number(b.dataset.page);
                if (targetPage >= 1 && targetPage <= totalPages) {
                    currentOrderPage = targetPage;
                    renderOrders(orders);
                }
            });
        });
    }
}

/* =========================
   DETAIL PESANAN (FULL SUB-VIEW)
   ========================= */

const orderDetailContainer = document.getElementById("order-detail-full-container");

function getDetailNavList() {
    return filteredOrdersList.length ? filteredOrdersList : allOrders;
}

function openOrderDetailPage(orderId) {
    const order = allOrders.find((o) => o.orderId === orderId);
    if (!order) return;
    selectedInlineOrderId = orderId;
    renderOrderDetailPage(order);
    switchTab("order-detail");
    if (hasOrderProof(order) && !order.paymentProofUrl) {
        ensureOrderProofLoaded(order.orderId);
    }
}

function buildOrderTimelineHtml(order) {
    const steps = [{ label: "Pesanan dibuat", time: order.createdAt, done: true }];
    if (order.customerConfirmed || hasOrderProof(order)) {
        steps.push({ label: hasOrderProof(order) ? "Bukti pembayaran diunggah" : "Pelanggan klaim sudah bayar", time: order.customerConfirmedAt, done: true });
    }
    if (order.status === "finished") {
        steps.push({ label: "Pembayaran diverifikasi (Lunas)", time: order.paidAt, done: true });
        steps.push({ label: "Pesanan selesai & terkunci (Finish)", time: order.finishedAt || order.paidAt, done: true });
    } else if (order.status === "success") {
        steps.push({ label: "Pembayaran diverifikasi (Lunas)", time: order.paidAt, done: true });
    } else if (order.status === "expired") {
        steps.push({ label: "Pesanan kedaluwarsa", time: order.expiredAt, done: true });
    } else if (order.status === "failed") {
        steps.push({ label: "Pesanan gagal / dibatalkan", time: null, done: true });
    } else {
        steps.push({ label: "Menunggu verifikasi admin", time: null, done: false });
    }

    return steps.map((s) => `
        <div class="timeline-row ${s.done ? "is-done" : "is-pending"}">
            <span class="timeline-dot"></span>
            <div>
                <strong>${escapeHtml(s.label)}</strong>
                <span class="text-muted-sm">${s.time ? formatDate(s.time) + " WIB" : "-"}</span>
            </div>
        </div>
    `).join("");
}

function renderOrderDetailPage(order) {
    if (!orderDetailContainer || !order) return;

    const statusVal = order.status || "pending";
    const custType = getCustomerType(order);
    const paymentLabel = (order.paymentMethod || "cash") === "qris" ? "QRIS" : "Tunai / COD";
    const pcs = getOrderTotalCookies(order);
    const rules = order.paymentRules || {};
    const oid = escapeHtml(order.orderId);

    const itemsRows = (order.items || []).map((item) => `
        <tr>
            <td>
                <strong>${escapeHtml(item.name)}</strong>
                ${item.addonName ? `<span class="location-subtext">+ ${escapeHtml(item.addonName)}</span>` : ""}
            </td>
            <td class="align-right">${item.quantity}</td>
            <td class="align-right">${formatRupiah(item.price || 0)}</td>
            <td class="align-right"><strong>${formatRupiah(item.subtotal || (item.price * item.quantity))}</strong></td>
        </tr>
    `).join("");

    const actionButtons = [];
    if (isInvestorRole()) {
        actionButtons.push(`<span class="locked-order-pill">Mode Investor (Hanya Lihat Data)</span>`);
    } else if (statusVal === "finished") {
        actionButtons.push(`<span class="locked-order-pill">Pesanan Finish (Terkunci Permanen)</span>`);
        actionButtons.push(`<a class="btn-outline" href="https://wa.me/${normalizeWA(order.whatsapp)}" target="_blank" rel="noopener">Hubungi WA</a>`);
    } else {
        if (statusVal === "success") {
            actionButtons.push(`<button type="button" class="btn-finish detail-action-btn" data-action="finish">Tandai Finish</button>`);
        } else {
            actionButtons.push(`<button type="button" class="btn-primary detail-action-btn" data-action="approve">Terima pembayaran</button>`);
        }
        if (statusVal === "pending" && (hasOrderProof(order) || order.customerConfirmed)) {
            actionButtons.push(`<button type="button" class="btn-outline btn-danger-outline detail-action-btn" data-action="reject">Tolak bukti</button>`);
        }
        if (statusVal === "pending") {
            actionButtons.push(`<button type="button" class="btn-outline detail-action-btn" data-action="expired">Tandai kedaluwarsa</button>`);
        }
        if (statusVal !== "pending") {
            actionButtons.push(`<button type="button" class="btn-outline detail-action-btn" data-action="pending">Kembalikan ke pending</button>`);
        }
        actionButtons.push(`<a class="btn-outline" href="https://wa.me/${normalizeWA(order.whatsapp)}" target="_blank" rel="noopener">Hubungi WA</a>`);
        actionButtons.push(`<button type="button" class="btn-outline btn-danger-outline detail-action-btn" data-action="delete">Hapus</button>`);
    }

    orderDetailContainer.innerHTML = `
        <div class="page-header">
            <div>
                <div class="page-title-row">
                    <h1 class="page-title">${oid}</h1>
                    ${getOrderStatusBadgeHtml(order)}
                    ${getOrderBatchBadgeHtml(order)}
                </div>
                <p class="page-subtitle">Dibuat ${formatDate(order.createdAt)} WIB · ${pcs} pcs · ${paymentLabel}${order.poBatchName ? ` · ${escapeHtml(order.poBatchName)}` : ""}</p>
            </div>
            <div class="page-header-actions">${actionButtons.join("")}</div>
        </div>

        <div class="order-detail-layout-grid">
            <div class="order-detail-main-col">
                <div class="surface-card">
                    <div class="card-header-row">
                        <div>
                            <h2 class="card-title">Item pesanan</h2>
                            <p class="card-subtitle">${pcs} pcs dalam pesanan ini</p>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="clean-table">
                            <thead>
                                <tr>
                                    <th>PRODUK</th>
                                    <th class="align-right">QTY</th>
                                    <th class="align-right">HARGA</th>
                                    <th class="align-right">SUBTOTAL</th>
                                </tr>
                            </thead>
                            <tbody>${itemsRows || `<tr><td colspan="4" class="empty-state-sm">Tidak ada item.</td></tr>`}</tbody>
                        </table>
                    </div>
                    <div class="inline-total-row">
                        <span>Total tagihan</span>
                        <strong>${formatRupiah(order.total || 0)}</strong>
                    </div>
                    ${rules.requiresDp50 ? `<div class="meta-kv-row"><span>Syarat DP 50% COD</span><strong>${formatRupiah(rules.dpRequiredAmount || 0)}</strong></div>` : ""}
                </div>

                <div class="surface-card mt-20">
                    <div class="card-header-row">
                        <div>
                            <h2 class="card-title">Bukti pembayaran &amp; analisis AI Vision</h2>
                            <p class="card-subtitle">Bandingkan nominal di struk dengan total tagihan sebelum menerima pembayaran</p>
                        </div>
                    </div>
                    ${buildAdminReceiptAnalysisBoxHtml(order, false)}
                </div>
            </div>

            <div class="order-detail-side-col">
                <div class="surface-card">
                    <h2 class="card-title">Pelanggan &amp; lokasi</h2>
                    <div class="meta-kv-row mt-12"><span>Nama</span><strong>${escapeHtml(order.customerName || "-")}</strong></div>
                    <div class="meta-kv-row"><span>Tipe</span><strong>${custType === "baru" ? "Pelanggan baru" : "Pelanggan lama"}</strong></div>
                    <div class="meta-kv-row"><span>WhatsApp</span><strong>${escapeHtml(order.whatsapp || "-")}</strong></div>
                    <div class="meta-kv-row"><span>Lokasi</span><strong>${escapeHtml(getLocationLabel(order.location))}</strong></div>
                    <div class="meta-kv-row"><span>${order.location === "others" ? "Alamat" : "Kelas / detail"}</span><strong>${escapeHtml(order.locationDetail || "-")}</strong></div>
                    <div class="meta-kv-row"><span>Catatan</span><strong>${escapeHtml(order.note || "-")}</strong></div>
                    <div class="meta-kv-row"><span>Kode referral</span><strong>${order.referralCode ? `<span class="badge-pill badge-gold">${escapeHtml(order.referralCode)}</span>` : "-"}</strong></div>
                </div>

                <div class="surface-card mt-20">
                    <h2 class="card-title">Riwayat status</h2>
                    <div class="order-timeline mt-12">${buildOrderTimelineHtml(order)}</div>
                </div>
            </div>
        </div>
    `;

    orderDetailContainer.querySelectorAll(".detail-action-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {
            const action = btn.dataset.action;
            if (action === "finish") {
                openFinishOrderModal(order);
                return;
            }
            if (action === "approve") {
                if (hasOrderProof(order) || order.customerConfirmed) {
                    await verifyOrderProof(order.orderId, "approve", btn);
                } else {
                    await updateOrderStatus(order.orderId, "success", btn);
                }
            } else if (action === "reject") {
                const reason = prompt("Alasan penolakan bukti (dikirim ke WA pelanggan):", "Nominal belum sesuai atau foto struk kurang jelas");
                if (reason) await verifyOrderProof(order.orderId, "reject", btn, reason);
            } else if (action === "delete") {
                const deleted = await deleteOrder(order.orderId, btn);
                if (deleted) switchTab("orders");
                return;
            } else {
                await updateOrderStatus(order.orderId, action, btn);
            }
            const fresh = allOrders.find((o) => o.orderId === order.orderId);
            if (fresh) renderOrderDetailPage(fresh);
        });
    });

    const list = getDetailNavList();
    const idx = list.findIndex((o) => o.orderId === order.orderId);
    const prevBtn = document.getElementById("detail-prev-order-btn");
    const nextBtn = document.getElementById("detail-next-order-btn");
    if (prevBtn) prevBtn.disabled = idx <= 0;
    if (nextBtn) nextBtn.disabled = idx < 0 || idx >= list.length - 1;
}

const detailBackBtn = document.getElementById("detail-back-to-orders-btn");
if (detailBackBtn) detailBackBtn.addEventListener("click", () => switchTab("orders"));

function stepOrderDetail(delta) {
    const list = getDetailNavList();
    const idx = list.findIndex((o) => o.orderId === selectedInlineOrderId);
    const target = list[idx + delta];
    if (target) openOrderDetailPage(target.orderId);
}
const detailPrevBtn = document.getElementById("detail-prev-order-btn");
const detailNextBtn = document.getElementById("detail-next-order-btn");
if (detailPrevBtn) detailPrevBtn.addEventListener("click", () => stepOrderDetail(-1));
if (detailNextBtn) detailNextBtn.addEventListener("click", () => stepOrderDetail(1));

/* =========================
   ORDER MODAL (FALLBACK)
   ========================= */

function renderInlineOrderDetail() { /* digantikan halaman Detail pesanan */ }

function openOrderModal(order) {
    if (!order) return;

    let itemsHtml = "";
    (order.items || []).forEach((item) => {
        itemsHtml += `
            <div class="detail-item">
                <span class="item-name">
                    ${item.quantity}x ${escapeHtml(item.name)}
                    ${item.addonName ? `<span class="item-addon" style="display:block;font-size:11.5px;color:var(--gold-text);">+ ${escapeHtml(item.addonName)}</span>` : ""}
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
    const paymentMethod = order.paymentMethod || "cash";
    const paymentLabel = paymentMethod === "qris" ? "QRIS" : "Cash (COD)";
    const customerConfirmed = order.customerConfirmed === true;

    const locDetail = order.locationDetail
        ? `<div class="detail-row">
               <span class="label">${order.location === "others" ? "Alamat" : "Kelas / Alamat"}</span>
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

        <div class="detail-row">
            <span class="label">Metode</span>
            <span class="value">
                <span class="payment-badge payment-${paymentMethod}">${paymentLabel}</span>
            </span>
        </div>

        ${
            customerConfirmed
                ? `<div class="detail-row">
                       <span class="label">Konfirmasi</span>
                       <span class="value">
                           <span class="badge-pill badge-green">Customer klaim sudah bayar</span>
                       </span>
                   </div>`
                : ""
        }

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

        ${
            order.referralCode
                ? `<div class="detail-row">
                       <span class="label">Kode Referral</span>
                       <span class="value"><span class="badge-pill badge-gold">${escapeHtml(order.referralCode)}</span></span>
                   </div>`
                : ""
        }

        <div class="detail-items">
            <h4>Produk</h4>
            ${itemsHtml || "<p style='color:var(--text-muted);font-size:13px;'>-</p>"}
        </div>

        <div class="detail-total">
            <span>Total</span>
            <strong>${formatRupiah(order.total || 0)}</strong>
        </div>

        ${buildAdminReceiptAnalysisBoxHtml(order, true)}

        <div class="modal-actions">
            ${isInvestorRole() ? `
                <div class="locked-order-pill" style="justify-content:center;width:100%;">Mode Investor (Hanya Lihat Data)</div>
            ` : statusVal === "finished" ? `
                <div class="locked-order-pill" style="justify-content:center;width:100%;">Pesanan Finish (Terkunci Permanen)</div>
            ` : `
                <p class="mini-label" style="margin-bottom:4px;">Ubah Status</p>

                ${statusVal === "success"
                    ? `<button class="action-btn btn-finish" data-action="finish" data-order-id="${order.orderId}">Tandai Finish</button>`
                    : `<button class="action-btn success" data-action="success" data-order-id="${order.orderId}">Tandai Sukses</button>`}

                ${statusVal !== "pending"
                    ? `<button class="action-btn pending" data-action="pending" data-order-id="${order.orderId}">Tandai Pending</button>`
                    : ""}

                ${statusVal !== "expired"
                    ? `<button class="action-btn expired" data-action="expired" data-order-id="${order.orderId}">Tandai Expired</button>`
                    : ""}

                <button class="action-btn delete" data-action="delete" data-order-id="${order.orderId}">Hapus Pesanan</button>
            `}
        </div>
    `;

    orderModal.classList.add("active");
    if (hasOrderProof(order) && !order.paymentProofUrl) {
        ensureOrderProofLoaded(order.orderId);
    }

    orderModalBody.querySelectorAll(".action-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const action = btn.dataset.action;
            const orderId = btn.dataset.orderId;
            if (!action || !orderId) return;

            if (action === "finish") {
                openFinishOrderModal(order);
            } else if (action === "delete") {
                deleteOrder(orderId, btn);
            } else {
                updateOrderStatus(orderId, action, btn);
            }
        });
    });
}

function closeOrderModal() {
    if (orderModal) orderModal.classList.remove("active");
}

if (orderModalClose) orderModalClose.addEventListener("click", closeOrderModal);
if (orderModal) {
    orderModal.addEventListener("click", (e) => {
        if (e.target === orderModal) closeOrderModal();
    });
}

/* =========================
   FINISH ORDER CONFIRMATION MODAL
   ========================= */

let pendingFinishOrderTarget = null;

function openFinishOrderModal(order) {
    if (!order || !finishOrderModal) return;
    if ((order.status || "pending") !== "success") {
        alert("Hanya pesanan yang sudah berstatus Success (Lunas) yang dapat ditandai Finish.");
        return;
    }

    pendingFinishOrderTarget = order;
    const summaryEl = finishOrderSummaryBox || document.getElementById("finish-order-summary") || document.getElementById("finish-order-summary-box");
    if (summaryEl) {
        const pcsCount = getOrderTotalCookies(order);
        const itemsSummary = escapeHtml(getOrderItemsSummary(order));
        const locLabel = escapeHtml(getLocationLabel(order.location));
        const locDetail = order.locationDetail ? ` (${escapeHtml(order.locationDetail)})` : "";
        const payLabel = (order.paymentMethod || "cash") === "qris" ? "QRIS" : "COD / Tunai";
        summaryEl.innerHTML = `
            <div class="meta-kv-row"><span>ID Pesanan</span><strong>${escapeHtml(order.orderId || "-")}</strong></div>
            <div class="meta-kv-row"><span>Nama Pelanggan</span><strong>${escapeHtml(order.customerName || "-")} (${escapeHtml(order.whatsapp || "-")})</strong></div>
            <div class="meta-kv-row"><span>Item (${pcsCount} pcs)</span><strong>${itemsSummary}</strong></div>
            <div class="meta-kv-row"><span>Lokasi &amp; Metode</span><strong>${locLabel}${locDetail} · ${payLabel}</strong></div>
            <div class="meta-kv-row"><span>Total Tagihan</span><strong>${formatRupiah(order.total || 0)}</strong></div>
        `;
    }

    if (finishOrderSubmitBtn) {
        finishOrderSubmitBtn.disabled = false;
        finishOrderSubmitBtn.innerText = "Ya, Finish & Kunci Pesanan";
    }

    finishOrderModal.classList.add("active");
}

function closeFinishOrderModal() {
    pendingFinishOrderTarget = null;
    if (finishOrderModal) finishOrderModal.classList.remove("active");
}

if (finishOrderCloseBtn) finishOrderCloseBtn.addEventListener("click", closeFinishOrderModal);
if (finishOrderCancelBtn) finishOrderCancelBtn.addEventListener("click", closeFinishOrderModal);
if (finishOrderModal) {
    finishOrderModal.addEventListener("click", (e) => {
        if (e.target === finishOrderModal) closeFinishOrderModal();
    });
}
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && finishOrderModal && finishOrderModal.classList.contains("active")) {
        closeFinishOrderModal();
    }
});
if (finishOrderSubmitBtn) {
    finishOrderSubmitBtn.addEventListener("click", async () => {
        if (!pendingFinishOrderTarget) return;
        const targetOrderId = pendingFinishOrderTarget.orderId;
        const ok = await updateOrderStatus(targetOrderId, "finished", finishOrderSubmitBtn);
        if (ok) {
            closeFinishOrderModal();
            const fresh = allOrders.find((o) => o.orderId === targetOrderId);
            if (fresh && selectedInlineOrderId === targetOrderId) {
                renderOrderDetailPage(fresh);
            }
        }
    });
}

/* =========================
   UPDATE & DELETE ORDER
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
            if ((newStatus === "success" || newStatus === "finished") && !order.paidAt) {
                order.paidAt = new Date().toISOString();
            }
            if (newStatus === "finished" && !order.finishedAt) {
                order.finishedAt = new Date().toISOString();
            }
            if (newStatus === "expired" && !order.expiredAt) {
                order.expiredAt = new Date().toISOString();
            }
        }

        applyFilters();
        renderOverviewRecentOrders();
        renderSummary();
        renderCustomerInsights();
        renderDailyReport();
        renderDashboard();
        if (poStatusCache) renderPOPage();
        loadPOReferrals(selectedReferralPoId);
        if (newStatus !== "success" && newStatus !== "finished") loadStocks();

        btnEl.disabled = false;
        btnEl.innerText = "Berhasil";
        setTimeout(() => {
            closeOrderModal();
        }, 600);
        return true;

    } catch (error) {
        console.error("Update status error:", error);
        alert("Gagal terhubung ke server.");
        btnEl.disabled = false;
        btnEl.innerText = originalText;
        return false;
    }
}

async function deleteOrder(orderId, btnEl) {
    if (!orderId) return;

    const order = allOrders.find((o) => o.orderId === orderId);
    if (order && order.status === "finished") {
        alert(`Pesanan ${orderId} sudah berstatus FINISH (terkunci permanen) dan tidak dapat dihapus.`);
        return false;
    }
    const isPending = order && (order.status || "pending") === "pending";

    let confirmMsg = `Yakin ingin menghapus pesanan ${orderId}?`;
    if (isPending) {
        confirmMsg += `\n\nStok pesanan pending akan otomatis dikembalikan ke inventaris.`;
    }
    confirmMsg += `\n\nTindakan ini tidak dapat dibatalkan.`;

    if (!confirm(confirmMsg)) return;

    const originalText = btnEl.innerText;
    btnEl.disabled = true;
    btnEl.innerText = "Menghapus...";

    try {
        const response = await fetch(
            `${API_BASE}/api/admin/orders/${orderId}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${getToken()}`
                }
            }
        );

        if (response.status === 401) {
            clearToken();
            showLoginView();
            return;
        }

        const result = await response.json();

        if (!response.ok || !result.success) {
            alert(result.message || "Gagal menghapus pesanan.");
            btnEl.disabled = false;
            btnEl.innerText = originalText;
            return;
        }

        allOrders = allOrders.filter((o) => o.orderId !== orderId);

        closeOrderModal();
        applyFilters();
        renderOverviewRecentOrders();
        renderSummary();
        renderCustomerInsights();
        renderDailyReport();
        renderDashboard();
        if (poStatusCache) renderPOPage();
        loadPOReferrals(selectedReferralPoId);

        if (isPending) {
            loadStocks();
        }

        alert(`Pesanan ${orderId} berhasil dihapus.`);
        return true;

    } catch (error) {
        console.error("Delete order error:", error);
        alert("Gagal terhubung ke server.");
        btnEl.disabled = false;
        btnEl.innerText = originalText;
        return false;
    }
}

/* =========================
   BULK DELETE ORDERS
   ========================= */

function openBulkDeleteModal() {
    if (!bulkDeleteModal) return;
    if (bulkStatusSelect) bulkStatusSelect.value = "expired";
    if (bulkStartDate) bulkStartDate.value = "";
    if (bulkEndDate) bulkEndDate.value = "";
    updateBulkPreview();
    bulkDeleteModal.classList.add("active");
}

function closeBulkDeleteModal() {
    if (bulkDeleteModal) bulkDeleteModal.classList.remove("active");
}

function getMatchingBulkOrders() {
    const status = bulkStatusSelect?.value || "all";
    const start = bulkStartDate?.value || "";
    const end = bulkEndDate?.value || "";

    return allOrders.filter((order) => {
        if (order.status === "finished") return false;
        if (status !== "all") {
            const s = order.status || "pending";
            if (s !== status) return false;
        }

        const orderDateStr = getLocalDateString(order.createdAt);
        if (start && orderDateStr < start) return false;
        if (end && orderDateStr > end) return false;

        return true;
    });
}

function updateBulkPreview() {
    const matching = getMatchingBulkOrders();
    const count = matching.length;

    if (bulkPreviewCount) {
        bulkPreviewCount.innerText = `${count} pesanan`;
    }

    if (bulkDeleteSubmitBtn) {
        bulkDeleteSubmitBtn.disabled = count === 0;
    }

    if (bulkPreviewNote) {
        if (count === 0) {
            bulkPreviewNote.innerText = "Tidak ada pesanan yang sesuai dengan kriteria yang dipilih.";
        } else {
            const hasPending = matching.some((o) => (o.status || "pending") === "pending");
            if (hasPending) {
                bulkPreviewNote.innerHTML = `Perhatian: Termasuk pesanan berstatus <strong>pending</strong>. Stok pesanan pending akan otomatis dikembalikan ke inventaris.`;
            } else {
                bulkPreviewNote.innerText = "Stok untuk pesanan expired/success/failed tidak akan berubah.";
            }
        }
    }
}

async function executeBulkDelete() {
    const matching = getMatchingBulkOrders();
    const count = matching.length;

    if (count === 0) return;

    const status = bulkStatusSelect?.value || "all";
    const start = bulkStartDate?.value || "";
    const end = bulkEndDate?.value || "";

    let confirmMsg = `PERINGATAN!\n\nAnda akan menghapus ${count} pesanan secara permanen dari database.\n`;
    if (status !== "all") {
        confirmMsg += `• Status: ${status.toUpperCase()}\n`;
    }
    if (start || end) {
        confirmMsg += `• Rentang Tanggal: ${start || "Awal"} s/d ${end || "Sekarang"}\n`;
    }
    confirmMsg += `\nTindakan ini tidak dapat dibatalkan. Lanjutkan?`;

    if (!confirm(confirmMsg)) return;

    bulkDeleteSubmitBtn.disabled = true;
    bulkDeleteSubmitBtn.innerText = "Menghapus...";

    try {
        const response = await fetch(`${API_BASE}/api/admin/orders/bulk-delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                status: status,
                startDate: start,
                endDate: end
            })
        });

        if (response.status === 401) {
            clearToken();
            showLoginView();
            return;
        }

        const result = await response.json();

        if (!response.ok || !result.success) {
            alert(result.message || "Gagal menghapus pesanan.");
            bulkDeleteSubmitBtn.disabled = false;
            bulkDeleteSubmitBtn.innerText = "Hapus Pesanan";
            return;
        }

        closeBulkDeleteModal();

        alert(`Berhasil! ${result.deletedCount} pesanan telah dihapus.`);

        await loadOrders();
        loadStocks();
        loadPOReferrals(selectedReferralPoId);

    } catch (error) {
        console.error("Bulk delete error:", error);
        alert("Gagal terhubung ke server.");
    } finally {
        if (bulkDeleteSubmitBtn) {
            bulkDeleteSubmitBtn.disabled = false;
            bulkDeleteSubmitBtn.innerText = "Hapus Pesanan";
        }
    }
}

if (bulkDeleteOpenBtn) bulkDeleteOpenBtn.addEventListener("click", openBulkDeleteModal);
if (bulkDeleteCloseBtn) bulkDeleteCloseBtn.addEventListener("click", closeBulkDeleteModal);
if (bulkDeleteCancelBtn) bulkDeleteCancelBtn.addEventListener("click", closeBulkDeleteModal);
if (bulkDeleteModal) {
    bulkDeleteModal.addEventListener("click", (e) => {
        if (e.target === bulkDeleteModal) closeBulkDeleteModal();
    });
}
if (bulkStatusSelect) bulkStatusSelect.addEventListener("change", updateBulkPreview);
if (bulkStartDate) bulkStartDate.addEventListener("change", updateBulkPreview);
if (bulkEndDate) bulkEndDate.addEventListener("change", updateBulkPreview);
if (bulkDeleteSubmitBtn) bulkDeleteSubmitBtn.addEventListener("click", executeBulkDelete);

/* =========================
   DAILY REPORT & 7-DAY CHART
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
        if (reportTbody) reportTbody.innerHTML = "";
        if (overviewVariantBars) overviewVariantBars.innerHTML = "";
        if (reportLocationTbody) reportLocationTbody.innerHTML = "";
        if (reportEmpty) {
            reportEmpty.hidden = false;
            reportEmpty.innerText = "Pilih tanggal untuk melihat laporan.";
        }
        if (reportLocationEmpty) {
            reportLocationEmpty.hidden = false;
            reportLocationEmpty.innerText = "Pilih tanggal untuk melihat laporan.";
        }
        render7DayChart();
        return;
    }

    if (overviewLocationDateLabel) overviewLocationDateLabel.innerText = formatDateShort(selectedDate);

    const dayOrders = allOrders.filter(
        (order) =>
            getLocalDateString(order.createdAt) === selectedDate &&
            isPaidOrder(order)
    );

    const previousDate = getDateStringOffset(selectedDate, -1);
    const previousOrders = allOrders.filter(
        (order) =>
            getLocalDateString(order.createdAt) === previousDate &&
            isPaidOrder(order)
    );

    const currentMetrics = getMetrics(dayOrders);
    const previousMetrics = getMetrics(previousOrders);

    renderDelta(reportDeltaOrders, currentMetrics.orders, previousMetrics.orders);
    renderDelta(reportDeltaItems, currentMetrics.items, previousMetrics.items);
    renderDelta(reportDeltaRevenue, currentMetrics.revenue, previousMetrics.revenue);

    if (overviewVariantTotalPcs) overviewVariantTotalPcs.innerText = `${currentMetrics.items} pcs`;

    setText("report-aov-value", formatRupiah(currentMetrics.orders ? Math.round(currentMetrics.revenue / currentMetrics.orders) : 0));
    setText("report-aov-sub", `${currentMetrics.orders ? (currentMetrics.items / currentMetrics.orders).toFixed(1).replace(".0", "") : 0} pcs / pesanan`);

    if (dayOrders.length === 0) {
        reportTotalOrders.innerText = "0";
        reportTotalItems.innerText = "0";
        reportTotalRevenue.innerText = formatRupiah(0);
        if (reportTbody) reportTbody.innerHTML = "";
        if (overviewVariantBars) overviewVariantBars.innerHTML = "";
        if (reportLocationTbody) reportLocationTbody.innerHTML = "";
        if (reportEmpty) {
            reportEmpty.hidden = false;
            reportEmpty.innerText = "Belum ada order di tanggal ini.";
        }
        if (reportLocationEmpty) {
            reportLocationEmpty.hidden = false;
            reportLocationEmpty.innerText = "Belum ada order di tanggal ini.";
        }
        if (stripSman1Count) stripSman1Count.innerText = "0 pesanan";
        if (stripSman1Rev) stripSman1Rev.innerText = formatRupiah(0);
        if (stripSman5Count) stripSman5Count.innerText = "0 pesanan";
        if (stripSman5Rev) stripSman5Rev.innerText = formatRupiah(0);
        if (stripOthersCount) stripOthersCount.innerText = "0 pesanan";
        if (stripOthersRev) stripOthersRev.innerText = formatRupiah(0);
        render7DayChart();
        return;
    }

    if (reportEmpty) reportEmpty.hidden = true;
    if (reportLocationEmpty) reportLocationEmpty.hidden = true;

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
            const key = (item.productId || item.name) +
                        (item.addonName ? "||" + item.addonName : "");

            const displayName = item.addonName
                ? `${item.name} (+ ${item.addonName})`
                : item.name;

            const lineQty = item.quantity;
            const lineSubtotal = item.subtotal || (item.price * item.quantity);

            if (!variantMap[key]) {
                variantMap[key] = {
                    name: displayName,
                    qty: 0,
                    subtotal: 0
                };
            }
            variantMap[key].qty += lineQty;
            variantMap[key].subtotal += lineSubtotal;

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

    const s1 = locationMap["sman1"] || { count: 0, subtotal: 0 };
    const s5 = locationMap["sman5"] || { count: 0, subtotal: 0 };
    const ot = locationMap["others"] || { count: 0, subtotal: 0 };
    if (stripSman1Count) stripSman1Count.innerText = `${s1.count} pesanan`;
    if (stripSman1Rev) stripSman1Rev.innerText = formatRupiah(s1.subtotal);
    if (stripSman5Count) stripSman5Count.innerText = `${s5.count} pesanan`;
    if (stripSman5Rev) stripSman5Rev.innerText = formatRupiah(s5.subtotal);
    if (stripOthersCount) stripOthersCount.innerText = `${ot.count} pesanan`;
    if (stripOthersRev) stripOthersRev.innerText = formatRupiah(ot.subtotal);

    reportTotalOrders.innerText = currentMetrics.orders;
    reportTotalItems.innerText = currentMetrics.items;
    reportTotalRevenue.innerText = formatRupiah(currentMetrics.revenue);

    const variants = Object.values(variantMap).sort((a, b) => {
        if (b.qty !== a.qty) return b.qty - a.qty;
        return a.name.localeCompare(b.name);
    });

    const maxVarQty = Math.max(...variants.map((v) => v.qty), 1);
    if (overviewVariantBars) {
        overviewVariantBars.innerHTML = variants.map((v) => `
            <div class="variant-bar-item">
                <div class="variant-bar-top">
                    <strong>${escapeHtml(v.name)}</strong>
                    <span>${formatRupiah(v.subtotal)}</span>
                </div>
                <span class="variant-bar-sub">${v.qty} pcs</span>
                <div class="variant-bar-track">
                    <div class="variant-bar-fill" style="width:${Math.round((v.qty / maxVarQty) * 100)}%;"></div>
                </div>
            </div>
        `).join("");
    }

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
    if (reportTbody) reportTbody.innerHTML = html;

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

        locHtml += `
            <tr class="report-location-parent">
                <td>${escapeHtml(loc.label)}</td>
                <td class="align-right">${loc.count}</td>
                <td class="align-right">${formatRupiah(loc.subtotal)}</td>
            </tr>
        `;

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

    if (reportLocationTbody) reportLocationTbody.innerHTML = locHtml;

    render7DayChart();
}

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
                isPaidOrder(order)
        );
        const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
        days.push({ date: dateStr, count: orders.length, revenue });
    }

    const maxCount = Math.max(...days.map((d) => d.count), 1);
    let html = "";

    days.forEach((day) => {
        const heightPercent = (day.count / maxCount) * 100;
        const isActive = day.date === baseDate;

        const parts = day.date.split("-");
        const dayNum = parts[2];
        const monthNum = parts[1];

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
   EXPORT CSV (100% RESTORED)
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
        if (value === null || value === undefined) return '""';
        const str = String(value).replace(/"/g, '""');
        return `"${str}"`;
    }

    const groups = [
        {
            key: "sman1",
            title: "SMAN 1 KARAWANG",
            orders: dayOrders.filter((o) => o.location === "sman1")
        },
        {
            key: "sman5",
            title: "SMAN 5 KARAWANG",
            orders: dayOrders.filter((o) => o.location === "sman5")
        },
        {
            key: "others",
            title: "LAINNYA (PENGIRIMAN LUAR)",
            orders: dayOrders.filter((o) => o.location !== "sman1" && o.location !== "sman5")
        }
    ];

    groups.forEach((g) => {
        g.orders.sort((a, b) => {
            const locA = (a.locationDetail || "").toLowerCase();
            const locB = (b.locationDetail || "").toLowerCase();
            if (locA < locB) return -1;
            if (locA > locB) return 1;
            return (a.orderId || "").localeCompare(b.orderId || "");
        });
    });

    const headers = [
        "Order ID", "Tanggal", "Nama Customer", "Kelas / Detail",
        "WhatsApp", "Tipe Customer", "Metode", "Status",
        "Konfirmasi", "Catatan", "Produk", "Total (Rp)"
    ];

    const lines = [];

    lines.push([`LAPORAN PESANAN VELACOOKIES — TANGGAL ${selectedDate}`].map(csvCell).join(","));
    lines.push([`Total Pesanan: ${dayOrders.length} Pesanan`].map(csvCell).join(","));
    lines.push("");

    let grandTotalRevenue = 0;
    let grandTotalPcs = 0;

    groups.forEach((group) => {
        if (group.orders.length === 0) return;

        let groupTotal = 0;
        let groupPcs = 0;

        group.orders.forEach((o) => {
            groupTotal += (o.total || 0);
            (o.items || []).forEach((it) => {
                groupPcs += (it.quantity || 0);
            });
        });

        grandTotalRevenue += groupTotal;
        grandTotalPcs += groupPcs;

        lines.push([
            `=== LOKASI: ${group.title} (${group.orders.length} Pesanan | ${groupPcs} Pcs | Rp${groupTotal.toLocaleString("id-ID")}) ===`
        ].map(csvCell).join(","));

        lines.push(headers.map(csvCell).join(","));

        group.orders.forEach((order) => {
            const itemsText = (order.items || [])
                .map((item) => {
                    const addon = item.addonName ? ` + ${item.addonName}` : "";
                    return `${item.quantity}x ${item.name}${addon}`;
                })
                .join("; ");

            const custType = getCustomerType(order);
            const statusVal = order.status || "pending";
            const paymentMethod = order.paymentMethod === "qris" ? "QRIS" : "Cash (COD)";
            const confirmed = order.customerConfirmed === true ? "Ya" : "Belum";

            const row = [
                order.orderId || "",
                formatDate(order.createdAt),
                order.customerName || "",
                order.locationDetail || "-",
                order.whatsapp || "",
                custType === "baru" ? "Baru" : "Lama",
                paymentMethod,
                statusVal,
                confirmed,
                order.note || "",
                itemsText,
                order.total || 0
            ];

            lines.push(row.map(csvCell).join(","));
        });

        lines.push([
            `SUBTOTAL ${group.title}`, "", "", "", "", "", "", "", "", "",
            `${groupPcs} pcs`, groupTotal
        ].map(csvCell).join(","));

        lines.push("");
    });

    lines.push([
        "GRAND TOTAL KESELURUHAN", "", "", "", "", "", "", "", "", "",
        `${grandTotalPcs} pcs`, grandTotalRevenue
    ].map(csvCell).join(","));

    const BOM = "\uFEFF";
    const csvContent = BOM + lines.join("\r\n");

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
if (ordersExportCsvBtn) ordersExportCsvBtn.addEventListener("click", exportDailyCSV);

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
   STOCKS (INLINE + MODAL)
   ========================= */

async function loadStocks() {
    if (!stocksTbody) return;

    if (stocksLoading) stocksLoading.hidden = false;
    if (stocksEmpty) stocksEmpty.hidden = true;
    stocksTbody.innerHTML = "";

    try {
        const [stocksRes, historyRes] = await Promise.all([
            fetch(`${API_BASE}/api/admin/stocks`, { headers: { "Authorization": `Bearer ${getToken()}` } }),
            fetch(`${API_BASE}/api/admin/stocks/history?limit=15`, { headers: { "Authorization": `Bearer ${getToken()}` } })
        ]);

        if (stocksRes.status === 401) {
            clearToken();
            showLoginView();
            return;
        }

        const result = await stocksRes.json();
        const historyData = historyRes.ok ? await historyRes.json() : { items: [] };

        if (!stocksRes.ok || !result.success) {
            if (stocksLoading) stocksLoading.hidden = true;
            if (stocksEmpty) {
                stocksEmpty.hidden = false;
                stocksEmpty.innerText = result.message || "Gagal memuat stok.";
            }
            return;
        }

        allStocks = result.items || [];
        renderStocks(allStocks);
        renderStockHistory(historyData.items || []);

    } catch (error) {
        console.error("Load stocks error:", error);
        if (stocksLoading) stocksLoading.hidden = true;
        if (stocksEmpty) {
            stocksEmpty.hidden = false;
            stocksEmpty.innerText = "Gagal terhubung ke server.";
        }
    }
}

const SKU_PRICES = {
    "chocochip||": 12000,
    "biscoff||": 15000,
    "scoopable||": 28000,
    "scoopable||Strawberry + Extra Nutella": 36000,
    "nutella-tin||": 80000,
    "nutella-tin||Strawberry + Extra Nutella": 95000
};

function getSkuPrice(item) {
    const key = `${item.productId || ""}||${item.addonName || ""}`;
    if (SKU_PRICES[key]) return SKU_PRICES[key];
    if (item.productId === "nutella-tin") return item.addonName ? 95000 : 80000;
    if (item.productId === "scoopable") return item.addonName ? 36000 : 28000;
    if (item.productId === "biscoff") return 15000;
    return 12000;
}

function renderStocks(items) {
    if (!stocksTbody) return;
    if (stocksLoading) stocksLoading.hidden = true;

    const reservedMap = getStockReservedMap();
    let totalAvailPcs = 0;
    let totalReservedPcs = 0;
    let lowCount = 0;
    let outCount = 0;

    (items || []).forEach((it) => {
        const avail = Math.max(0, it.stock || 0);
        const resv = getReservedForStock(it, reservedMap);
        totalAvailPcs += avail;
        totalReservedPcs += resv;
        if (avail <= 0) outCount += 1;
        else if (avail <= 5) lowCount += 1;
    });

    const totalPhysical = totalAvailPcs + totalReservedPcs;
    if (stocksSummaryTotalPcs) stocksSummaryTotalPcs.innerText = `${totalAvailPcs} pcs`;
    if (stocksSummarySkuCount) stocksSummarySkuCount.innerText = (items || []).length;
    setText("stocks-summary-physical-pcs", `${totalPhysical} pcs`);
    setText("stocks-summary-reserved-sub", `${totalReservedPcs} pcs sedang direservasi pesanan pending`);
    if (stocksSummaryLowCount) stocksSummaryLowCount.innerText = `${lowCount + outCount} SKU`;
    if (stocksSummaryOutCount) stocksSummaryOutCount.innerText = `${outCount} habis · batas minimum 5 pcs`;

    if (stockAlertBanner && stockAlertText) {
        if (lowCount > 0 || outCount > 0) {
            stockAlertBanner.hidden = false;
            stockAlertText.innerText = `Perhatian: Ada ${outCount} SKU habis dan ${lowCount} SKU dengan stok terbatas (<= 5 pcs).`;
        } else {
            stockAlertBanner.hidden = true;
        }
    }

    document.querySelectorAll("#stocks-filter-pills [data-stock-filter]").forEach((btn) => {
        const f = btn.dataset.stockFilter;
        btn.classList.toggle("active", f === currentStockFilter);
        if (f === "all") btn.innerText = `Semua (${(items || []).length})`;
        if (f === "low") btn.innerText = `Stok rendah (${lowCount})`;
        if (f === "out") btn.innerText = `Habis (${outCount})`;
    });

    if (inlineStockSelect && items && items.length > 0) {
        const prevVal = inlineStockSelect.value;
        inlineStockSelect.innerHTML = items.map((it) =>
            `<option value="${it.id}" data-stock="${it.stock}">${escapeHtml(it.displayName)} (${it.stock} pcs)</option>`
        ).join("");
        if (prevVal && items.some((i) => String(i.id) === String(prevVal))) {
            inlineStockSelect.value = prevVal;
        }
        syncInlineStockForm();
    }

    const filteredItems = (items || []).filter((it) => {
        if (currentStockFilter === "low") return it.stock > 0 && it.stock <= 5;
        if (currentStockFilter === "out") return it.stock <= 0;
        return true;
    });

    if (filteredItems.length === 0) {
        if (stocksEmpty) stocksEmpty.hidden = false;
        stocksTbody.innerHTML = "";
        renderDashboardStockList();
        return;
    }

    if (stocksEmpty) stocksEmpty.hidden = true;

    stocksTbody.innerHTML = filteredItems.map((item) => {
        const avail = Math.max(0, item.stock || 0);
        const resv = getReservedForStock(item, reservedMap);
        const physical = avail + resv;
        const price = getSkuPrice(item);

        let statusKey = "available";
        let statusLabel = "Tersedia";
        let rowClass = "";

        if (avail <= 0) {
            statusKey = "out";
            statusLabel = "Habis";
            rowClass = "row-out";
        } else if (avail <= 5) {
            statusKey = "low";
            statusLabel = "Stok rendah";
            rowClass = "row-low";
        }

        const countClass = statusKey === "out" ? "out" : statusKey === "low" ? "low" : "";

        let productName = escapeHtml(item.displayName || item.productId);
        let addonText = "";
        if (item.addonName) {
            productName = escapeHtml((item.displayName || "").split(" (+ ")[0]);
            addonText = `<span class="stocks-product-addon">+ ${escapeHtml(item.addonName)}</span>`;
        }

        return `
            <tr class="${rowClass}">
                <td>
                    <span class="stocks-product-name">${productName}</span>
                    ${addonText}
                </td>
                <td class="align-right">${formatRupiah(price)}</td>
                <td class="align-right"><strong>${physical} pcs</strong></td>
                <td class="align-right">${resv} pcs</td>
                <td class="align-right"><span class="stocks-count ${countClass}">${avail} pcs</span></td>
                <td><span class="stocks-badge ${statusKey}">${statusLabel}</span></td>
                <td class="align-right">
                    ${isInvestorRole() ? `<span class="text-muted-sm">Hanya lihat</span>` : `
                        <button type="button" class="btn-stock-edit" data-id="${item.id}" data-name="${escapeHtml(item.displayName)}" data-stock="${avail}">
                            Sesuaikan
                        </button>
                    `}
                </td>
            </tr>
        `;
    }).join("");

    renderDashboardStockList();
}

document.querySelectorAll("#stocks-filter-pills [data-stock-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
        currentStockFilter = btn.dataset.stockFilter || "all";
        renderStocks(allStocks);
    });
});

function renderStockHistory(historyItems) {
    if (!stockHistoryTbody) return;
    if (!historyItems || historyItems.length === 0) {
        stockHistoryTbody.innerHTML = `<tr><td colspan="6" class="empty-state-sm">Belum ada riwayat perubahan stok.</td></tr>`;
        return;
    }

    const reasonMap = {
        order: "Pesanan baru",
        order_restored: "Stok kembali (Expired)",
        order_deleted: "Pesanan dihapus",
        bulk_order_deleted: "Hapus massal",
        po_batch_deleted: "Batch PO dihapus",
        restock: "Restock produksi",
        admin_adjust: "Koreksi admin"
    };

    stockHistoryTbody.innerHTML = historyItems.map((h) => {
        const sign = h.changeAmount > 0 ? `+${h.changeAmount}` : h.changeAmount;
        const colorClass = h.changeAmount > 0 ? "text-green" : "";
        const skuLabel = h.addonName ? `${h.productId} (+ ${h.addonName})` : h.productId;
        const refText = [h.orderId ? `#${h.orderId}` : "", h.note || ""].filter(Boolean).join(" · ") || "-";
        return `
            <tr>
                <td>${formatDate(h.createdAt)}</td>
                <td><strong>${escapeHtml(skuLabel)}</strong></td>
                <td>${escapeHtml(reasonMap[h.reason] || h.reason)}</td>
                <td class="align-right"><strong class="${colorClass}">${sign} pcs</strong></td>
                <td class="align-right">${h.stockAfter} pcs</td>
                <td>${escapeHtml(refText)}</td>
            </tr>
        `;
    }).join("");
}

function computeTargetStock(currentAvail) {
    const val = Math.max(0, parseInt(inlineStockInput?.value || "0", 10) || 0);
    if (stockAdjustMode === "add") return currentAvail + val;
    if (stockAdjustMode === "sub") return Math.max(0, currentAvail - val);
    return val;
}

function updateStockAfterPreview() {
    if (!inlineStockSelect) return;
    const selectedItem = allStocks.find((it) => String(it.id) === String(inlineStockSelect.value));
    const cur = selectedItem ? Math.max(0, selectedItem.stock || 0) : 0;
    const next = computeTargetStock(cur);
    setText("inline-stock-after-preview", `${cur} pcs -> ${next} pcs`);
}

function syncInlineStockForm() {
    if (!inlineStockSelect) return;
    const selectedItem = allStocks.find((it) => String(it.id) === String(inlineStockSelect.value));
    if (!selectedItem) return;
    const reservedMap = getStockReservedMap();
    const avail = Math.max(0, selectedItem.stock || 0);
    const resv = getReservedForStock(selectedItem, reservedMap);
    setText("inline-stock-physical", `${avail + resv} pcs`);
    setText("inline-stock-reserved", `${resv} pcs`);
    if (inlineStockCurrent) inlineStockCurrent.innerText = `${avail} pcs`;
    if (inlineStockInput) {
        inlineStockInput.value = stockAdjustMode === "set" ? avail : 10;
    }
    updateStockAfterPreview();
}

document.querySelectorAll("#inline-stock-mode-tabs [data-adjust-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
        stockAdjustMode = btn.dataset.adjustMode || "add";
        document.querySelectorAll("#inline-stock-mode-tabs [data-adjust-mode]").forEach((b) => b.classList.toggle("active", b === btn));
        setText("inline-stock-input-label", stockAdjustMode === "set" ? "Nilai stok tersedia baru (pcs)" : "Jumlah perubahan (pcs)");
        if (inlineStockReason) {
            inlineStockReason.value = stockAdjustMode === "add" ? "restock" : "admin_adjust";
        }
        syncInlineStockForm();
    });
});

if (inlineStockSelect) inlineStockSelect.addEventListener("change", syncInlineStockForm);
if (inlineStockInput) inlineStockInput.addEventListener("input", updateStockAfterPreview);
if (inlineStepMinus) {
    inlineStepMinus.addEventListener("click", () => {
        const v = parseInt(inlineStockInput.value || "0", 10);
        if (v > 0) inlineStockInput.value = v - 1;
        updateStockAfterPreview();
    });
}
if (inlineStepPlus) {
    inlineStepPlus.addEventListener("click", () => {
        const v = parseInt(inlineStockInput.value || "0", 10);
        inlineStockInput.value = v + 1;
        updateStockAfterPreview();
    });
}
bindClick("inline-stock-reset-btn", () => {
    if (inlineStockNote) inlineStockNote.value = "";
    syncInlineStockForm();
});

if (inlineStockForm) {
    inlineStockForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const stockId = inlineStockSelect.value;
        const selectedItem = allStocks.find((it) => String(it.id) === String(stockId));
        if (!selectedItem) return;
        const newStock = computeTargetStock(Math.max(0, selectedItem.stock || 0));
        const reason = inlineStockReason.value;
        const note = inlineStockNote.value.trim();

        if (!stockId || isNaN(newStock) || newStock < 0) return;

        inlineStockSubmit.disabled = true;
        inlineStockSubmit.innerText = "Menyimpan...";

        try {
            const response = await fetch(`${API_BASE}/api/admin/stocks/${stockId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify({ stock: newStock, reason, note: note || undefined })
            });

            const result = await response.json();
            if (!response.ok || !result.success) {
                if (inlineStockMsg) {
                    inlineStockMsg.innerText = result.message || "Gagal mengubah stok.";
                    inlineStockMsg.className = "settings-status error mt-8";
                }
                return;
            }

            inlineStockNote.value = "";
            if (inlineStockMsg) {
                inlineStockMsg.innerText = "Stok berhasil diperbarui.";
                inlineStockMsg.className = "settings-status success mt-8";
                setTimeout(() => { inlineStockMsg.innerText = ""; }, 3000);
            }
            loadStocks();

        } catch (err) {
            console.error("Inline stock update error:", err);
        } finally {
            inlineStockSubmit.disabled = false;
            inlineStockSubmit.innerText = "Simpan penyesuaian";
        }
    });
}

function openStockModal(stockId, displayName, currentStock) {
    if (!stockModal) return;
    if (stockModalId) stockModalId.value = stockId;
    if (stockModalProductName) stockModalProductName.innerText = displayName || "Produk";
    if (stockModalCurrentDisplay) stockModalCurrentDisplay.innerText = `${currentStock} pcs`;
    if (stockModalNewInput) stockModalNewInput.value = currentStock;
    if (stockModalReason) stockModalReason.value = "restock";
    if (stockModalNote) stockModalNote.value = "";
    if (stockModalError) {
        stockModalError.style.display = "none";
        stockModalError.innerText = "";
    }
    stockModal.classList.add("active");
    if (stockModalNewInput) stockModalNewInput.focus();
}

function closeStockModal() {
    if (!stockModal) return;
    stockModal.classList.remove("active");
}

if (stocksTbody) {
    stocksTbody.addEventListener("click", (e) => {
        const btn = e.target.closest(".btn-stock-edit");
        if (!btn) return;
        const id = btn.getAttribute("data-id");
        if (inlineStockSelect) {
            inlineStockSelect.value = id;
            syncInlineStockForm();
            inlineStockInput?.focus();
        }
    });
}

if (stockModalClose) stockModalClose.addEventListener("click", closeStockModal);
if (stockModalCancel) stockModalCancel.addEventListener("click", closeStockModal);
if (stockModal) {
    stockModal.addEventListener("click", (e) => {
        if (e.target === stockModal) closeStockModal();
    });
}

if (stockStepMinus) {
    stockStepMinus.addEventListener("click", () => {
        let val = parseInt(stockModalNewInput.value || "0", 10);
        if (val > 0) stockModalNewInput.value = val - 1;
    });
}

if (stockStepPlus) {
    stockStepPlus.addEventListener("click", () => {
        let val = parseInt(stockModalNewInput.value || "0", 10);
        stockModalNewInput.value = val + 1;
    });
}

if (stockModalForm) {
    stockModalForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const stockId = stockModalId.value;
        const newStock = parseInt(stockModalNewInput.value, 10);
        const reason = stockModalReason.value;
        const note = stockModalNote.value.trim();

        if (isNaN(newStock) || newStock < 0) {
            if (stockModalError) {
                stockModalError.innerText = "Stok harus angka bulat >= 0.";
                stockModalError.style.display = "block";
            }
            return;
        }

        const origBtnText = stockModalSave.innerText;
        stockModalSave.disabled = true;
        stockModalSave.innerText = "Menyimpan...";

        try {
            const response = await fetch(`${API_BASE}/api/admin/stocks/${stockId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    stock: newStock,
                    reason,
                    note: note || undefined
                })
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                if (stockModalError) {
                    stockModalError.innerText = result.message || "Gagal mengubah stok.";
                    stockModalError.style.display = "block";
                }
                return;
            }

            closeStockModal();
            loadStocks();

        } catch (err) {
            console.error("Update stock error:", err);
            if (stockModalError) {
                stockModalError.innerText = "Gagal terhubung ke server.";
                stockModalError.style.display = "block";
            }
        } finally {
            stockModalSave.disabled = false;
            stockModalSave.innerText = origBtnText;
        }
    });
}

if (stocksRefreshBtn) {
    stocksRefreshBtn.addEventListener("click", () => loadStocks());
}

/* =========================
   FINANCE — SALES REPORT, HPP PER VARIAN & PROFIT
   ========================= */

function getSelectedFinancePeriod() {
    initPeriodFilterControls();
    if (financePeriodMode === "day") {
        const val = (financeDateInput && financeDateInput.value) || getTodayDateString();
        if (financeDateInput) financeDateInput.value = val;
        return { granularity: "day", value: val };
    }
    if (financePeriodMode === "year") {
        const val = (financeYearSelect && financeYearSelect.value) || getCurrentYearString();
        if (financeYearSelect) financeYearSelect.value = val;
        return { granularity: "year", value: val };
    }
    const val = (financeMonthInput && financeMonthInput.value) || getCurrentMonthString();
    if (financeMonthInput) financeMonthInput.value = val;
    return { granularity: "month", value: val };
}

function getFinancePeriodDisplayLabel(granularity, value) {
    if (granularity === "day") return value ? formatDateShort(value) : "Hari ini";
    if (granularity === "year") return value ? `Tahun ${value}` : `Tahun ${getCurrentYearString()}`;
    return formatMonthLabelID(value || getCurrentMonthString());
}

async function loadFinance() {
    const { granularity, value } = getSelectedFinancePeriod();
    toggleFinancePeriodInputs();

    try {
        const qs = new URLSearchParams({ granularity, value: value || "" });
        const response = await fetch(
            `${API_BASE}/api/admin/finance/sales-report?${qs.toString()}`,
            { headers: { "Authorization": `Bearer ${getToken()}` } }
        );

        if (response.status === 401) {
            clearToken();
            showLoginView();
            return;
        }

        const result = await response.json();
        if (!response.ok || !result.success || !result.report) return;

        currentFinanceReport = result.report;
        if (Array.isArray(result.report.availableYears)) {
            syncYearSelectOptions(financeYearSelect, result.report.availableYears);
            if (financePeriodMode === "year" && financeYearSelect && result.report.value) {
                financeYearSelect.value = String(result.report.value);
            }
        }
        renderFinanceSalesReport(result.report);
    } catch (error) {
        console.error("Load finance sales report error:", error);
    }
}

function renderFinanceSalesReport(r) {
    if (!r) return;
    const gran = r.granularity || financePeriodMode || "month";
    const val = r.value || "";
    const nicePeriod = getFinancePeriodDisplayLabel(gran, val);
    const modeLabelMap = { day: "Per Hari", month: "Per Bulan", year: "Per Tahun", batch: "Per Batch" };
    const modeLabel = modeLabelMap[gran] || "Per Bulan";

    const rev = Number(r.generalRevenue || 0);
    const hpp = Number(r.generalHpp || 0);
    const profit = Number(r.generalProfit || 0);
    const marginPct = Number(r.generalMarginPct || 0);
    const hppRatioPct = rev > 0 ? Math.round((hpp / rev) * 1000) / 10 : 0;

    if (finRevenue) finRevenue.innerText = formatRupiah(rev);
    if (finPeriodStatus) finPeriodStatus.innerText = `${r.paidOrdersCount || 0} pesanan terbayar · ${r.totalPcs || 0} pcs · ${nicePeriod}`;
    if (finGeneralHpp) finGeneralHpp.innerText = formatRupiah(hpp);
    setText("fin-general-hpp-sub", `${hppRatioPct}% dari omzet · dihitung dari HPP per varian`);

    if (finNetRemaining) {
        finNetRemaining.innerText = formatRupiah(profit);
        finNetRemaining.classList.toggle("text-green", profit >= 0);
        finNetRemaining.classList.toggle("text-danger", profit < 0);
    }
    setText("fin-margin-sub", `Margin bersih ${marginPct}% dari omzet (${nicePeriod})`);

    setText("fin-pending-funds", formatRupiah(r.pendingFunds || 0));
    setText("fin-pending-funds-sub", `Dari ${r.pendingOrdersCount || 0} pesanan belum disetujui`);

    setText("fin-highlight-period-pill", `${modeLabel}: ${nicePeriod}`);
    setText("fin-variant-highlights-subtitle", `Performa penjualan 6 varian periode ${nicePeriod}`);
    renderVariantHighlightPair("fin", r, `Belum ada penjualan (${nicePeriod})`);

    const qrisRev = Number(r.qrisRevenue || 0);
    const codRev = Number(r.codRevenue || 0);
    setText("fin-recon-subtitle", `Posisi dana masuk QRIS vs COD periode ${nicePeriod}`);
    setText("fin-recon-qris", formatRupiah(qrisRev));
    setText("fin-recon-cod", formatRupiah(codRev));
    setText("fin-recon-total", formatRupiah(qrisRev + codRev));

    setText("finance-variant-subtitle", `General Omzet, HPP varian, dan Profit bersih periode ${nicePeriod}.`);
    setText("finance-variant-summary-badge", `${(r.variants || []).length} Varian · ${r.totalPcs || 0} pcs`);

    if (financeVariantTbody) {
        const variants = Array.isArray(r.variants) ? r.variants : [];
        if (variants.length === 0) {
            financeVariantTbody.innerHTML = `<tr><td colspan="8" class="empty-state-sm">Belum ada data varian.</td></tr>`;
        } else {
            financeVariantTbody.innerHTML = variants.map((v) => {
                const tags = [];
                if (v.isBestSeller) tags.push(`<span class="badge-pill badge-green ref-pill-inline">Terlaris</span>`);
                if (v.isLeastSeller) tags.push(`<span class="badge-pill badge-gold ref-pill-inline">Terkecil</span>`);
                const profitCls = (v.totalProfit || 0) >= 0 ? "text-green" : "text-danger";
                return `
                    <tr>
                        <td>
                            <strong>${escapeHtml(v.displayName || v.productId)}</strong>
                            ${tags.join(" ")}
                        </td>
                        <td class="align-right"><strong>${v.qty || 0} pcs</strong></td>
                        <td class="align-right">${formatRupiah(v.sellPrice || 0)}</td>
                        <td class="align-right"><strong>${formatRupiah(v.totalRevenue || 0)}</strong></td>
                        <td class="align-right">${formatRupiah(v.hppUnit || 0)}</td>
                        <td class="align-right text-danger">${formatRupiah(v.totalHpp || 0)}</td>
                        <td class="align-right">${formatRupiah(v.profitUnit || 0)}</td>
                        <td class="align-right"><strong class="${profitCls}">${formatRupiah(v.totalProfit || 0)}</strong></td>
                    </tr>
                `;
            }).join("");
        }
    }

    if (financeVariantTfoot) {
        const grandCls = profit >= 0 ? "text-green" : "text-danger";
        financeVariantTfoot.innerHTML = `
            <tr class="finance-grand-total-row">
                <td>GRAND TOTAL (GENERAL)</td>
                <td class="align-right">${r.totalPcs || 0} pcs</td>
                <td class="align-right">—</td>
                <td class="align-right">${formatRupiah(rev)}</td>
                <td class="align-right">—</td>
                <td class="align-right text-danger">${formatRupiah(hpp)}</td>
                <td class="align-right">—</td>
                <td class="align-right"><strong class="${grandCls}">${formatRupiah(profit)}</strong></td>
            </tr>
        `;
    }
}

document.querySelectorAll("#finance-period-tabs [data-fin-period]").forEach((btn) => {
    btn.addEventListener("click", () => {
        financePeriodMode = btn.dataset.finPeriod || "month";
        initPeriodFilterControls();
        loadFinance();
    });
});

if (financeDateInput) {
    financeDateInput.addEventListener("change", () => loadFinance());
}
if (financeMonthInput) {
    financeMonthInput.addEventListener("change", () => loadFinance());
}
if (financeYearSelect) {
    financeYearSelect.addEventListener("change", () => loadFinance());
}
if (financeRefreshBtn) {
    financeRefreshBtn.addEventListener("click", () => loadFinance());
}

bindClick("fin-go-sku-hpp-btn", () => {
    switchTab("settings");
    document.querySelectorAll(".settings-nav-item[data-settings-section]").forEach((b) => {
        b.classList.toggle("active", b.dataset.settingsSection === "sec-sku-hpp");
    });
    setTimeout(() => document.getElementById("sec-sku-hpp")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
});

/* =========================
   FINANCE — EXPORT EXCEL (2-SHEET: RINGKASAN + DETAIL VARIAN)
   ========================= */

const financeExportBtn = document.getElementById("finance-export");

async function exportFinanceExcel(overrideGranularity = null, overrideValue = null) {
    if (typeof ExcelJS === "undefined") {
        alert("Library Excel belum ke-load. Coba refresh halaman.");
        return;
    }

    const basePeriod = getSelectedFinancePeriod();
    const granularity = overrideGranularity || basePeriod.granularity;
    const value = overrideValue || basePeriod.value;

    const originalText = financeExportBtn ? financeExportBtn.innerText : "";
    if (financeExportBtn) {
        financeExportBtn.disabled = true;
        financeExportBtn.innerText = "Menyiapkan...";
    }

    try {
        const qs = new URLSearchParams({ granularity, value: value || "" });
        const res = await fetch(`${API_BASE}/api/admin/finance/sales-report?${qs.toString()}`, {
            headers: { "Authorization": `Bearer ${getToken()}` }
        });
        const data = await res.json();

        if (!res.ok || !data.success || !data.report) {
            alert("Gagal mengambil data laporan keuangan.");
            return;
        }

        const r = data.report;
        const nicePeriod = getFinancePeriodDisplayLabel(r.granularity || granularity, r.value || value);

        const COLOR = {
            maroon: "FF250B0D",
            maroonLight: "FF42191C",
            gold: "FFD8A84E",
            cream: "FFF7EFE3",
            green: "FF246B49",
            error: "FFE2725B",
            rowAlt: "FFFAF6EF"
        };

        const thinBorder = {
            top: { style: "thin", color: { argb: COLOR.gold } },
            left: { style: "thin", color: { argb: COLOR.gold } },
            bottom: { style: "thin", color: { argb: COLOR.gold } },
            right: { style: "thin", color: { argb: COLOR.gold } }
        };

        const wb = new ExcelJS.Workbook();
        wb.creator = "Velacookies Admin";
        wb.created = new Date();

        /* SHEET 1: RINGKASAN PENJUALAN */
        const ws1 = wb.addWorksheet("Ringkasan Penjualan", {
            properties: { tabColor: { argb: COLOR.maroon } },
            views: [{ showGridLines: false }]
        });

        ws1.mergeCells("A1:D1");
        const titleCell = ws1.getCell("A1");
        titleCell.value = "LAPORAN KEUANGAN PENJUALAN — VELACOOKIES";
        titleCell.font = { name: "Calibri", size: 15, bold: true, color: { argb: COLOR.cream } };
        titleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.maroon } };
        titleCell.alignment = { horizontal: "center", vertical: "middle" };
        ws1.getRow(1).height = 34;

        ws1.mergeCells("A2:D2");
        const subCell = ws1.getCell("A2");
        subCell.value = `Periode: ${nicePeriod}   •   Dibuat: ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}`;
        subCell.font = { size: 11, italic: true, color: { argb: COLOR.maroonLight } };
        subCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.cream } };
        subCell.alignment = { horizontal: "center", vertical: "middle" };
        ws1.getRow(2).height = 22;

        ws1.addRow([]);

        const s1Header = ws1.addRow(["RINGKASAN METRIK", "KETERANGAN", "JUMLAH / QTY", "NILAI (RP)"]);
        s1Header.eachCell((cell) => {
            cell.font = { bold: true, color: { argb: COLOR.maroon }, size: 11 };
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.gold } };
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.border = thinBorder;
        });
        s1Header.height = 24;

        const summaryRows = [
            ["General Omzet Penjualan", `${r.paidOrdersCount || 0} pesanan terbayar`, `${r.totalPcs || 0} pcs`, r.generalRevenue || 0],
            ["General HPP Penjualan", "Total harga pokok varian terjual", `${r.totalPcs || 0} pcs`, r.generalHpp || 0],
            ["General Profit Penjualan", `Margin bersih ${r.generalMarginPct || 0}%`, `${r.paidOrdersCount || 0} pesanan`, r.generalProfit || 0],
            ["Rekening QRIS (Terverifikasi)", "Pembayaran non-tunai lunas", "-", r.qrisRevenue || 0],
            ["Kas Tunai / COD (Terverifikasi)", "Pembayaran tunai lunas", "-", r.codRevenue || 0],
            ["Menunggu Verifikasi / Bayar", `${r.pendingOrdersCount || 0} pesanan pending`, "-", r.pendingFunds || 0],
            ["Varian Terlaris", r.bestSeller ? r.bestSeller.displayName : "Belum ada penjualan", r.bestSeller ? `${r.bestSeller.qty} pcs` : "0 pcs", r.bestSeller ? r.bestSeller.totalRevenue : 0],
            ["Varian Terkecil", r.leastSeller ? r.leastSeller.displayName : "Belum ada penjualan", r.leastSeller ? `${r.leastSeller.qty} pcs` : "0 pcs", r.leastSeller ? r.leastSeller.totalRevenue : 0]
        ];

        summaryRows.forEach((sr, idx) => {
            const row = ws1.addRow(sr);
            row.eachCell((cell, colNum) => {
                cell.border = thinBorder;
                cell.alignment = { vertical: "middle" };
                if (colNum === 4) {
                    cell.numFmt = '"Rp"#,##0';
                    cell.alignment = { horizontal: "right", vertical: "middle" };
                    cell.font = { bold: idx <= 2, color: { argb: idx === 2 ? COLOR.green : COLOR.maroonLight } };
                } else if (colNum === 3) {
                    cell.alignment = { horizontal: "center", vertical: "middle" };
                }
                if (idx % 2 === 1) {
                    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.rowAlt } };
                }
            });
            row.height = 22;
        });

        ws1.columns = [{ width: 32 }, { width: 38 }, { width: 16 }, { width: 20 }];

        /* SHEET 2: DETAIL PER VARIAN (6 SKU) */
        const ws2 = wb.addWorksheet("Detail per Varian", {
            properties: { tabColor: { argb: COLOR.green } },
            views: [{ showGridLines: false }]
        });

        ws2.mergeCells("A1:H1");
        const title2 = ws2.getCell("A1");
        title2.value = `DETAIL OMZET, HPP & PROFIT PER VARIAN — ${nicePeriod}`;
        title2.font = { size: 14, bold: true, color: { argb: COLOR.cream } };
        title2.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.maroon } };
        title2.alignment = { horizontal: "center", vertical: "middle" };
        ws2.getRow(1).height = 32;

        ws2.addRow([]);

        const vHeader = ws2.addRow(["VARIAN PRODUK", "TERJUAL (PCS)", "HARGA JUAL", "TOTAL OMZET", "HPP / PCS", "TOTAL HPP", "PROFIT / PCS", "TOTAL PROFIT"]);
        vHeader.eachCell((cell) => {
            cell.font = { bold: true, color: { argb: COLOR.maroon }, size: 11 };
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.gold } };
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.border = thinBorder;
        });
        vHeader.height = 26;

        (r.variants || []).forEach((v, idx) => {
            const row = ws2.addRow([
                v.displayName || v.productId,
                v.qty || 0,
                v.sellPrice || 0,
                v.totalRevenue || 0,
                v.hppUnit || 0,
                v.totalHpp || 0,
                v.profitUnit || 0,
                v.totalProfit || 0
            ]);
            row.eachCell((cell, colNum) => {
                cell.border = thinBorder;
                cell.alignment = { vertical: "middle" };
                if (colNum === 2) {
                    cell.alignment = { horizontal: "right", vertical: "middle" };
                } else if (colNum >= 3) {
                    cell.numFmt = '"Rp"#,##0';
                    cell.alignment = { horizontal: "right", vertical: "middle" };
                }
                if (idx % 2 === 1) {
                    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.rowAlt } };
                }
                if (colNum === 8) {
                    cell.font = { bold: true, color: { argb: (v.totalProfit || 0) >= 0 ? COLOR.green : COLOR.error } };
                }
            });
            row.height = 21;
        });

        const grandRow = ws2.addRow([
            "GRAND TOTAL (GENERAL)",
            r.totalPcs || 0,
            "-",
            r.generalRevenue || 0,
            "-",
            r.generalHpp || 0,
            "-",
            r.generalProfit || 0
        ]);
        grandRow.eachCell((cell, colNum) => {
            cell.border = thinBorder;
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.cream } };
            cell.font = { bold: true, color: { argb: colNum === 8 ? COLOR.green : COLOR.maroon }, size: 11 };
            if (colNum >= 2) cell.alignment = { horizontal: "right", vertical: "middle" };
            if ([4, 6, 8].includes(colNum)) cell.numFmt = '"Rp"#,##0';
        });
        grandRow.height = 25;

        ws2.columns = [
            { width: 42 },
            { width: 15 },
            { width: 15 },
            { width: 18 },
            { width: 15 },
            { width: 18 },
            { width: 15 },
            { width: 18 }
        ];

        const buffer = await wb.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `velacookies-keuangan-${r.value || value || "laporan"}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

    } catch (error) {
        console.error("Export Excel error:", error);
        alert("Gagal export Excel.");
    } finally {
        if (financeExportBtn) {
            financeExportBtn.disabled = false;
            financeExportBtn.innerText = originalText;
        }
    }
}

if (financeExportBtn) {
    financeExportBtn.addEventListener("click", () => exportFinanceExcel());
}


/* =========================================================
   CHATBOT WHATSAPP & VERIFIKASI BUKTI BAYAR (FULL ENGINE)
   ========================================================= */

if (waWebhookUrlDisplay) {
    waWebhookUrlDisplay.innerText = `${API_BASE}/api/wa/webhook`;
}

let waKnowledgeSectionsCache = [];
let waKnowledgeLoadedOnce = false;
let waBotHealthCache = null;

const waSubtabVerifyBtn = document.getElementById("wa-subtab-verify-btn");
const waSubtabHealthBtn = document.getElementById("wa-subtab-health-btn");
const waPanelVerify = document.getElementById("wa-subview-verification");
const waPanelHealth = document.getElementById("wa-subview-health");

function switchWaSubtab(subtab) {
    const valid = ["inbox", "verification", "knowledge", "health", "gateway"];
    const activeTab = valid.includes(subtab) ? subtab : "inbox";

    document.querySelectorAll(".wa-subtab[data-wa-subtab]").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.waSubtab === activeTab);
    });

    if (waPanelInbox) waPanelInbox.hidden = activeTab !== "inbox";
    if (waPanelVerify) waPanelVerify.hidden = activeTab !== "verification";
    if (waPanelKnowledge) waPanelKnowledge.hidden = activeTab !== "knowledge";
    if (waPanelHealth) waPanelHealth.hidden = activeTab !== "health";
    if (waPanelGateway) waPanelGateway.hidden = activeTab !== "gateway";

    if (activeTab === "verification") {
        renderWaVerifyQueue();
    } else if (activeTab === "knowledge") {
        if (!waKnowledgeLoadedOnce) loadBotKnowledge();
    } else if (activeTab === "health") {
        loadBotHealth();
    }
}

document.querySelectorAll(".wa-subtab[data-wa-subtab]").forEach((btn) => {
    btn.addEventListener("click", () => switchWaSubtab(btn.dataset.waSubtab));
});
bindClick("wa-open-gateway-top-btn", () => switchWaSubtab("gateway"));

function renderWaVerifyQueue() {
    const grid = document.getElementById("wa-verify-queue-grid");
    if (!grid) return;
    const queue = allOrders.filter(isAwaitingVerification);
    setText("wa-verify-queue-count", `${queue.length} menunggu`);

    if (queue.length === 0) {
        grid.innerHTML = `<p class="empty-state-sm">Tidak ada pesanan yang sedang menunggu verifikasi bukti pembayaran.</p>`;
        return;
    }

    grid.innerHTML = queue.map((order) => {
        const payLabel = (order.paymentMethod || "cash") === "qris" ? "QRIS" : "COD (DP 50%)";
        return `
            <div class="surface-card verify-queue-card">
                <div class="card-header-row">
                    <div>
                        <div class="page-title-row">
                            <strong>${escapeHtml(order.orderId)}</strong>
                            <span class="badge-pill badge-gold">${payLabel}</span>
                        </div>
                        <span class="text-muted-sm">${escapeHtml(order.customerName || "-")} · ${escapeHtml(order.whatsapp || "-")}</span>
                    </div>
                    <strong class="cell-total-amount">${formatRupiah(order.total || 0)}</strong>
                </div>
                <div class="meta-kv-row mt-8"><span>Item</span><strong>${escapeHtml(getOrderItemsSummary(order))}</strong></div>
                <div class="meta-kv-row"><span>Lokasi</span><strong>${escapeHtml(getLocationLabel(order.location))}</strong></div>
                ${buildAdminReceiptAnalysisBoxHtml(order, true)}
                <div class="form-actions-row mt-12">
                    ${isInvestorRole() ? "" : `
                        <button type="button" class="btn-primary btn-full vq-approve-btn" data-order-id="${escapeHtml(order.orderId)}">Terima pembayaran</button>
                        <button type="button" class="btn-outline btn-danger-outline vq-reject-btn" data-order-id="${escapeHtml(order.orderId)}">Minta cek ulang</button>
                    `}
                    <button type="button" class="btn-outline vq-detail-btn" data-order-id="${escapeHtml(order.orderId)}">Detail</button>
                </div>
            </div>
        `;
    }).join("");

    grid.querySelectorAll(".vq-approve-btn").forEach((btn) => {
        btn.addEventListener("click", () => verifyOrderProof(btn.dataset.orderId, "approve", btn));
    });
    grid.querySelectorAll(".vq-reject-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const reason = prompt("Alasan penolakan struk (dikirim ke WA pelanggan):", "Nominal belum sesuai atau foto struk kurang jelas");
            if (reason) verifyOrderProof(btn.dataset.orderId, "reject", btn, reason);
        });
    });
    grid.querySelectorAll(".vq-detail-btn").forEach((btn) => {
        btn.addEventListener("click", () => openOrderDetailPage(btn.dataset.orderId));
    });

    queue.forEach((order) => {
        if (hasOrderProof(order) && !order.paymentProofUrl) {
            ensureOrderProofLoaded(order.orderId);
        }
    });
}

function renderBotHealthBanner(botHealth, isBotOn = true) {
    if (botHealth) {
        waBotHealthCache = botHealth;
    }
    const bh = botHealth || waBotHealthCache || {};
    const chatEng = bh.chatEngine || {};
    const visEng = bh.visionEngine || {};
    const chatActiveModel = chatEng.activeModel || bh.activeModel || bh.primaryModel || "gemini-3.8-flash";
    const chatChainLabel = chatEng.chainLabel || (Array.isArray(chatEng.chain) ? chatEng.chain.join(" -> ") : chatActiveModel);
    const visActiveModel = visEng.activeModel || "gemini-3.8-flash";
    const visChainLabel = visEng.chainLabel || (Array.isArray(visEng.chain) ? visEng.chain.join(" -> ") : `${visActiveModel} -> gemini-3.6-flash -> gemini-3.5-flash-lite`);
    const healthStatus = bh.status || "healthy";

    if (waSettingBotActiveTitle) {
        waSettingBotActiveTitle.innerText = `Aktifkan Balasan Otomatis Chatbot AI (${chatActiveModel})`;
    }

    if (waBotStatusPill) {
        if (!isBotOn) {
            waBotStatusPill.innerText = "Chatbot Nonaktif (Manual)";
            waBotStatusPill.className = "badge-pill badge-gold";
        } else if (healthStatus === "error") {
            waBotStatusPill.innerText = bh.statusLabel || "API Key / SDK Belum Aktif";
            waBotStatusPill.className = "badge-pill badge-danger";
        } else if (healthStatus === "degraded") {
            waBotStatusPill.innerText = bh.statusLabel || `Terdegradasi (${chatActiveModel})`;
            waBotStatusPill.className = "badge-pill badge-gold";
        } else if (healthStatus === "failover") {
            waBotStatusPill.innerText = `Failover Aktif · ${chatActiveModel}`;
            waBotStatusPill.className = "badge-pill badge-green";
        } else {
            waBotStatusPill.innerText = `Chatbot: ${chatActiveModel} · Vision: ${visActiveModel}`;
            waBotStatusPill.className = "badge-pill badge-green";
        }
    }

    if (waHealthStatusBadge) {
        if (healthStatus === "error") {
            waHealthStatusBadge.innerText = bh.statusLabel || "Error Konfigurasi";
            waHealthStatusBadge.className = "badge-pill badge-danger";
        } else if (healthStatus === "degraded") {
            waHealthStatusBadge.innerText = bh.statusLabel || "Terdegradasi (Fallback)";
            waHealthStatusBadge.className = "badge-pill badge-gold";
        } else if (healthStatus === "failover") {
            waHealthStatusBadge.innerText = bh.statusLabel || `Failover Aktif · ${chatActiveModel}`;
            waHealthStatusBadge.className = "badge-pill badge-green";
        } else {
            waHealthStatusBadge.innerText = bh.statusLabel || `Chat: ${chatActiveModel} | Vision: ${visActiveModel}`;
            waHealthStatusBadge.className = "badge-pill badge-green";
        }
    }

    if (waHealthActiveModel) {
        waHealthActiveModel.innerText = `${chatActiveModel}${chatChainLabel && chatChainLabel !== chatActiveModel ? ` (${chatChainLabel})` : ""}`;
    }
    if (waHealthModelsPair) {
        const cooldownVis = Number(visEng.cooldownRemainingSec || bh.primaryCooldownRemainingSec || 0);
        waHealthModelsPair.innerText = cooldownVis > 0
            ? `${visActiveModel} [Cooldown utama ${cooldownVis} dtk] (${visChainLabel})`
            : `${visChainLabel} (maks ${visEng.perOrderLimit || 3}x auto/order)`;
    }
    const s24 = bh.stats24h || {};
    if (waHealthThinkingTimeout) {
        const chatCalls = Number(chatEng.calls24h ?? s24.chatCalls ?? 0);
        const visCalls = Number(visEng.calls24h ?? s24.visionCalls ?? 0);
        const timeoutSec = visEng.timeoutSeconds || bh.timeoutSeconds || 15;
        waHealthThinkingTimeout.innerText = `Chat: ${chatCalls}x · Vision: ${visCalls}x · timeout ${timeoutSec} dtk`;
    }
    if (waHealthApikeyStatus) {
        const providers = Array.isArray(chatEng.providersConfigured) && chatEng.providersConfigured.length > 0
            ? chatEng.providersConfigured.join(", ")
            : (bh.apiKeyConfigured !== false ? "gemini" : "belum ada key");
        const visReady = visEng.ready !== undefined ? Boolean(visEng.ready) : (bh.apiKeyConfigured !== false && bh.sdkInstalled !== false);
        const chatReady = chatEng.ready !== undefined ? Boolean(chatEng.ready) : visReady;
        waHealthApikeyStatus.innerText = `Aktif (${providers}) · Vision: ${visReady ? "Siap" : "Belum siap"}`;
        waHealthApikeyStatus.className = (chatReady && visReady) ? "text-green" : "";
    }
    if (waHealthStatTotal) waHealthStatTotal.innerText = String(s24.totalCalls || 0);
    if (waHealthStatSuccess) waHealthStatSuccess.innerText = String(s24.successCalls || 0);
    if (waHealthStatFallback) waHealthStatFallback.innerText = String(s24.fallbackCalls || 0);
    if (waHealthStatLatency) waHealthStatLatency.innerText = `${s24.avgLatencyMs || 0} ms`;

    if (waHealthLastErrorBox) {
        const lastErr = bh.lastError;
        if (lastErr && lastErr.errorMessage) {
            waHealthLastErrorBox.hidden = false;
            if (waHealthLastErrorTime) {
                waHealthLastErrorTime.innerText = `${formatDate(lastErr.createdAt)} · ${lastErr.model || "-"}`;
            }
            if (waHealthLastErrorMsg) {
                waHealthLastErrorMsg.innerText = lastErr.errorMessage;
            }
        } else {
            waHealthLastErrorBox.hidden = true;
        }
    }

    const logs = Array.isArray(bh.recentLogs) ? bh.recentLogs : [];
    if (waHealthLogsCount) {
        waHealthLogsCount.innerText = `${logs.length} catatan terbaru`;
    }
    if (waAiLogsTbody) {
        if (logs.length === 0) {
            waAiLogsTbody.innerHTML = `<tr><td colspan="6" class="empty-state-sm">Belum ada riwayat pemanggilan AI yang tercatat.</td></tr>`;
        } else {
            waAiLogsTbody.innerHTML = logs.map((lg) => {
                const isVision = lg.logType === "vision";
                const typeBadge = isVision
                    ? `<span class="badge-pill badge-gold">Vision Struk</span>`
                    : `<span class="badge-pill badge-green">Chat WA</span>`;
                const targetParts = [];
                if (lg.orderId) targetParts.push(`<strong>#${escapeHtml(lg.orderId)}</strong>`);
                if (lg.phone) targetParts.push(`<span>${escapeHtml(lg.phone)}</span>`);
                const targetHtml = targetParts.length > 0 ? targetParts.join("<br>") : "-";

                const statusBadge = lg.usedFallback
                    ? `<span class="badge-pill badge-gold" title="${escapeHtml(lg.errorMessage || "Fallback digunakan")}">Fallback</span>`
                    : `<span class="badge-pill badge-green">AI Murni</span>`;

                const errHint = lg.errorMessage
                    ? `<div style="font-size:11px;color:var(--danger);margin-top:3px;">${escapeHtml(String(lg.errorMessage).slice(0, 90))}</div>`
                    : "";

                return `
                    <tr>
                        <td>${formatDate(lg.createdAt)}</td>
                        <td>${typeBadge}</td>
                        <td>${targetHtml}</td>
                        <td>
                            <strong>${escapeHtml(lg.model || "-")}</strong>
                            <div class="text-muted-sm">${escapeHtml(lg.intent || "-")}${lg.needsHuman ? " · Handover" : ""}${lg.inScope === false ? " · Out-of-Scope" : ""}</div>
                            ${errHint}
                        </td>
                        <td class="align-right"><strong>${lg.latencyMs || 0} ms</strong></td>
                        <td>${statusBadge}</td>
                    </tr>
                `;
            }).join("");
        }
    }
}

async function loadBotHealth() {
    const token = getToken();
    if (!token) return;
    try {
        const res = await fetch(`${API_BASE}/api/admin/bot/health`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && data.botHealth) {
            renderBotHealthBanner(data.botHealth, data.botHealth.botActive !== false);
        }
    } catch (err) {
        console.error("Load bot health error:", err);
    }
}

function showBotKnowledgeStatus(msg, type = "success") {
    if (!waKnowledgeStatus) return;
    waKnowledgeStatus.innerText = msg;
    waKnowledgeStatus.className = `settings-status ${type}`;
    if (type === "success") {
        setTimeout(() => {
            if (waKnowledgeStatus) {
                waKnowledgeStatus.innerText = "";
                waKnowledgeStatus.className = "settings-status";
            }
        }, 4000);
    }
}

async function loadBotKnowledge() {
    const token = getToken();
    if (!token || !waKnowledgeSectionsList) return;

    try {
        const res = await fetch(`${API_BASE}/api/admin/bot/knowledge`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!data.success) return;

        waKnowledgeSectionsCache = Array.isArray(data.sections) ? data.sections : [];
        waKnowledgeLoadedOnce = true;
        renderBotKnowledgeSections(waKnowledgeSectionsCache);
    } catch (err) {
        console.error("Load bot knowledge error:", err);
        if (waKnowledgeSectionsList) {
            waKnowledgeSectionsList.innerHTML = `<p class="empty-state-sm">Gagal memuat Knowledge Base AI Bot.</p>`;
        }
    }
}

function renderBotKnowledgeSections(sections) {
    if (!waKnowledgeSectionsList) return;
    if (!sections || sections.length === 0) {
        waKnowledgeSectionsList.innerHTML = `<p class="empty-state-sm">Tidak ada bagian knowledge base ditemukan.</p>`;
        return;
    }

    waKnowledgeSectionsList.innerHTML = sections.map((sec) => {
        const modBadge = sec.isModified
            ? `<span class="badge-pill badge-gold">Diedit Admin</span>`
            : `<span class="badge-pill badge-green">Default Resmi</span>`;
        const updatedText = sec.updatedAt
            ? `Terakhir diperbarui: ${formatDate(sec.updatedAt)}`
            : "Menggunakan teks bawaan Velacookies";

        return `
            <div class="wa-knowledge-section-item" data-section-key="${escapeHtml(sec.key)}">
                <div class="wa-knowledge-section-top">
                    <div class="wa-knowledge-section-title-group">
                        <strong>${escapeHtml(sec.title)}</strong>
                        <span>${escapeHtml(sec.description || "")}</span>
                    </div>
                    <div class="wa-knowledge-section-meta">
                        ${modBadge}
                        ${isInvestorRole() ? "" : `
                            <button type="button" class="btn-outline-sm btn-reset-knowledge-sec" data-section-key="${escapeHtml(sec.key)}" title="Kembalikan bagian ini ke teks bawaan">
                                Reset bagian
                            </button>
                        `}
                    </div>
                </div>
                <textarea class="wa-knowledge-textarea" data-knowledge-input="${escapeHtml(sec.key)}" rows="5" ${isInvestorRole() ? "readonly" : ""}>${escapeHtml(sec.content || "")}</textarea>
                <span class="wa-knowledge-updated-hint">${escapeHtml(updatedText)}</span>
            </div>
        `;
    }).join("");

    waKnowledgeSectionsList.querySelectorAll(".btn-reset-knowledge-sec").forEach((btn) => {
        btn.addEventListener("click", () => {
            const key = btn.getAttribute("data-section-key");
            if (key) resetBotKnowledgeSection(key);
        });
    });
}

async function saveBotKnowledge() {
    if (!waKnowledgeSectionsList) return;
    const inputs = waKnowledgeSectionsList.querySelectorAll("[data-knowledge-input]");
    const sectionsPayload = {};
    inputs.forEach((el) => {
        const k = el.getAttribute("data-knowledge-input");
        if (k) {
            sectionsPayload[k] = el.value.trim();
        }
    });

    if (waKnowledgeSaveBtn) {
        waKnowledgeSaveBtn.disabled = true;
        waKnowledgeSaveBtn.innerText = "Menyimpan...";
    }

    try {
        const res = await fetch(`${API_BASE}/api/admin/bot/knowledge`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
            body: JSON.stringify({ sections: sectionsPayload })
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
            showBotKnowledgeStatus(data.message || "Gagal menyimpan Knowledge Base.", "error");
            return;
        }
        waKnowledgeSectionsCache = Array.isArray(data.sections) ? data.sections : [];
        renderBotKnowledgeSections(waKnowledgeSectionsCache);
        showBotKnowledgeStatus("Basis pengetahuan AI Bot berhasil disimpan dan langsung aktif.", "success");
    } catch (err) {
        console.error("Save bot knowledge error:", err);
        showBotKnowledgeStatus("Gagal terhubung ke server.", "error");
    } finally {
        if (waKnowledgeSaveBtn) {
            waKnowledgeSaveBtn.disabled = false;
            waKnowledgeSaveBtn.innerText = "Simpan semua perubahan";
        }
    }
}

async function resetBotKnowledgeSection(sectionKey) {
    if (!sectionKey) return;
    if (!confirm("Kembalikan bagian ini ke teks bawaan resmi Velacookies?")) return;

    try {
        const res = await fetch(`${API_BASE}/api/admin/bot/knowledge`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
            body: JSON.stringify({ resetSectionKey: sectionKey })
        });
        const data = await res.json();
        if (res.ok && data.success) {
            waKnowledgeSectionsCache = Array.isArray(data.sections) ? data.sections : [];
            renderBotKnowledgeSections(waKnowledgeSectionsCache);
            showBotKnowledgeStatus("Bagian berhasil dikembalikan ke default.", "success");
        }
    } catch (err) {
        console.error("Reset knowledge section error:", err);
    }
}

async function resetAllBotKnowledge() {
    if (!confirm("Kembalikan SELURUH 7 bagian Knowledge Base AI Bot ke teks bawaan resmi Velacookies?")) return;

    if (waKnowledgeResetAllBtn) waKnowledgeResetAllBtn.disabled = true;
    try {
        const res = await fetch(`${API_BASE}/api/admin/bot/knowledge`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
            body: JSON.stringify({ resetToDefault: true })
        });
        const data = await res.json();
        if (res.ok && data.success) {
            waKnowledgeSectionsCache = Array.isArray(data.sections) ? data.sections : [];
            renderBotKnowledgeSections(waKnowledgeSectionsCache);
            showBotKnowledgeStatus("Seluruh basis pengetahuan berhasil di-reset ke default.", "success");
        }
    } catch (err) {
        console.error("Reset all bot knowledge error:", err);
    } finally {
        if (waKnowledgeResetAllBtn) waKnowledgeResetAllBtn.disabled = false;
    }
}

if (waKnowledgeSaveBtn) {
    waKnowledgeSaveBtn.addEventListener("click", saveBotKnowledge);
}
if (waKnowledgeResetAllBtn) {
    waKnowledgeResetAllBtn.addEventListener("click", resetAllBotKnowledge);
}
if (waHealthRefreshBtn) {
    waHealthRefreshBtn.addEventListener("click", loadBotHealth);
}

async function loadWaWorkspace(options = {}) {
    const token = getToken();
    if (!token) return;

    try {
        const res = await fetch(`${API_BASE}/api/admin/wa/overview`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.status === 401) return;

        const data = await res.json();
        if (!res.ok || !data.success) return;

        waConversationsCache = Array.isArray(data.conversations) ? data.conversations : [];
        const metrics = data.metrics || {};
        waMetricsCache = metrics;

        if (waMetricTotal) waMetricTotal.innerText = String(metrics.totalConversations || 0);
        if (waMetricVerify) waMetricVerify.innerText = String(metrics.awaitingVerificationCount || 0);
        if (waMetricDp) waMetricDp.innerText = String(metrics.dpAwaitingCount || 0);
        if (waMetricHuman) waMetricHuman.innerText = String(metrics.needsHumanCount || 0);

        const isBotOn = metrics.botActive !== false;
        renderBotHealthBanner(data.botHealth, isBotOn);

        const senderNum = data.settings?.senderNumber || "6285117122454";
        setText("sidebar-wa-conn-title", isBotOn ? "WhatsApp terhubung" : "WhatsApp mode manual");
        setText("sidebar-wa-conn-sub", `+${senderNum} · ${isBotOn ? "AI Aktif" : "Manual"}`);

        const actionNeededCount =
            Number(metrics.awaitingVerificationCount || 0) + Number(metrics.needsHumanCount || 0);
        if (sidebarWaBadge) {
            if (actionNeededCount > 0) {
                sidebarWaBadge.hidden = false;
                sidebarWaBadge.innerText = String(actionNeededCount);
            } else {
                sidebarWaBadge.hidden = true;
            }
        }

        populateWaGatewayForm(data.settings);
        renderWaConversationList();
        renderWaVerifyQueue();
        renderDashboard();

        if (!waSelectedConvId && waConversationsCache.length > 0) {
            waSelectedConvId = waConversationsCache[0].convId;
        }

        if (waSelectedConvId && !options.silent) {
            await selectWaConversation(waSelectedConvId);
        }
    } catch (err) {
        console.error("Load WA workspace error:", err);
    }
}

function populateWaGatewayForm(settings) {
    if (!settings) return;
    waCurrentSettings = settings;
    if (waSettingProvider && settings.provider) waSettingProvider.value = settings.provider;
    if (waSettingSender && settings.senderNumber) waSettingSender.value = settings.senderNumber;
    if (waSettingToken && settings.webhookSecret) waSettingToken.value = settings.webhookSecret;
    if (waSettingAutoReply) waSettingAutoReply.checked = settings.botActive !== false;
    if (waSettingAutoRedirect) waSettingAutoRedirect.checked = settings.autoNotifyOnApprove !== false;
    if (waSettingTemplateApproved && settings.approveTemplate) {
        waSettingTemplateApproved.value = settings.approveTemplate;
    }
    if (waSettingTemplateRejected && settings.rejectTemplate) {
        waSettingTemplateRejected.value = settings.rejectTemplate;
    }
}

function getWaFilteredConversations() {
    return waConversationsCache.filter((c) => {
        if (waActiveFilter === "awaiting_verification") {
            const vs = c.verificationStatus || "";
            const hasProof = c.order && (hasOrderProof(c.order) || c.order.customerConfirmed);
            if (vs !== "awaiting_verification" && vs !== "dp_awaiting_verification" && !hasProof) return false;
        } else if (waActiveFilter === "waiting_proof") {
            const vs = c.verificationStatus || "";
            if (vs !== "awaiting_proof" && vs !== "dp_awaiting_verification" && vs !== "unconfirmed") return false;
        } else if (waActiveFilter === "needs_human") {
            if (!c.needsHuman && c.botMode !== "manual") return false;
        } else if (waActiveFilter === "ai_only") {
            if (c.botMode === "manual") return false;
        } else if (waActiveFilter === "verified") {
            if (c.verificationStatus !== "verified" && (!c.order || !isPaidOrder(c.order))) return false;
        }

        if (waSearchQuery) {
            const q = waSearchQuery.toLowerCase();
            const name = (c.customerName || "").toLowerCase();
            const phone = (c.phone || "").toLowerCase();
            const oid = (c.orderId || "").toLowerCase();
            const msg = (c.lastMessagePreview || "").toLowerCase();
            return name.includes(q) || phone.includes(q) || oid.includes(q) || msg.includes(q);
        }

        return true;
    });
}

function renderWaConversationList() {
    if (!waConvList) return;
    const list = getWaFilteredConversations();

    if (waConvCountLabel) {
        waConvCountLabel.innerText = `${list.length} percakapan ditampilkan`;
    }

    if (list.length === 0) {
        waConvList.innerHTML = `<p class="empty-state-sm">Belum ada percakapan WhatsApp yang cocok.</p>`;
        return;
    }

    waConvList.innerHTML = list.map((c) => {
        const isActive = String(c.convId) === String(waSelectedConvId);
        const modeBadge = c.botMode === "manual"
            ? `<span class="badge-pill badge-gold">Manual</span>`
            : `<span class="badge-pill badge-green">AI</span>`;

        const orderBadge = c.orderId
            ? `<span class="badge-pill badge-gold">${escapeHtml(c.orderId)}</span>`
            : "";

        let verifBadge = "";
        if (c.order && c.order.status === "finished") {
            verifBadge = `<span class="status-badge status-finished">Finish</span>`;
        } else if (c.order && c.order.status === "success") {
            verifBadge = `<span class="status-badge status-success">Lunas</span>`;
        } else if (c.order && (hasOrderProof(c.order) || c.order.customerConfirmed)) {
            verifBadge = `<span class="status-badge status-pending">Cek struk</span>`;
        }

        return `
            <button type="button" class="wa-conv-item ${isActive ? "active" : ""}" data-conv-id="${escapeHtml(c.convId)}">
                <div class="wa-conv-item-top">
                    <span class="wa-conv-item-name">${escapeHtml(c.customerName || "Pelanggan")}</span>
                    <span class="wa-conv-item-time">${formatDate(c.lastMessageAt)}</span>
                </div>
                <div class="wa-conv-item-preview">${escapeHtml(c.lastMessagePreview || "-")}</div>
                <div class="wa-conv-item-badges">
                    ${modeBadge}
                    ${orderBadge}
                    ${verifBadge}
                </div>
            </button>
        `;
    }).join("");

    waConvList.querySelectorAll(".wa-conv-item").forEach((btn) => {
        btn.addEventListener("click", () => {
            selectWaConversation(btn.dataset.convId);
        });
    });
}

async function selectWaConversation(convId) {
    if (!convId) return;
    waSelectedConvId = String(convId);
    renderWaConversationList();

    try {
        const res = await fetch(`${API_BASE}/api/admin/wa/conversations/${encodeURIComponent(convId)}`, {
            headers: { "Authorization": `Bearer ${getToken()}` }
        });
        const data = await res.json();
        if (!res.ok || !data.success) return;

        const conv = data.conversation;
        const order = data.order;
        const messages = data.messages || [];
        waActiveConvObject = conv;
        const cachedConv = waConversationsCache.find((c) => String(c.convId) === String(convId));
        if (cachedConv && order) {
            cachedConv.order = order;
        }

        if (waActiveAvatar) {
            const initials = (conv.customerName || "VC").trim().slice(0, 2).toUpperCase();
            waActiveAvatar.innerText = initials;
        }
        if (waActiveCustomerName) waActiveCustomerName.innerText = conv.customerName || "Pelanggan";
        if (waActiveCustomerSub) waActiveCustomerSub.innerText = conv.phone || "-";

        if (waActiveOrderPill) {
            if (conv.orderId) {
                waActiveOrderPill.hidden = false;
                waActiveOrderPill.innerText = conv.orderId;
            } else {
                waActiveOrderPill.hidden = true;
            }
        }

        const isManual = conv.botMode === "manual";
        if (waActiveModePill) {
            waActiveModePill.hidden = false;
            waActiveModePill.innerText = isManual ? "Manual" : "AI";
            waActiveModePill.className = `badge-pill ${isManual ? "badge-gold" : "badge-green"}`;
        }
        if (waToggleModeBtn) {
            waToggleModeBtn.innerText = isManual ? "Mode Manual Admin" : "Mode AI Aktif";
        }
        const handoverStrip = document.getElementById("wa-handover-strip");
        if (handoverStrip) {
            handoverStrip.hidden = !isManual && !conv.needsHuman;
        }

        if (waOpenExternalLink) {
            waOpenExternalLink.href = `https://wa.me/${normalizeWA(conv.phone)}`;
        }

        renderWaMessages(messages);
        renderWaOrderContext(conv, order);
    } catch (err) {
        console.error("Select WA conversation error:", err);
    }
}

function renderWaMessages(messages) {
    if (!waMessagesViewport) return;

    if (!messages || messages.length === 0) {
        waMessagesViewport.innerHTML = `<p class="empty-state-sm">Belum ada pesan di percakapan ini.</p>`;
        return;
    }

    waMessagesViewport.innerHTML = messages.map((m) => {
        const senderRole = m.sender === "customer" ? "customer" : m.sender === "admin" ? "admin" : "bot";
        const senderLabel = senderRole === "customer" ? "Pelanggan" : senderRole === "admin" ? "Admin Velacookies" : "Bot AI Velacookies";
        const mediaHtml = m.mediaUrl
            ? `<img src="${escapeHtml(m.mediaUrl)}" alt="Bukti Transfer" class="wa-bubble-media">`
            : "";

        let aiMetaChipHtml = "";
        if (senderRole === "bot" && m.aiAnalysis && typeof m.aiAnalysis === "object") {
            const meta = m.aiAnalysis;
            const chips = [];
            if (meta.intent) chips.push(escapeHtml(meta.intent));
            if (meta.model) chips.push(escapeHtml(meta.model));
            if (meta.latencyMs !== undefined && meta.latencyMs !== null) chips.push(`${meta.latencyMs}ms`);
            if (meta.usedFallback) chips.push("Fallback");
            if (meta.needsHuman) chips.push("Needs Human");
            if (meta.inScope === false) chips.push("Out of Scope");
            if (chips.length > 0) {
                aiMetaChipHtml = `<div style="margin-top:6px;padding-top:4px;border-top:1px dashed rgba(0,0,0,0.08);font-size:10.5px;color:var(--text-muted);">${chips.join(" · ")}</div>`;
            }
        }

        return `
            <div class="wa-bubble wa-bubble-${senderRole}">
                <div class="wa-bubble-meta">
                    <strong>${senderLabel}</strong>
                    <span>${formatDate(m.createdAt)}</span>
                </div>
                <div style="white-space:pre-wrap;">${escapeHtml(m.text)}</div>
                ${mediaHtml}
                ${aiMetaChipHtml}
            </div>
        `;
    }).join("");

    waMessagesViewport.scrollTop = waMessagesViewport.scrollHeight;
}

const proofLoadPromises = new Map();

function renderProofIntoLazySlots(orderId, proofUrl) {
    if (!orderId || !proofUrl) return;
    document.querySelectorAll(".proof-lazy-slot").forEach((slot) => {
        if ((slot.dataset.proofOrderId || "").toUpperCase() !== orderId.toUpperCase()) return;
        const compact = slot.dataset.compact === "1";
        const safeUrl = escapeHtml(proofUrl);
        slot.outerHTML = `<a href="${safeUrl}" target="_blank" rel="noopener" title="Klik untuk lihat ukuran penuh"><img src="${safeUrl}" alt="Struk Pembayaran" class="wa-proof-preview-img" style="margin-top:8px;max-height:${compact ? "180px" : "260px"};width:auto;max-width:100%;border-radius:8px;display:block;"></a>`;
    });
}

async function ensureOrderProofLoaded(orderId) {
    const oid = String(orderId || "").trim().toUpperCase();
    if (!oid) return null;

    const findTargets = () => {
        const targets = [];
        const o1 = allOrders.find((o) => (o.orderId || "").toUpperCase() === oid);
        if (o1) targets.push(o1);
        waConversationsCache.forEach((c) => {
            if (c.order && (c.order.orderId || "").toUpperCase() === oid) targets.push(c.order);
        });
        return targets;
    };

    const targetsNow = findTargets();
    const cached = targetsNow.find((o) => Boolean(o.paymentProofUrl));
    if (cached) {
        renderProofIntoLazySlots(oid, cached.paymentProofUrl);
        return cached.paymentProofUrl;
    }

    if (targetsNow.length > 0 && !targetsNow.some((o) => hasOrderProof(o))) {
        return null;
    }

    if (proofLoadPromises.has(oid)) {
        return proofLoadPromises.get(oid);
    }

    const token = getToken();
    if (!token) return null;

    const promise = (async () => {
        try {
            const res = await fetch(`${API_BASE}/api/admin/orders/${encodeURIComponent(oid)}/proof`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!res.ok) return null;
            const data = await res.json();
            if (!data.success) return null;

            findTargets().forEach((o) => {
                o.hasPaymentProof = Boolean(data.hasPaymentProof || data.paymentProofUrl);
                if (data.paymentProofUrl) o.paymentProofUrl = data.paymentProofUrl;
                if (data.aiReceiptAnalysis) o.aiReceiptAnalysis = data.aiReceiptAnalysis;
            });

            if (data.paymentProofUrl) {
                renderProofIntoLazySlots(oid, data.paymentProofUrl);
            } else {
                document.querySelectorAll(".proof-lazy-slot").forEach((slot) => {
                    if ((slot.dataset.proofOrderId || "").toUpperCase() === oid) {
                        slot.innerHTML = `<span class="text-muted-sm">Gambar bukti pembayaran tidak ditemukan.</span>`;
                    }
                });
            }
            return data.paymentProofUrl || null;
        } catch (err) {
            console.error("Load proof error:", err);
            return null;
        } finally {
            proofLoadPromises.delete(oid);
        }
    })();

    proofLoadPromises.set(oid, promise);
    return promise;
}

async function reanalyzeOrderProof(orderId, btnEl) {
    const oid = String(orderId || "").trim().toUpperCase();
    if (!oid || isInvestorRole()) return;
    const token = getToken();
    if (!token) return;

    const origText = btnEl ? btnEl.innerText : "Analisa Ulang AI";
    if (btnEl) {
        btnEl.disabled = true;
        btnEl.innerText = "Menganalisa AI...";
    }

    try {
        const res = await fetch(`${API_BASE}/api/admin/orders/${encodeURIComponent(oid)}/reanalyze-proof`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
            alert(data.message || "Gagal menjalankan analisa ulang AI Vision.");
            return;
        }

        const matchOrders = allOrders.filter((o) => (o.orderId || "").toUpperCase() === oid);
        matchOrders.forEach((o) => { o.aiReceiptAnalysis = data.receiptAnalysis; });
        waConversationsCache.forEach((c) => {
            if (c.order && (c.order.orderId || "").toUpperCase() === oid) {
                c.order.aiReceiptAnalysis = data.receiptAnalysis;
            }
        });

        if (selectedInlineOrderId && selectedInlineOrderId.toUpperCase() === oid && matchOrders[0]) {
            renderOrderDetailPage(matchOrders[0]);
        }
        if (orderModal && orderModal.classList.contains("active") && matchOrders[0]) {
            openOrderModal(matchOrders[0]);
        }
        if (waPanelVerify && !waPanelVerify.hidden) {
            renderWaVerifyQueue();
        }
        if (waSelectedConvId) {
            const activeConv = waConversationsCache.find((c) => String(c.convId) === String(waSelectedConvId));
            if (activeConv && activeConv.order && (activeConv.order.orderId || "").toUpperCase() === oid) {
                renderWaOrderContext(activeConv, activeConv.order);
            }
        }
        loadBotHealth();
    } catch (err) {
        console.error("Reanalyze proof error:", err);
        alert("Gagal terhubung ke server saat menjalankan analisa ulang AI.");
    } finally {
        if (btnEl && btnEl.isConnected) {
            btnEl.disabled = false;
            btnEl.innerText = origText;
        }
    }
}

document.addEventListener("click", (e) => {
    const btn = e.target && e.target.closest ? e.target.closest(".reanalyze-proof-btn") : null;
    if (!btn) return;
    const oid = btn.dataset.orderId;
    if (oid) reanalyzeOrderProof(oid, btn);
});

function buildAdminReceiptAnalysisBoxHtml(order, compact = false) {
    const ai = order && order.aiReceiptAnalysis;
    const proofUrl = order && order.paymentProofUrl;
    const hasProof = hasOrderProof(order);
    if (!ai && !hasProof) {
        if (compact) return "";
        return `
            <div class="wa-ai-analysis-box">
                <span class="text-muted-sm">Belum ada foto struk pembayaran yang diunggah pelanggan di chat/website.</span>
            </div>
        `;
    }

    const isReceipt = ai ? ai.isReceipt !== false : true;
    const concerns = (ai && Array.isArray(ai.concerns)) ? ai.concerns : [];
    const senderBank = ai
        ? [ai.senderName && ai.senderName !== "-" ? ai.senderName : "", ai.bankOrWallet || ""].filter(Boolean).join(" · ") || "-"
        : "-";

    const concernsHtml = concerns.length > 0 ? `
        <div style="margin-top:8px;padding:8px 10px;border-radius:8px;background:rgba(192,57,43,0.08);border:1px solid rgba(192,57,43,0.3);font-size:11.5px;color:#a93226;line-height:1.45;">
            <strong style="display:block;margin-bottom:3px;">Catatan Pemeriksaan AI:</strong>
            <ul style="margin:0;padding-left:16px;">
                ${concerns.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}
            </ul>
        </div>
    ` : "";

    const proofSlotHtml = proofUrl
        ? `<a href="${escapeHtml(proofUrl)}" target="_blank" rel="noopener" title="Klik untuk lihat ukuran penuh"><img src="${escapeHtml(proofUrl)}" alt="Struk Pembayaran" class="wa-proof-preview-img" style="margin-top:8px;max-height:${compact ? "180px" : "260px"};width:auto;max-width:100%;border-radius:8px;display:block;"></a>`
        : hasProof && order && order.orderId
            ? `<div class="proof-lazy-slot" data-proof-order-id="${escapeHtml(order.orderId)}" data-compact="${compact ? "1" : "0"}" style="margin-top:8px;padding:10px;border-radius:8px;border:1px dashed var(--surface-border);"><span class="text-muted-sm">Memuat gambar bukti pembayaran...</span></div>`
            : "";

    const reanalyzeBtnHtml = (!isInvestorRole() && hasProof && order && order.orderId)
        ? `<div style="margin-top:8px;display:flex;justify-content:flex-end;"><button type="button" class="btn-outline-sm reanalyze-proof-btn" data-order-id="${escapeHtml(order.orderId)}">Analisa Ulang AI</button></div>`
        : "";

    return `
        <div class="wa-ai-analysis-box" style="${compact ? "margin-top:10px;margin-bottom:12px;" : ""}">
            <div class="page-title-row" style="justify-content:space-between;margin-bottom:6px;gap:6px;">
                <strong style="font-size:12.5px;">Hasil Pemeriksaan Struk AI</strong>
                ${ai ? `<span class="badge-pill ${ai.isSufficient ? "badge-green" : "badge-gold"}">${escapeHtml(ai.matchLabel || "Dicek AI")}</span>` : `<span class="badge-pill badge-gold">Bukti Terunggah</span>`}
            </div>
            ${ai ? `
                <div class="meta-kv-row"><span>Terdeteksi Struk</span><strong>${isReceipt ? "Ya (Struk Pembayaran)" : "Bukan Struk"}</strong></div>
                <div class="meta-kv-row"><span>Nominal Terbaca</span><strong>${formatRupiah(ai.detectedAmount || 0)}</strong></div>
                <div class="meta-kv-row"><span>Tagihan / Syarat</span><strong>${formatRupiah(ai.expectedAmount || 0)}</strong></div>
                <div class="meta-kv-row"><span>Penerima / Merchant</span><strong>${escapeHtml(ai.recipientName || "-")}</strong></div>
                <div class="meta-kv-row"><span>Pengirim / Bank</span><strong>${escapeHtml(senderBank)}</strong></div>
                <div class="meta-kv-row"><span>No. Referensi</span><strong>${escapeHtml(ai.referenceId || "-")}${ai.duplicateOrderId ? ` (Duplikat #${escapeHtml(ai.duplicateOrderId)})` : ""}</strong></div>
                ${ai.receiptDateText && ai.receiptDateText !== "-" ? `<div class="meta-kv-row"><span>Waktu di Struk</span><strong>${escapeHtml(ai.receiptDateText)}</strong></div>` : ""}
                <div class="meta-kv-row"><span>Skor Keyakinan</span><strong>${ai.confidenceScore !== undefined && ai.confidenceScore !== null ? ai.confidenceScore : 95}%</strong></div>
                ${concernsHtml}
                ${ai.summaryNote ? `<p class="text-muted-sm" style="margin-top:6px;font-size:11.5px;line-height:1.45;">${escapeHtml(ai.summaryNote)}</p>` : ""}
            ` : ""}
            ${proofSlotHtml}
            ${reanalyzeBtnHtml}
        </div>
    `;
}

function renderWaOrderContext(conv, order) {
    if (!waOrderContextBody) return;

    if (!order) {
        waOrderContextBody.innerHTML = `
            <div class="wa-context-card">
                <h3 class="card-title">Belum Terhubung ke Order</h3>
                <p class="card-subtitle mt-8">Percakapan ini belum memiliki kode pesanan <code>VC-XXXX</code> yang cocok.</p>
                ${isInvestorRole() ? "" : `
                    <div class="form-group mt-14">
                        <label class="form-label">Tautkan Kode Order Manual</label>
                        <div style="display:flex;gap:6px;">
                            <input type="text" id="wa-manual-link-order-input" class="form-input" placeholder="VC-0001" value="${escapeHtml(conv?.linkedOrderId || "")}">
                            <button type="button" class="btn-outline-sm" id="wa-manual-link-order-btn">Tautkan</button>
                        </div>
                    </div>
                `}
            </div>
        `;

        const linkBtn = document.getElementById("wa-manual-link-order-btn");
        const linkInput = document.getElementById("wa-manual-link-order-input");
        if (linkBtn && linkInput && conv) {
            linkBtn.addEventListener("click", async () => {
                const code = linkInput.value.trim().toUpperCase();
                await fetch(`${API_BASE}/api/admin/wa/conversations/${conv.id}/mode`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${getToken()}`
                    },
                    body: JSON.stringify({ linkedOrderId: code })
                });
                await loadWaWorkspace();
            });
        }
        return;
    }

    const rules = order.paymentRules || {};
    const statusClass = getStatusClass(order.status || "pending");
    const statusLabel = getStatusLabel(order.status || "pending");

    const itemsListHtml = (order.items || []).map((it) => `
        <div class="meta-kv-row">
            <span>${it.quantity}x ${escapeHtml(it.name)}${it.addonName ? ` (+${escapeHtml(it.addonName)})` : ""}</span>
            <strong>${formatRupiah(it.subtotal)}</strong>
        </div>
    `).join("");

    const aiBoxHtml = buildAdminReceiptAnalysisBoxHtml(order, false);

    waOrderContextBody.innerHTML = `
        <div class="wa-context-card">
            <div class="page-title-row" style="justify-content:space-between;margin-bottom:8px;">
                <strong style="font-size:16px;">Order ${escapeHtml(order.orderId)}</strong>
                <span class="status-badge ${statusClass}">${statusLabel}</span>
            </div>
            <div class="meta-kv-row"><span>Pelanggan</span><strong>${escapeHtml(order.customerName)}</strong></div>
            <div class="meta-kv-row"><span>Metode</span><strong>${order.paymentMethod === "qris" ? "QRIS" : "Cash (COD)"}</strong></div>
            <div class="meta-kv-row"><span>Lokasi</span><strong>${escapeHtml(getLocationLabel(order.location))} ${order.locationDetail ? `(${escapeHtml(order.locationDetail)})` : ""}</strong></div>
            ${rules.requiresDp50 ? `<div class="meta-kv-row"><span>Syarat DP 50% COD</span><strong class="text-green">${formatRupiah(rules.dpRequiredAmount)}</strong></div>` : ""}
            <hr style="border:none;border-top:1px solid var(--surface-border);margin:8px 0;">
            ${itemsListHtml}
            <div class="inline-total-row">
                <span>Total Tagihan</span>
                <strong>${formatRupiah(order.total)}</strong>
            </div>
        </div>

        ${aiBoxHtml}

        <div class="modal-actions mt-12">
            ${isInvestorRole() ? `
                <div class="locked-order-pill" style="justify-content:center;width:100%;">Mode Investor (Hanya Lihat Data)</div>
            ` : order.status === "finished" ? `
                <div class="locked-order-pill" style="justify-content:center;width:100%;">Pesanan Finish (Terkunci Permanen)</div>
            ` : `
                ${order.status !== "success" ? `
                    <button type="button" class="btn-primary btn-full" id="wa-ctx-approve-btn" data-order-id="${escapeHtml(order.orderId)}">
                        Setujui Pembayaran &amp; Kirim WA Lunas
                    </button>
                ` : `
                    <div class="badge-pill badge-green" style="text-align:center;padding:8px;">Pembayaran Sudah Disetujui (Lunas)</div>
                `}
                <button type="button" class="btn-outline btn-danger-outline btn-full" id="wa-ctx-reject-btn" data-order-id="${escapeHtml(order.orderId)}">
                    Tolak Bukti / Minta Kirim Ulang
                </button>
            `}
        </div>
    `;

    const approveBtn = document.getElementById("wa-ctx-approve-btn");
    const rejectBtn = document.getElementById("wa-ctx-reject-btn");

    if (approveBtn) {
        approveBtn.addEventListener("click", () => verifyOrderProof(order.orderId, "approve", approveBtn));
    }
    if (rejectBtn) {
        rejectBtn.addEventListener("click", () => {
            const reason = prompt("Masukkan alasan penolakan struk (akan dikirim ke WA pelanggan):", "Nominal belum sesuai atau foto struk kurang jelas");
            if (reason) verifyOrderProof(order.orderId, "reject", rejectBtn, reason);
        });
    }

    if (hasOrderProof(order) && !order.paymentProofUrl) {
        ensureOrderProofLoaded(order.orderId);
    }
}

async function verifyOrderProof(orderId, decision, btnEl, reason = "") {
    if (!orderId || !decision) return;
    const token = getToken();
    if (!token) return;

    const origText = btnEl ? btnEl.innerText : "";
    if (btnEl) {
        btnEl.disabled = true;
        btnEl.innerText = "Memproses...";
    }

    try {
        const res = await fetch(`${API_BASE}/api/admin/orders/${encodeURIComponent(orderId)}/verify-proof`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ decision, reason })
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
            alert(data.message || "Gagal memverifikasi bukti pembayaran.");
            if (btnEl) {
                btnEl.disabled = false;
                btnEl.innerText = origText;
            }
            return;
        }

        await loadOrders();
        await loadWaWorkspace();
        loadPOReferrals(selectedReferralPoId);
    } catch (err) {
        console.error("Verify order proof error:", err);
        if (btnEl) {
            btnEl.disabled = false;
            btnEl.innerText = origText;
        }
    }
}

/* Admin Manual Reply in WA Thread */
if (waReplyForm) {
    waReplyForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!waSelectedConvId) {
            alert("Pilih percakapan terlebih dahulu.");
            return;
        }
        const text = waReplyInput.value.trim();
        if (!text) return;

        waReplySubmitBtn.disabled = true;
        try {
            const res = await fetch(`${API_BASE}/api/admin/wa/conversations/${encodeURIComponent(waSelectedConvId)}/reply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify({ text, switchToManual: true })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                waReplyInput.value = "";
                await loadWaWorkspace();
            }
        } catch (err) {
            console.error("Send WA reply error:", err);
        } finally {
            waReplySubmitBtn.disabled = false;
        }
    });
}

document.querySelectorAll(".btn-quick-pill[data-quick-reply]").forEach((btn) => {
    btn.addEventListener("click", () => {
        if (waReplyInput) {
            waReplyInput.value = btn.dataset.quickReply || "";
            waReplyInput.focus();
        }
    });
});

async function setWaConversationMode(nextMode) {
    if (!waSelectedConvId) return;
    try {
        const res = await fetch(`${API_BASE}/api/admin/wa/conversations/${encodeURIComponent(waSelectedConvId)}/mode`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
            body: JSON.stringify({ botMode: nextMode })
        });
        if (res.ok) await loadWaWorkspace();
    } catch (err) {
        console.error("Toggle WA mode error:", err);
    }
}

if (waToggleModeBtn) {
    waToggleModeBtn.addEventListener("click", () => {
        if (!waActiveConvObject) return;
        setWaConversationMode(waActiveConvObject.botMode === "manual" ? "ai" : "manual");
    });
}
bindClick("wa-return-to-bot-btn", () => setWaConversationMode("ai"));

function setWaInboxFilter(filterVal) {
    waActiveFilter = filterVal || "all";
    if (waConvFilterSelect) waConvFilterSelect.value = waActiveFilter;
    document.querySelectorAll("#wa-inbox-filter-pills [data-wa-pill]").forEach((p) => {
        p.classList.toggle("active", p.dataset.waPill === waActiveFilter);
    });
    renderWaConversationList();
}

document.querySelectorAll("#wa-inbox-filter-pills [data-wa-pill]").forEach((pill) => {
    pill.addEventListener("click", () => setWaInboxFilter(pill.dataset.waPill));
});

/* Filter & Search Listeners for WA Inbox */
if (waConvFilterSelect) {
    waConvFilterSelect.addEventListener("change", () => setWaInboxFilter(waConvFilterSelect.value));
}

document.querySelectorAll("[data-wa-filter]").forEach((card) => {
    card.addEventListener("click", () => {
        setWaInboxFilter(card.dataset.waFilter || "all");
        switchWaSubtab("inbox");
    });
});

if (waConvSearch) {
    waConvSearch.addEventListener("input", () => {
        waSearchQuery = waConvSearch.value.trim();
        renderWaConversationList();
    });
}

if (waRefreshBtn) {
    waRefreshBtn.addEventListener("click", () => loadWaWorkspace());
}

/* Save WA Gateway Settings */
if (waGatewayForm) {
    waGatewayForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (waGatewaySaveBtn) waGatewaySaveBtn.disabled = true;

        try {
            const payload = {
                provider: waSettingProvider?.value || "fonnte",
                senderNumber: waSettingSender?.value.trim() || "6285117122454",
                webhookSecret: waSettingToken?.value.trim() || "vc-webhook-karawang-2026",
                botActive: Boolean(waSettingAutoReply?.checked),
                autoNotifyOnApprove: Boolean(waSettingAutoRedirect?.checked),
                approveTemplate: waSettingTemplateApproved?.value.trim() || "",
                rejectTemplate: waSettingTemplateRejected?.value.trim() || ""
            };

            const res = await fetch(`${API_BASE}/api/admin/wa/settings`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (res.ok && data.success) {
                if (waGatewaySaveFeedback) {
                    waGatewaySaveFeedback.innerText = "Konfigurasi tersimpan.";
                    waGatewaySaveFeedback.className = "settings-status success";
                    setTimeout(() => { waGatewaySaveFeedback.innerText = ""; }, 3000);
                }
                await loadWaWorkspace({ silent: true });
            }
        } catch (err) {
            console.error("Save WA gateway error:", err);
        } finally {
            if (waGatewaySaveBtn) waGatewaySaveBtn.disabled = false;
        }
    });
}

/* WA Test / Webhook Simulator Modal */
function openWaTestModal() {
    if (!waTestModal) return;
    const latestOrder = allOrders[0];
    if (latestOrder && waTestPreset?.value === "qris_proof") {
        if (waTestName) waTestName.value = latestOrder.customerName || "Alya Putri";
        if (waTestPhone) waTestPhone.value = latestOrder.whatsapp || "081234567890";
        if (waTestMessage) {
            waTestMessage.value = `Halo Velacookies! Saya sudah transfer via QRIS:\nOrder ID: ${latestOrder.orderId}\nNama: ${latestOrder.customerName}\nTotal: ${formatRupiah(latestOrder.total)}`;
        }
        if (waTestReceiptAmount) waTestReceiptAmount.value = latestOrder.total || 55000;
    }
    waTestModal.classList.add("active");
}

function closeWaTestModal() {
    if (waTestModal) waTestModal.classList.remove("active");
}

if (waOpenTestModalBtn) waOpenTestModalBtn.addEventListener("click", openWaTestModal);
if (waTestModalClose) waTestModalClose.addEventListener("click", closeWaTestModal);
if (waTestCancelBtn) waTestCancelBtn.addEventListener("click", closeWaTestModal);

if (waTestAttachReceipt && waTestReceiptFields) {
    waTestAttachReceipt.addEventListener("change", () => {
        waTestReceiptFields.hidden = !waTestAttachReceipt.checked;
    });
}

if (waTestPreset) {
    waTestPreset.addEventListener("change", () => {
        const preset = waTestPreset.value;
        const latestOrder = allOrders[0];
        const sampleId = latestOrder ? latestOrder.orderId : "VC-0001";
        const sampleTotal = latestOrder ? latestOrder.total : 55000;

        if (preset === "qris_proof") {
            waTestMessage.value = `Halo Velacookies! Saya sudah transfer via QRIS untuk Order ID: ${sampleId}. Berikut bukti transfernya ya.`;
            waTestAttachReceipt.checked = true;
            if (waTestReceiptFields) waTestReceiptFields.hidden = false;
            if (waTestReceiptAmount) waTestReceiptAmount.value = sampleTotal;
        } else if (preset === "cod_dp") {
            waTestMessage.value = `Halo Kak, saya mau konfirmasi metode COD untuk Order ID: ${sampleId}. Apakah perlu DP 50%?`;
            waTestAttachReceipt.checked = false;
            if (waTestReceiptFields) waTestReceiptFields.hidden = true;
        } else if (preset === "stock_ask") {
            waTestMessage.value = "Halo kak! Stok Scoopable Nutella Cookies dan Lotus Biscoff hari ini masih ready berapa pcs ya?";
            waTestAttachReceipt.checked = false;
            if (waTestReceiptFields) waTestReceiptFields.hidden = true;
        } else if (preset === "want_order") {
            waTestMessage.value = "Kak saya mau pesan Chocochip 2 pcs dan Biscoff 1 pcs antar ke SMAN 1 Karawang dong.";
            waTestAttachReceipt.checked = false;
            if (waTestReceiptFields) waTestReceiptFields.hidden = true;
        } else if (preset === "human") {
            waTestMessage.value = "Tolong sambungkan dengan Admin manusia ya kak, saya mau tanya soal pengantaran pesanan saya.";
            waTestAttachReceipt.checked = false;
            if (waTestReceiptFields) waTestReceiptFields.hidden = true;
        }
    });
}

if (waTestForm) {
    waTestForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        waTestSubmitBtn.disabled = true;
        waTestSubmitBtn.innerText = "Mengirim ke Bot...";

        try {
            const attachReceipt = Boolean(waTestAttachReceipt?.checked);
            const payload = {
                customerName: waTestName.value.trim(),
                phone: waTestPhone.value.trim(),
                message: waTestMessage.value.trim(),
                attachSampleReceipt: attachReceipt,
                sampleReceiptAmount: attachReceipt ? Number(waTestReceiptAmount.value || 55000) : undefined,
                simulatedReceiptMeta: attachReceipt ? {
                    detectedAmount: Number(waTestReceiptAmount.value || 55000),
                    senderName: waTestName.value.trim(),
                    bankOrWallet: waTestReceiptBank.value.trim() || "BCA Mobile · QRIS"
                } : null
            };

            const res = await fetch(`${API_BASE}/api/wa/webhook`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getToken()}` },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (res.ok && data.success) {
                closeWaTestModal();
                waSelectedConvId = data.conversationId || waSelectedConvId;
                await loadOrders();
                await loadWaWorkspace();
            } else {
                alert(data.message || "Gagal menjalankan simulasi.");
            }
        } catch (err) {
            console.error("WA simulation error:", err);
            alert("Gagal terhubung ke server.");
        } finally {
            waTestSubmitBtn.disabled = false;
            waTestSubmitBtn.innerText = "Kirim Simulasi ke Bot";
        }
    });
}


/* =========================
   SETTINGS & SKU HPP PER VARIAN
   ========================= */

async function loadSettings() {
    if (!settingsForm) return;

    try {
        const response = await fetch(`${API_BASE}/api/admin/payment-settings`, {
            headers: { "Authorization": `Bearer ${getToken()}` }
        });

        if (response.status === 401) {
            clearToken();
            showLoginView();
            return;
        }

        const result = await response.json();
        if (!response.ok || !result.success) return;

        renderSettings(result.settings);

    } catch (error) {
        console.error("Load settings error:", error);
    }
}

function renderSettings(settings) {
    if (!settings) return;

    if (settingsQrisOwner) settingsQrisOwner.value = settings.qrisOwnerName || "";
    let qrisImg = (settings.qrisImageUrl || "images/qris.jpeg").trim();
    if (qrisImg.startsWith("/images/")) qrisImg = qrisImg.slice(1);
    if (settingsQrisImage) settingsQrisImage.value = qrisImg;
    if (settingsQrisPreview) {
        settingsQrisPreview.src = qrisImg;
        settingsQrisPreview.onerror = function() {
            if (!this.dataset.fallbackTried) {
                this.dataset.fallbackTried = "1";
                this.src = "images/qris.jpeg";
            }
        };
    }
    if (settingsWa) settingsWa.value = settings.adminWaNumber || "";

    if (settingsUpdated) {
        settingsUpdated.innerText = settings.updatedAt
            ? `Terakhir diperbarui: ${formatDate(settings.updatedAt)}`
            : "";
    }

    if (settingsStatus) {
        settingsStatus.innerText = "";
        settingsStatus.className = "settings-status";
    }
}

function showSettingsStatus(message, type) {
    if (!settingsStatus) return;

    settingsStatus.innerText = message;
    settingsStatus.className = "settings-status " + type;

    if (type === "success") {
        setTimeout(() => {
            settingsStatus.innerText = "";
            settingsStatus.className = "settings-status";
        }, 3000);
    }
}

async function saveSettings(e) {
    e.preventDefault();

    const qrisOwnerName = settingsQrisOwner ? settingsQrisOwner.value.trim() : "";
    const qrisImageUrl = settingsQrisImage ? settingsQrisImage.value.trim() : "";
    const adminWaNumber = settingsWa ? settingsWa.value.trim() : "";

    if (!qrisOwnerName) {
        showSettingsStatus("Nama penerima QRIS wajib diisi.", "error");
        return;
    }

    if (!qrisImageUrl) {
        showSettingsStatus("URL gambar QRIS wajib diisi.", "error");
        return;
    }

    if (!adminWaNumber) {
        showSettingsStatus("Nomor WhatsApp admin wajib diisi.", "error");
        return;
    }

    if (!/^62[0-9]{8,13}$/.test(adminWaNumber)) {
        showSettingsStatus("Format WA harus diawali 62 (contoh: 6285117122454).", "error");
        return;
    }

    const originalText = settingsSubmit.innerText;
    settingsSubmit.disabled = true;
    settingsSubmit.innerText = "Menyimpan...";

    try {
        const response = await fetch(`${API_BASE}/api/admin/payment-settings`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                qrisImageUrl,
                qrisOwnerName,
                adminWaNumber
            })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            showSettingsStatus(result.message || "Gagal menyimpan pengaturan.", "error");
            return;
        }

        showSettingsStatus("Pengaturan tersimpan", "success");

        if (settingsUpdated && result.updatedAt) {
            settingsUpdated.innerText = `Terakhir diperbarui: ${formatDate(result.updatedAt)}`;
        }

    } catch (error) {
        console.error("Save settings error:", error);
        showSettingsStatus("Gagal terhubung ke server.", "error");
    } finally {
        settingsSubmit.disabled = false;
        settingsSubmit.innerText = originalText;
    }
}

if (settingsForm) {
    settingsForm.addEventListener("submit", saveSettings);
}

if (settingsQrisImage) {
    settingsQrisImage.addEventListener("input", () => {
        if (settingsQrisPreview) {
            let val = (settingsQrisImage.value.trim() || "images/qris.jpeg");
            if (val.startsWith("/images/")) val = val.slice(1);
            settingsQrisPreview.src = val;
        }
    });
}

/* HPP per Varian 6 SKU (/api/admin/finance/sku-hpp) */
const skuHppForm = document.getElementById("sku-hpp-form");
const skuHppTbody = document.getElementById("sku-hpp-tbody");
const skuHppStatusEl = document.getElementById("sku-hpp-status");
const skuHppSubmitBtn = document.getElementById("sku-hpp-submit");

function renderSkuHppForm() {
    if (!skuHppTbody) return;
    const list = Array.isArray(skuHppCatalogCache) && skuHppCatalogCache.length
        ? skuHppCatalogCache
        : DEFAULT_SKU_HPP_CATALOG;

    skuHppTbody.innerHTML = list.map((item, idx) => {
        const sell = Number(item.sellPrice || 0);
        const hpp = Math.max(0, Number(item.hppUnit || 0));
        const profit = sell - hpp;
        const margin = sell > 0 ? Math.round((profit / sell) * 1000) / 10 : 0;
        const profitCls = profit >= 0 ? "text-green" : "text-danger";

        return `
            <tr data-sku-row-index="${idx}">
                <td><strong>${escapeHtml(item.displayName || item.productId)}</strong></td>
                <td class="align-right">${formatRupiah(sell)}</td>
                <td class="align-right">
                    <input
                        type="number"
                        class="form-input sku-hpp-input"
                        data-sku-index="${idx}"
                        min="0"
                        max="10000000"
                        step="100"
                        value="${hpp}"
                        required
                    >
                </td>
                <td class="align-right">
                    <span class="sku-hpp-preview-main ${profitCls}" id="sku-profit-preview-${idx}">${formatRupiah(profit)}</span>
                    <span class="sku-hpp-preview-sub" id="sku-margin-preview-${idx}">Margin ${margin}%</span>
                </td>
            </tr>
        `;
    }).join("");

    skuHppTbody.querySelectorAll(".sku-hpp-input").forEach((inp) => {
        inp.addEventListener("input", () => {
            const idx = parseInt(inp.dataset.skuIndex || "0", 10);
            const item = list[idx];
            if (!item) return;
            const sell = Number(item.sellPrice || 0);
            const hpp = Math.max(0, parseInt(inp.value || "0", 10) || 0);
            const profit = sell - hpp;
            const margin = sell > 0 ? Math.round((profit / sell) * 1000) / 10 : 0;
            const pEl = document.getElementById(`sku-profit-preview-${idx}`);
            const mEl = document.getElementById(`sku-margin-preview-${idx}`);
            if (pEl) {
                pEl.innerText = formatRupiah(profit);
                pEl.className = `sku-hpp-preview-main ${profit >= 0 ? "text-green" : "text-danger"}`;
            }
            if (mEl) mEl.innerText = `Margin ${margin}%`;
        });
    });

    applyRolePermissionsUI();
}

async function loadSkuHppSettings() {
    try {
        const res = await fetch(`${API_BASE}/api/admin/finance/sku-hpp`, {
            headers: { "Authorization": `Bearer ${getToken()}` }
        });
        if (res.status === 401) {
            clearToken();
            showLoginView();
            return;
        }
        const data = await res.json();
        if (!res.ok || !data.success || !Array.isArray(data.items) || !data.items.length) {
            renderSkuHppForm();
            return;
        }
        skuHppCatalogCache = data.items;
        renderSkuHppForm();
        if (allOrders.length) renderDashboard();
        if (poStatusCache) renderPOPage();
    } catch (err) {
        console.error("Load SKU HPP settings error:", err);
        renderSkuHppForm();
    }
}

if (skuHppForm) {
    skuHppForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (isInvestorRole()) return;

        const baseList = Array.isArray(skuHppCatalogCache) && skuHppCatalogCache.length
            ? skuHppCatalogCache
            : DEFAULT_SKU_HPP_CATALOG;
        const payloadItems = [];
        let invalidMsg = "";

        skuHppTbody?.querySelectorAll(".sku-hpp-input").forEach((inp) => {
            const idx = parseInt(inp.dataset.skuIndex || "0", 10);
            const sku = baseList[idx];
            if (!sku) return;
            const val = parseInt(inp.value, 10);
            if (isNaN(val) || val < 0 || val > 10000000) {
                invalidMsg = `Nilai HPP untuk ${sku.displayName} tidak valid.`;
                return;
            }
            payloadItems.push({
                productId: sku.productId,
                addonName: sku.addonName || "",
                hppUnit: val
            });
        });

        if (invalidMsg || !payloadItems.length) {
            if (skuHppStatusEl) {
                skuHppStatusEl.innerText = invalidMsg || "Tidak ada data HPP untuk disimpan.";
                skuHppStatusEl.className = "settings-status error";
            }
            return;
        }

        if (skuHppSubmitBtn) skuHppSubmitBtn.disabled = true;
        try {
            const res = await fetch(`${API_BASE}/api/admin/finance/sku-hpp`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify({ items: payloadItems })
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                if (skuHppStatusEl) {
                    skuHppStatusEl.innerText = data.message || "Gagal menyimpan HPP varian.";
                    skuHppStatusEl.className = "settings-status error";
                }
                return;
            }
            if (Array.isArray(data.items) && data.items.length) {
                skuHppCatalogCache = data.items;
            }
            renderSkuHppForm();
            renderDashboard();
            if (poStatusCache) renderPOPage();
            if (currentFinanceReport) loadFinance();
            if (skuHppStatusEl) {
                skuHppStatusEl.innerText = "HPP per varian berhasil disimpan.";
                skuHppStatusEl.className = "settings-status success";
                setTimeout(() => { skuHppStatusEl.innerText = ""; }, 3500);
            }
        } catch (err) {
            console.error("Save SKU HPP settings error:", err);
            if (skuHppStatusEl) {
                skuHppStatusEl.innerText = "Gagal terhubung ke server.";
                skuHppStatusEl.className = "settings-status error";
            }
        } finally {
            if (skuHppSubmitBtn) skuHppSubmitBtn.disabled = isInvestorRole();
        }
    });
}

document.querySelectorAll(".settings-nav-item[data-settings-section]").forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".settings-nav-item[data-settings-section]").forEach((b) => b.classList.toggle("active", b === btn));
        const target = document.getElementById(btn.dataset.settingsSection);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

bindClick("settings-go-wa-gateway-btn", () => { switchTab("whatsapp"); switchWaSubtab("gateway"); });
bindClick("settings-go-wa-knowledge-btn", () => { switchTab("whatsapp"); switchWaSubtab("knowledge"); });
bindClick("settings-go-po-btn", () => switchTab("preorder"));
bindClick("settings-logout-btn", doLogout);

/* Investor Account Settings (/api/admin/role-accounts/investor) */
const investorAccForm = document.getElementById("investor-account-form");
const investorAccUsernameInput = document.getElementById("investor-acc-username");
const investorAccPasswordInput = document.getElementById("investor-acc-password");
const investorAccActiveCheckbox = document.getElementById("investor-acc-active");
const investorAccStatusBadge = document.getElementById("investor-acc-status-badge");
const investorAccSubmitBtn = document.getElementById("investor-acc-submit");
const investorAccStatusEl = document.getElementById("investor-acc-status");

function updateInvestorAccBadge(isActive) {
    if (!investorAccStatusBadge) return;
    investorAccStatusBadge.innerText = isActive ? "Aktif" : "Nonaktif";
    investorAccStatusBadge.className = `badge-pill ${isActive ? "badge-green" : "badge-neutral"}`;
}

if (investorAccActiveCheckbox) {
    investorAccActiveCheckbox.addEventListener("change", () => {
        updateInvestorAccBadge(Boolean(investorAccActiveCheckbox.checked));
    });
}

async function loadInvestorAccountSettings() {
    if (!investorAccForm || isInvestorRole()) return;
    try {
        const res = await fetch(`${API_BASE}/api/admin/role-accounts/investor`, {
            headers: { "Authorization": `Bearer ${getToken()}` }
        });
        const data = await res.json();
        if (!res.ok || !data.success || !data.account) return;
        const acc = data.account;
        if (investorAccUsernameInput) investorAccUsernameInput.value = acc.username || "velainvestor";
        if (investorAccPasswordInput) investorAccPasswordInput.value = "";
        if (investorAccActiveCheckbox) investorAccActiveCheckbox.checked = acc.isActive !== false;
        updateInvestorAccBadge(acc.isActive !== false);
    } catch (err) {
        console.error("Load investor account settings error:", err);
    }
}

if (investorAccForm) {
    investorAccForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (isInvestorRole()) return;

        const username = investorAccUsernameInput ? investorAccUsernameInput.value.trim() : "";
        const newPassword = investorAccPasswordInput ? investorAccPasswordInput.value : "";
        const isActive = Boolean(investorAccActiveCheckbox?.checked);

        if (!username || username.length < 3) {
            if (investorAccStatusEl) {
                investorAccStatusEl.innerText = "Username Investor minimal 3 karakter.";
                investorAccStatusEl.className = "settings-status error";
            }
            return;
        }
        if (newPassword && newPassword.length < 6) {
            if (investorAccStatusEl) {
                investorAccStatusEl.innerText = "Password baru minimal 6 karakter.";
                investorAccStatusEl.className = "settings-status error";
            }
            return;
        }

        if (investorAccSubmitBtn) {
            investorAccSubmitBtn.disabled = true;
            investorAccSubmitBtn.innerText = "Menyimpan...";
        }

        try {
            const res = await fetch(`${API_BASE}/api/admin/role-accounts/investor`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify({ username, newPassword, isActive })
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                if (investorAccStatusEl) {
                    investorAccStatusEl.innerText = data.message || "Gagal menyimpan akun Investor.";
                    investorAccStatusEl.className = "settings-status error";
                }
                return;
            }
            if (investorAccPasswordInput) investorAccPasswordInput.value = "";
            if (data.account) {
                updateInvestorAccBadge(data.account.isActive !== false);
            }
            if (investorAccStatusEl) {
                investorAccStatusEl.innerText = data.message || "Akun Investor berhasil disimpan.";
                investorAccStatusEl.className = "settings-status success";
                setTimeout(() => { investorAccStatusEl.innerText = ""; }, 3500);
            }
        } catch (err) {
            console.error("Save investor account settings error:", err);
            if (investorAccStatusEl) {
                investorAccStatusEl.innerText = "Gagal terhubung ke server.";
                investorAccStatusEl.className = "settings-status error";
            }
        } finally {
            if (investorAccSubmitBtn) {
                investorAccSubmitBtn.disabled = false;
                investorAccSubmitBtn.innerText = "Simpan akun Investor";
            }
        }
    });
}


/* =========================
   PRE-ORDER (DEDICATED BATCH PAGE)
   ========================= */

const poBatchNameInput = document.getElementById("po-batch-name");
const poOpenDateInput = document.getElementById("po-open-date");
const poMaxQuotaInput = document.getElementById("po-max-quota");
const poParticipantSearch = document.getElementById("po-participant-search");
const poParticipantFilter = document.getElementById("po-participant-filter");

function toDatetimeLocalValue(isoStr) {
    const d = parseISOString(isoStr);
    const p = d ? getWIBParts(d) : null;
    if (!p) return "";
    return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

async function loadPOSettings() {
    try {
        const response = await fetch(`${API_BASE}/api/admin/po/status`, {
            headers: { "Authorization": `Bearer ${getToken()}` }
        });

        if (response.status === 401) {
            clearToken();
            showLoginView();
            return;
        }

        const result = await response.json();
        if (!response.ok || !result.success) return;

        poStatusCache = result;
        currentPOData = result.po;
        renderPOPage();
        renderDashboardPOCard();
        await loadPOReferrals(userPickedReferralBatch ? selectedReferralPoId : null);

    } catch (err) {
        console.error("Load PO settings error:", err);
    }
}

function getPOHistoryWithCurrent() {
    const result = poStatusCache || {};
    const history = Array.isArray(result.history) ? result.history.slice() : [];
    if (currentPOData && currentPOData.id && !history.some((h) => String(h.id) === String(currentPOData.id))) {
        history.unshift(currentPOData);
    }
    return history;
}

function getViewedPOObject() {
    const history = getPOHistoryWithCurrent();
    if (selectedViewPoId != null) {
        const found = history.find((h) => String(h.id) === String(selectedViewPoId));
        if (found) return found;
    }
    const def = currentPOData || history[0] || null;
    if (def) selectedViewPoId = def.id;
    return def;
}

function getViewedPOBatchOrders() {
    const viewed = getViewedPOObject();
    return viewed ? getPOBatchOrders(viewed.id) : [];
}

function getBatchBadgeCode(poObj) {
    if (!poObj) return "Batch PO";
    return `Batch #${poObj.batchNumber || poObj.id}`;
}

function renderPOPage() {
    const result = poStatusCache || {};
    const activePO = currentPOData;
    const isOpen = result.isOpen === true;
    const history = getPOHistoryWithCurrent();

    if (headerPoBadge && headerPoText) {
        headerPoBadge.classList.toggle("closed", !isOpen);
        headerPoText.innerText = isOpen ? "Pre-order dibuka" : "Pre-order ditutup";
    }
    const sidebarPoBadge = document.getElementById("sidebar-po-badge");
    if (sidebarPoBadge) {
        sidebarPoBadge.innerText = isOpen ? "Buka" : "Tutup";
    }

    const viewedPO = getViewedPOObject();
    const activeId = activePO?.id || history[0]?.id || null;
    const isArchiveView = Boolean(viewedPO && activeId && String(viewedPO.id) !== String(activeId));
    const viewedIsOpen = Boolean(viewedPO && viewedPO.status === "open");

    const viewerSelect = document.getElementById("po-batch-viewer-select");
    if (viewerSelect) {
        if (history.length === 0) {
            viewerSelect.innerHTML = `<option value="">Belum ada batch PO</option>`;
            viewerSelect.disabled = true;
        } else {
            viewerSelect.disabled = false;
            viewerSelect.innerHTML = history.map((h) => {
                const stText = h.status === "open" ? "Aktif" : "Tutup";
                const lbl = `${getBatchBadgeCode(h)} — ${h.batchName || `Batch PO #${h.batchNumber || h.id}`} (${stText})`;
                return `<option value="${h.id}">${escapeHtml(lbl)}</option>`;
            }).join("");
            if (viewedPO) viewerSelect.value = String(viewedPO.id);
        }
    }

    const archiveBanner = document.getElementById("po-viewing-archive-banner");
    if (archiveBanner) {
        archiveBanner.hidden = !isArchiveView;
        if (isArchiveView && viewedPO) {
            setText(
                "po-viewing-archive-label",
                `Sedang meninjau arsip ${getBatchBadgeCode(viewedPO)} — ${viewedPO.batchName || "-"}`
            );
        }
    }

    if (poCurrentBadge) {
        poCurrentBadge.className = `badge-pill ${viewedIsOpen ? "badge-green" : "badge-neutral"}`;
        poCurrentBadge.innerText = viewedIsOpen ? "PO DIBUKA" : (isArchiveView ? "ARSIP DITUTUP" : "PO DITUTUP");
    }

    setText("po-hero-id-label", viewedPO ? `${getBatchBadgeCode(viewedPO)} (Periode #${viewedPO.id})` : "Belum ada periode");
    if (poInfoStatus) {
        poInfoStatus.innerText = viewedPO ? (viewedPO.batchName || `Batch PO #${viewedPO.batchNumber || viewedPO.id}`) : "Belum Ada Batch Pre-Order";
    }
    setText("po-hero-subtitle", viewedIsOpen
        ? "Batch pre-order sedang aktif menerima pesanan dari pelanggan di halaman toko."
        : (isArchiveView
            ? "Menampilkan rincian riwayat batch pre-order yang sudah ditutup (pesanan, profit, dan rincian lokasi x varian)."
            : "Pre-order sedang ditutup. Buka periode baru di formulir pengaturan batch untuk menerima pesanan."));

    const batchOrders = viewedPO ? getPOBatchOrders(viewedPO.id) : [];
    const paidOrders = batchOrders.filter(isPaidOrder);
    const paidAnalytics = computeClientSalesAnalytics(paidOrders, skuHppCatalogCache);
    const activeAnalytics = computeClientSalesAnalytics(batchOrders, skuHppCatalogCache);

    const allocatedPcs = batchOrders.length > 0
        ? batchOrders.reduce((s, o) => s + getOrderTotalCookies(o), 0)
        : Number(viewedPO?.allocatedPcs || 0);
    const maxQuota = viewedPO ? Number(viewedPO.maxQuota || 100) : 100;
    const quotaPct = maxQuota > 0 ? Math.min(Math.round((allocatedPcs / maxQuota) * 100), 100) : 0;
    const remainingPcs = Math.max(0, maxQuota - allocatedPcs);
    const totalEnteredCount = batchOrders.length || Number(viewedPO?.orderCount || 0);

    setText("po-hero-allocated-pcs", String(allocatedPcs));
    setText("po-hero-max-quota", `/ ${maxQuota} pcs`);
    const heroBar = document.getElementById("po-hero-progress-bar");
    if (heroBar) heroBar.style.width = `${quotaPct}%`;
    setText("po-hero-orders-count", `${totalEnteredCount} pesanan masuk`);
    setText("po-hero-remaining-pcs", `Tersisa ${remainingPcs} pcs`);

    setText("po-info-open", viewedPO?.tanggalBuka ? formatDate(viewedPO.tanggalBuka) : "-");
    if (poInfoClose) poInfoClose.innerText = viewedPO?.tanggalTutup ? formatDate(viewedPO.tanggalTutup) : "-";
    if (poInfoProduction) poInfoProduction.innerText = viewedPO?.tanggalProduksi ? formatDateShort(getLocalDateString(viewedPO.tanggalProduksi)) : "-";

    const estRev = batchOrders.reduce((s, o) => s + (o.total || 0), 0);
    const paidRevDisplay = batchOrders.length > 0 ? paidAnalytics.generalRevenue : Number(viewedPO?.paidRevenue || 0);
    setText("po-hero-est-revenue", formatRupiah(paidRevDisplay));
    if (estRev > paidRevDisplay) {
        setText("po-hero-paid-revenue", `Est. total ${formatRupiah(estRev)} (termasuk pending)`);
    } else {
        setText("po-hero-paid-revenue", `${paidOrders.length || Number(viewedPO?.paidOrderCount || 0)} pesanan terbayar · ${paidAnalytics.totalPcs || Number(viewedPO?.paidPcs || 0)} pcs`);
    }
    setText("po-hero-profit", formatRupiah(paidAnalytics.generalProfit));
    setText("po-hero-hpp-profit", `HPP ${formatRupiah(paidAnalytics.generalHpp)} · Margin ${paidAnalytics.generalMarginPct}%`);

    renderVariantHighlightPair("po", paidAnalytics, "Belum ada penjualan lunas");

    if (btnClosePo) {
        btnClosePo.style.display = isOpen && !isInvestorRole() ? "inline-flex" : "none";
    }

    if (poFormTitle && poSubmitBtn) {
        if (isOpen && activePO) {
            poFormTitle.innerText = "Perbarui jadwal & kuota batch aktif";
            poSubmitBtn.innerText = "Simpan perubahan jadwal";
            if (poBatchNameInput) poBatchNameInput.value = activePO.batchName || "";
            if (poOpenDateInput) poOpenDateInput.value = toDatetimeLocalValue(activePO.tanggalBuka);
            if (poCloseDate) poCloseDate.value = toDatetimeLocalValue(activePO.tanggalTutup);
            if (poProductionDate && activePO.tanggalProduksi) {
                poProductionDate.value = getLocalDateString(activePO.tanggalProduksi);
            }
            if (poMaxQuotaInput) poMaxQuotaInput.value = activePO.maxQuota || 100;
        } else {
            poFormTitle.innerText = "Buka periode pre-order baru";
            poSubmitBtn.innerText = "Buka Pre-Order Sekarang";
            const maxBatchNum = history.reduce((mx, h) => Math.max(mx, Number(h.batchNumber || h.id || 0)), Number(activePO?.batchNumber || activePO?.id || 0));
            const nextNum = maxBatchNum + 1;
            if (poBatchNameInput && !poBatchNameInput.value) {
                poBatchNameInput.value = `Batch PO #${String(nextNum).padStart(2, "0")}`;
            }
            const now = new Date();
            const defaultClose = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
            const defaultProd = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
            const cParts = getWIBParts(defaultClose);
            const pParts = getWIBParts(defaultProd);
            if (poOpenDateInput) poOpenDateInput.value = "";
            if (poCloseDate && cParts) poCloseDate.value = `${cParts.year}-${cParts.month}-${cParts.day}T23:59`;
            if (poProductionDate && pParts) poProductionDate.value = `${pParts.year}-${pParts.month}-${pParts.day}`;
            if (poMaxQuotaInput) poMaxQuotaInput.value = activePO?.maxQuota || 100;
        }
    }

    const batchTagLabel = viewedPO ? getBatchBadgeCode(viewedPO) : "Batch terpilih";
    setText("po-variant-table-title", `Alokasi & Profit per varian — ${batchTagLabel}`);
    setText("po-participants-title", `Peserta ${batchTagLabel}`);

    renderPOVariantAllocation(batchOrders, allocatedPcs, activeAnalytics);
    renderPOLocationCards(batchOrders);
    renderPOLocationDetailTable(batchOrders);
    renderPOParticipants(batchOrders);
    renderPOHistory(history);
}

function renderPOVariantAllocation(batchOrders, totalPcs, precomputedAnalytics = null) {
    const tbody = document.getElementById("po-variant-allocation-tbody");
    setText("po-variant-total-badge", `Total ${totalPcs} pcs`);
    if (!tbody) return;

    const analytics = precomputedAnalytics || computeClientSalesAnalytics(batchOrders, skuHppCatalogCache);
    const list = (analytics.variants || []).filter((v) => v.qty > 0);
    if (list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="empty-state-sm">Belum ada item teralokasi pada batch ini.</td></tr>`;
        return;
    }

    tbody.innerHTML = list.map((v) => {
        const pct = totalPcs > 0 ? Math.round((v.qty / totalPcs) * 100) : 0;
        const profitCls = (v.totalProfit || 0) >= 0 ? "text-green" : "text-danger";
        return `
            <tr>
                <td><strong>${escapeHtml(v.displayName)}</strong></td>
                <td class="align-right">${v.orderCount || 0} pesanan</td>
                <td class="align-right"><strong>${v.qty} pcs</strong></td>
                <td>${pct}% dari batch</td>
                <td class="align-right">${formatRupiah(v.totalRevenue || 0)}</td>
                <td class="align-right text-danger">${formatRupiah(v.totalHpp || 0)}</td>
                <td class="align-right"><strong class="${profitCls}">${formatRupiah(v.totalProfit || 0)}</strong></td>
            </tr>
        `;
    }).join("") + `
        <tr class="finance-grand-total-row">
            <td>TOTAL BATCH TERALOKASI</td>
            <td class="align-right">${batchOrders.length} pesanan</td>
            <td class="align-right">${analytics.totalPcs} pcs</td>
            <td>100%</td>
            <td class="align-right">${formatRupiah(analytics.generalRevenue)}</td>
            <td class="align-right text-danger">${formatRupiah(analytics.generalHpp)}</td>
            <td class="align-right text-green">${formatRupiah(analytics.generalProfit)}</td>
        </tr>
    `;
}

function renderPOLocationCards(batchOrders) {
    const groups = [
        ["sman1", "po-loc-sman1-orders", "po-loc-sman1-pcs"],
        ["sman5", "po-loc-sman5-orders", "po-loc-sman5-pcs"],
        ["others", "po-loc-others-orders", "po-loc-others-pcs"]
    ];
    groups.forEach(([key, ordId, pcsId]) => {
        const list = batchOrders.filter((o) => key === "others" ? !["sman1", "sman5"].includes(o.location) : o.location === key);
        const m = getMetrics(list);
        setText(ordId, `${m.orders} pesanan`);
        setText(pcsId, `${m.items} pcs · ${formatRupiah(m.revenue)}`);

        const badgeEl = document.getElementById(ordId);
        if (badgeEl) {
            if (m.orders > 0) {
                badgeEl.classList.remove("badge-neutral");
                badgeEl.classList.add("badge-green");
            } else {
                badgeEl.classList.remove("badge-green");
                badgeEl.classList.add("badge-neutral");
            }
        }
    });
}

function renderPOLocationDetailTable(batchOrders) {
    const tbody = document.getElementById("po-location-detail-tbody");
    const emptyEl = document.getElementById("po-location-detail-empty");
    const modeSelect = document.getElementById("po-loc-status-mode");
    if (!tbody) return;

    const mode = modeSelect?.value || "active";
    const sourceOrders = mode === "paid" ? (batchOrders || []).filter(isPaidOrder) : (batchOrders || []);

    if (!sourceOrders.length) {
        tbody.innerHTML = "";
        if (emptyEl) {
            emptyEl.hidden = false;
            emptyEl.innerText = mode === "paid"
                ? "Belum ada pesanan terbayar/finish di batch ini."
                : "Belum ada pesanan aktif pada batch ini.";
        }
        return;
    }

    if (emptyEl) emptyEl.hidden = true;

    const locationMap = {};
    sourceOrders.forEach((order) => {
        const locKey = ["sman1", "sman5"].includes(order.location) ? order.location : "others";
        if (!locationMap[locKey]) {
            locationMap[locKey] = {
                key: locKey,
                label: locKey === "others" ? "Pengiriman Luar / Lainnya" : getLocationLabel(locKey),
                count: 0,
                pcs: 0,
                subtotal: 0,
                variants: {}
            };
        }
        locationMap[locKey].count += 1;
        locationMap[locKey].subtotal += Number(order.total || 0);

        (order.items || []).forEach((it) => {
            const qty = Number(it.quantity || 0);
            if (qty <= 0) return;
            const key = `${it.productId || it.name}||${it.addonName || ""}`;
            const displayName = it.addonName ? `${it.name} (+ ${it.addonName})` : it.name;
            const sub = it.subtotal != null ? Number(it.subtotal) : (Number(it.price || 0) + Number(it.addonPrice || 0)) * qty;

            locationMap[locKey].pcs += qty;
            if (!locationMap[locKey].variants[key]) {
                locationMap[locKey].variants[key] = { name: displayName, qty: 0, subtotal: 0 };
            }
            locationMap[locKey].variants[key].qty += qty;
            locationMap[locKey].variants[key].subtotal += sub;
        });
    });

    const locOrder = { sman1: 1, sman5: 2, others: 3 };
    const locations = Object.values(locationMap).sort((a, b) => (locOrder[a.key] || 50) - (locOrder[b.key] || 50));

    let html = "";
    locations.forEach((loc) => {
        html += `
            <tr class="report-location-parent">
                <td><strong>${escapeHtml(loc.label)}</strong></td>
                <td class="align-right">${loc.count} pesanan</td>
                <td class="align-right"><strong>${loc.pcs} pcs</strong></td>
                <td class="align-right"><strong>${formatRupiah(loc.subtotal)}</strong></td>
            </tr>
        `;
        const vars = Object.values(loc.variants).sort((a, b) => (b.qty - a.qty) || a.name.localeCompare(b.name));
        vars.forEach((v) => {
            html += `
                <tr class="report-location-child">
                    <td>${escapeHtml(v.name)}</td>
                    <td class="align-right">—</td>
                    <td class="align-right">${v.qty} pcs</td>
                    <td class="align-right">${formatRupiah(v.subtotal)}</td>
                </tr>
            `;
        });
    });

    tbody.innerHTML = html;
}

function renderPOParticipants(batchOrders) {
    const tbody = document.getElementById("po-participants-tbody");
    setText("po-participants-count-badge", `${batchOrders.length} pesanan`);
    if (!tbody) return;

    const q = (poParticipantSearch?.value || "").trim().toLowerCase();
    const f = poParticipantFilter?.value || "all";

    const filtered = batchOrders.filter((o) => {
        if (f === "success") {
            if (!isPaidOrder(o)) return false;
        } else if (f !== "all" && (o.status || "pending") !== f) {
            return false;
        }
        if (q) {
            return (o.orderId || "").toLowerCase().includes(q)
                || (o.customerName || "").toLowerCase().includes(q)
                || (o.whatsapp || "").toLowerCase().includes(q)
                || (o.referralCode || "").toLowerCase().includes(q);
        }
        return true;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" class="empty-state-sm">Belum ada peserta batch yang cocok.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map((o) => `
        <tr>
            <td><span class="cell-order-id">${escapeHtml(o.orderId)}</span></td>
            <td>
                <strong>${escapeHtml(o.customerName || "-")}</strong>
                ${o.referralCode ? `<div class="mt-4"><span class="badge-pill badge-gold">Ref: ${escapeHtml(o.referralCode)}</span></div>` : ""}
            </td>
            <td><span class="cell-items-text">${escapeHtml(getOrderItemsSummary(o))}</span></td>
            <td class="align-right">${getOrderTotalCookies(o)} pcs</td>
            <td><span class="location-badge ${getLocationClass(o.location)}">${escapeHtml(getLocationLabel(o.location))}</span></td>
            <td>${(o.paymentMethod || "cash") === "qris" ? "QRIS" : "COD"}</td>
            <td class="align-right"><strong>${formatRupiah(o.total || 0)}</strong></td>
            <td>${getOrderStatusBadgeHtml(o)}</td>
            <td class="align-right"><button type="button" class="btn-detail po-part-detail-btn" data-order-id="${escapeHtml(o.orderId)}">Detail &rarr;</button></td>
        </tr>
    `).join("");

    tbody.querySelectorAll(".po-part-detail-btn").forEach((btn) => {
        btn.addEventListener("click", () => openOrderDetailPage(btn.dataset.orderId));
    });
}

if (poParticipantSearch) poParticipantSearch.addEventListener("input", () => renderPOParticipants(getViewedPOBatchOrders()));
if (poParticipantFilter) poParticipantFilter.addEventListener("change", () => renderPOParticipants(getViewedPOBatchOrders()));

const poBatchViewerSelect = document.getElementById("po-batch-viewer-select");
if (poBatchViewerSelect) {
    poBatchViewerSelect.addEventListener("change", () => {
        const val = poBatchViewerSelect.value ? Number(poBatchViewerSelect.value) : null;
        selectedViewPoId = Number.isFinite(val) ? val : null;
        renderPOPage();
    });
}
bindClick("po-back-active-btn", () => {
    selectedViewPoId = currentPOData?.id || null;
    renderPOPage();
});
const poLocStatusModeSelect = document.getElementById("po-loc-status-mode");
if (poLocStatusModeSelect) {
    poLocStatusModeSelect.addEventListener("change", () => {
        renderPOLocationDetailTable(getViewedPOBatchOrders());
    });
}

function renderPOHistory(history) {
    const tbody = document.getElementById("po-history-tbody");
    if (!tbody) return;
    if (!history || history.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" class="empty-state-sm">Belum ada riwayat periode pre-order.</td></tr>`;
        return;
    }

    const canDelete = !isInvestorRole();
    const viewed = getViewedPOObject();

    tbody.innerHTML = history.map((h) => {
        const isOpen = h.status === "open";
        const isViewing = viewed && String(viewed.id) === String(h.id);
        const batchNum = h.batchNumber || h.id;
        const ordersForPo = allOrders.filter((o) => String(o.poPeriodId) === String(h.id));
        const paidCount = ordersForPo.length ? ordersForPo.filter(isPaidOrder).length : (h.paidOrderCount || 0);
        const totalAllCount = ordersForPo.length || Number(h.totalOrderCount || h.orderCount || 0);
        const paidRev = ordersForPo.length
            ? ordersForPo.filter(isPaidOrder).reduce((s, o) => s + Number(o.total || 0), 0)
            : Number(h.paidRevenue || 0);

        return `
            <tr${isViewing ? ' class="row-selected"' : ""}>
                <td>
                    <strong>Batch #${batchNum}</strong>
                    <span class="location-subtext">ID #${h.id}</span>
                </td>
                <td>${escapeHtml(h.batchName || `Batch PO #${batchNum}`)}</td>
                <td>${formatDate(h.tanggalBuka)} - ${formatDate(h.tanggalTutup)}</td>
                <td>${h.tanggalProduksi ? formatDateShort(getLocalDateString(h.tanggalProduksi)) : "-"}</td>
                <td class="align-right">
                    <strong>${h.orderCount || 0} aktif</strong>
                    <span class="location-subtext">${paidCount} lunas · ${totalAllCount} total</span>
                </td>
                <td class="align-right"><strong>${h.allocatedPcs || 0} / ${h.maxQuota || 100} pcs</strong></td>
                <td class="align-right"><strong>${formatRupiah(paidRev)}</strong></td>
                <td><span class="badge-pill ${isOpen ? "badge-green" : "badge-neutral"}">${isOpen ? "Aktif" : "Ditutup"}</span></td>
                <td class="align-right">
                    <div class="po-history-actions-cell">
                        <button type="button" class="btn-outline-sm po-view-detail-btn" data-po-id="${h.id}">Lihat Detail</button>
                        ${!isOpen && canDelete ? `<button type="button" class="btn-danger-sm po-delete-batch-btn" data-po-id="${h.id}">Hapus</button>` : ""}
                    </div>
                </td>
            </tr>
        `;
    }).join("");

    tbody.querySelectorAll(".po-view-detail-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            selectedViewPoId = Number(btn.dataset.poId);
            renderPOPage();
            document.getElementById("po-hero-banner")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    tbody.querySelectorAll(".po-delete-batch-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const poId = Number(btn.dataset.poId);
            const target = history.find((item) => Number(item.id) === poId);
            if (target) openPODeleteModal(target);
        });
    });
}

/* =========================
   FLOATING ADMIN TOAST & PO DELETE POP-UP MODAL
   ========================= */

let adminToastTimer = null;

function showAdminToast(message, type = "success", durationMs = 4200) {
    const toastEl = document.getElementById("admin-toast");
    const textEl = document.getElementById("admin-toast-text");
    const iconEl = document.getElementById("admin-toast-icon");
    if (!toastEl || !textEl) return;

    const isError = type === "error";
    textEl.innerText = String(message || "");
    toastEl.classList.remove("is-success", "is-error", "show");
    toastEl.classList.add(isError ? "is-error" : "is-success");

    if (iconEl) {
        iconEl.innerHTML = isError
            ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
            : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
    }

    toastEl.hidden = false;
    toastEl.classList.add("show");

    if (adminToastTimer) clearTimeout(adminToastTimer);
    adminToastTimer = setTimeout(() => {
        toastEl.classList.remove("show");
        setTimeout(() => {
            if (!toastEl.classList.contains("show")) toastEl.hidden = true;
        }, 220);
    }, durationMs);
}

const poDeleteModal = document.getElementById("po-delete-modal");
const poDeleteStep1 = document.getElementById("po-delete-step-1");
const poDeleteStep2 = document.getElementById("po-delete-step-2");
const poDelStepInd1 = document.getElementById("po-del-step-ind-1");
const poDelStepInd2 = document.getElementById("po-del-step-ind-2");
const poDelFinishedStatCard = document.getElementById("po-del-finished-stat-card");
const poDeleteConfirmInput = document.getElementById("po-delete-confirm-input");
const poDelMatchHint = document.getElementById("po-del-match-hint");
const poDeleteFinalBtn = document.getElementById("po-delete-final-btn");
const poDeleteError = document.getElementById("po-delete-error");
let poDeleteInFlight = false;

function setPODeleteStep(stepNum) {
    const isStep2 = stepNum === 2;
    if (poDeleteStep1) poDeleteStep1.hidden = isStep2;
    if (poDeleteStep2) poDeleteStep2.hidden = !isStep2;

    if (poDelStepInd1) {
        poDelStepInd1.classList.toggle("is-active", !isStep2);
        poDelStepInd1.classList.toggle("is-done", isStep2);
    }
    if (poDelStepInd2) {
        poDelStepInd2.classList.toggle("is-active", isStep2);
        poDelStepInd2.classList.remove("is-done");
    }
}

function syncPODeleteInputMatch() {
    const raw = (poDeleteConfirmInput?.value || "").trim();
    const matched = raw === "HAPUS";
    if (poDeleteFinalBtn) poDeleteFinalBtn.disabled = !matched || poDeleteInFlight;
    if (poDeleteConfirmInput) poDeleteConfirmInput.classList.toggle("is-valid", matched);
    if (poDelMatchHint) {
        poDelMatchHint.classList.toggle("is-valid", matched);
        poDelMatchHint.innerHTML = matched
            ? "Cocok — tekan <strong>Enter</strong> atau klik tombol hapus untuk melanjutkan."
            : "Ketik <code>HAPUS</code> huruf kapital persis untuk mengaktifkan tombol hapus.";
    }
    if (poDeleteError && matched) {
        poDeleteError.hidden = true;
        poDeleteError.innerText = "";
    }
    return matched;
}

function closePODeleteModal(force = false) {
    if (poDeleteInFlight && !force) return;
    poDeleteTarget = null;
    if (poDeleteModal) poDeleteModal.classList.remove("active");
    if (poDeleteConfirmInput) poDeleteConfirmInput.value = "";
    syncPODeleteInputMatch();
    if (poDeleteError) {
        poDeleteError.hidden = true;
        poDeleteError.innerText = "";
    }
}

function openPODeleteModal(batchObj) {
    if (!poDeleteModal || !batchObj || isInvestorRole()) return;
    if (batchObj.status === "open") {
        showAdminToast("Tutup batch pre-order ini terlebih dahulu sebelum menghapus.", "error");
        return;
    }

    const ordersInBatch = allOrders.filter((o) => String(o.poPeriodId) === String(batchObj.id));
    const totalCount = ordersInBatch.length || Number(batchObj.totalOrderCount || batchObj.orderCount || 0);
    const paidCount = ordersInBatch.length ? ordersInBatch.filter(isPaidOrder).length : Number(batchObj.paidOrderCount || 0);
    const pendingCount = ordersInBatch.length ? ordersInBatch.filter((o) => (o.status || "pending") === "pending").length : 0;
    const finishedCount = ordersInBatch.length ? ordersInBatch.filter((o) => (o.status || "") === "finished").length : Number(batchObj.finishedOrderCount || 0);

    poDeleteTarget = {
        ...batchObj,
        _totalCount: totalCount,
        _paidCount: paidCount,
        _pendingCount: pendingCount,
        _finishedCount: finishedCount
    };

    const batchTitle = `${getBatchBadgeCode(batchObj)} — ${batchObj.batchName || `Batch PO #${batchObj.batchNumber || batchObj.id}`}`;
    setText("po-del-batch-name", batchTitle);
    setText("po-del-batch-dates", `${formatDate(batchObj.tanggalBuka)} - ${formatDate(batchObj.tanggalTutup)}`);
    setText("po-del-total-orders", `${totalCount} pesanan`);
    setText("po-del-paid-orders", `${paidCount} pesanan`);
    setText("po-del-pending-orders", `${pendingCount} pesanan`);
    setText("po-del-finished-orders", `${finishedCount} pesanan`);
    setText("po-del-step2-batch-label", batchTitle);

    if (poDelFinishedStatCard) {
        poDelFinishedStatCard.classList.toggle("is-danger", finishedCount > 0);
    }

    const finishedWarn = document.getElementById("po-del-finished-warning");
    if (finishedWarn) finishedWarn.hidden = finishedCount === 0;

    setPODeleteStep(1);
    if (poDeleteConfirmInput) poDeleteConfirmInput.value = "";
    syncPODeleteInputMatch();
    if (poDeleteError) {
        poDeleteError.hidden = true;
        poDeleteError.innerText = "";
    }

    poDeleteModal.classList.add("active");
}

bindClick("po-delete-close", () => closePODeleteModal());
bindClick("po-delete-cancel-1", () => closePODeleteModal());
bindClick("po-delete-cancel-2", () => closePODeleteModal());

if (poDeleteModal) {
    poDeleteModal.addEventListener("click", (e) => {
        if (e.target === poDeleteModal) closePODeleteModal();
    });
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && poDeleteModal && poDeleteModal.classList.contains("active")) {
        closePODeleteModal();
    }
});

bindClick("po-delete-next-btn", () => {
    if (!poDeleteTarget) return;
    setPODeleteStep(2);
    if (poDeleteConfirmInput) {
        poDeleteConfirmInput.value = "";
        poDeleteConfirmInput.focus();
    }
    syncPODeleteInputMatch();
    if (poDeleteError) {
        poDeleteError.hidden = true;
        poDeleteError.innerText = "";
    }
});

bindClick("po-delete-back-btn", () => {
    setPODeleteStep(1);
    if (poDeleteError) {
        poDeleteError.hidden = true;
        poDeleteError.innerText = "";
    }
});

if (poDeleteConfirmInput) {
    poDeleteConfirmInput.addEventListener("input", syncPODeleteInputMatch);
    poDeleteConfirmInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (syncPODeleteInputMatch() && poDeleteFinalBtn && !poDeleteFinalBtn.disabled) {
                poDeleteFinalBtn.click();
            }
        }
    });
}

if (poDeleteFinalBtn) {
    poDeleteFinalBtn.addEventListener("click", async () => {
        if (!poDeleteTarget || isInvestorRole() || poDeleteInFlight) return;
        const typed = (poDeleteConfirmInput?.value || "").trim();
        if (typed !== "HAPUS") {
            if (poDeleteError) {
                poDeleteError.hidden = false;
                poDeleteError.innerText = "Ketik HAPUS secara persis untuk melanjutkan.";
            }
            return;
        }

        const deletedId = poDeleteTarget.id;
        const origText = poDeleteFinalBtn.innerText;
        poDeleteInFlight = true;
        poDeleteFinalBtn.disabled = true;
        poDeleteFinalBtn.innerText = "Menghapus...";
        if (poDeleteError) {
            poDeleteError.hidden = true;
            poDeleteError.innerText = "";
        }

        try {
            const response = await fetch(`${API_BASE}/api/admin/po/${deletedId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    confirmStep2: true,
                    confirmText: "HAPUS",
                    forceDeleteFinished: true
                })
            });

            const result = await response.json();
            if (!response.ok || !result.success) {
                if (poDeleteError) {
                    poDeleteError.hidden = false;
                    poDeleteError.innerText = result.message || "Gagal menghapus riwayat Batch PO.";
                }
                poDeleteInFlight = false;
                poDeleteFinalBtn.disabled = false;
                poDeleteFinalBtn.innerText = origText;
                return;
            }

            if (String(selectedViewPoId) === String(deletedId)) {
                selectedViewPoId = null;
            }
            closePODeleteModal(true);
            await Promise.all([
                loadOrders(),
                loadStocks(),
                loadPOSettings()
            ]);
            if (currentFinanceReport) await loadFinance();
            showAdminToast(result.message || "Riwayat Batch Pre-Order berhasil dihapus.", "success");
        } catch (err) {
            console.error("Delete PO batch error:", err);
            if (poDeleteError) {
                poDeleteError.hidden = false;
                poDeleteError.innerText = "Gagal terhubung ke server.";
            }
            poDeleteFinalBtn.disabled = false;
        } finally {
            poDeleteInFlight = false;
            poDeleteFinalBtn.innerText = origText;
        }
    });
}

function showPOStatusMsg(msg, type) {
    if (!poStatusMsg) return;
    poStatusMsg.innerText = msg;
    poStatusMsg.className = "settings-status " + type;
    if (type === "success") {
        setTimeout(() => {
            poStatusMsg.innerText = "";
            poStatusMsg.className = "settings-status";
        }, 3500);
    }
}

async function handlePOSubmit(e) {
    e.preventDefault();

    const closeVal = poCloseDate ? poCloseDate.value : "";
    const prodVal = poProductionDate ? poProductionDate.value : "";
    const openVal = poOpenDateInput ? poOpenDateInput.value : "";
    const batchName = poBatchNameInput ? poBatchNameInput.value.trim() : "";
    const maxQuota = parseInt(poMaxQuotaInput?.value || "100", 10) || 100;

    if (!closeVal) {
        showPOStatusMsg("Batas waktu tutup PO wajib diisi.", "error");
        return;
    }
    if (!prodVal) {
        showPOStatusMsg("Tanggal produksi / kirim wajib diisi.", "error");
        return;
    }

    const closeIso = new Date(closeVal).toISOString();
    const prodIso = new Date(prodVal + "T00:00:00").toISOString();
    const openIso = openVal ? new Date(openVal).toISOString() : undefined;

    const origBtnText = poSubmitBtn.innerText;
    poSubmitBtn.disabled = true;
    poSubmitBtn.innerText = "Menyimpan...";

    try {
        const isOpen = poStatusCache && poStatusCache.isOpen === true && currentPOData && currentPOData.id;
        const url = isOpen ? `${API_BASE}/api/admin/po/${currentPOData.id}` : `${API_BASE}/api/admin/po/open`;
        const method = isOpen ? "PUT" : "POST";

        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                batchName: batchName || undefined,
                tanggalBuka: openIso,
                tanggalTutup: closeIso,
                tanggalProduksi: prodIso,
                maxQuota
            })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            showPOStatusMsg(result.message || "Gagal menyimpan jadwal PO.", "error");
            return;
        }

        showPOStatusMsg(result.message || "Jadwal PO berhasil disimpan.", "success");
        if (!isOpen) {
            userPickedReferralBatch = false;
            selectedReferralPoId = null;
            selectedViewPoId = result.po?.id || null;
        }
        await loadPOSettings();

    } catch (err) {
        console.error("Submit PO error:", err);
        showPOStatusMsg("Gagal terhubung ke server.", "error");
    } finally {
        poSubmitBtn.disabled = false;
        poSubmitBtn.innerText = origBtnText;
    }
}

async function handleClosePO() {
    const confirmed = confirm("Apakah Anda yakin ingin MENUTUP Pre-Order sekarang?\n\nSetelah ditutup, pengunjung website tidak dapat membuat pesanan baru.");
    if (!confirmed) return;

    if (btnClosePo) {
        btnClosePo.disabled = true;
        btnClosePo.innerText = "Menutup PO...";
    }

    try {
        const response = await fetch(`${API_BASE}/api/admin/po/close`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            }
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            alert(result.message || "Gagal menutup Pre-Order.");
            return;
        }

        if (poBatchNameInput) poBatchNameInput.value = "";
        alert("Pre-Order berhasil ditutup.");
        await loadPOSettings();

    } catch (err) {
        console.error("Close PO error:", err);
        alert("Gagal terhubung ke server.");
    } finally {
        if (btnClosePo) {
            btnClosePo.disabled = false;
            btnClosePo.innerText = "Tutup batch sekarang";
        }
    }
}

if (poForm) {
    poForm.addEventListener("submit", handlePOSubmit);
}

if (btnClosePo) {
    btnClosePo.addEventListener("click", handleClosePO);
}
bindClick("po-header-open-btn", () => {
    document.getElementById("po-settings-card")?.scrollIntoView({ behavior: "smooth" });
    poBatchNameInput?.focus();
});

if (headerPoBadge) {
    headerPoBadge.addEventListener("click", () => switchTab("preorder"));
}

/* =========================
   KOMISI & KODE REFERRAL PER BATCH PO
   ========================= */

let referralReportCache = null;
let selectedReferralPoId = null;
let userPickedReferralBatch = false;

const poReferralBatchSelect = document.getElementById("po-referral-batch-select");
const referralRefreshBtn = document.getElementById("referral-refresh-btn");
const poReferralAddForm = document.getElementById("po-referral-add-form");
const poReferralNewCodeInput = document.getElementById("po-referral-new-code");
const poReferralNewOwnerInput = document.getElementById("po-referral-new-owner");
const poReferralAddBtn = document.getElementById("po-referral-add-btn");
const poReferralMsgEl = document.getElementById("po-referral-msg");

function calculateReferralCommissionPct(totalPcs) {
    const pcs = Math.floor(Number(totalPcs || 0));
    if (!Number.isFinite(pcs) || pcs <= 0) return 0;
    return Math.min(5, Math.max(1, Math.floor((pcs + 4) / 10)));
}

function showPOReferralMsg(msg, type) {
    if (!poReferralMsgEl) return;
    poReferralMsgEl.innerText = msg || "";
    poReferralMsgEl.className = type ? `settings-status mt-8 ${type}` : "settings-status mt-8";
    if (type === "success") {
        setTimeout(() => {
            if (poReferralMsgEl.innerText === msg) {
                poReferralMsgEl.innerText = "";
                poReferralMsgEl.className = "settings-status mt-8";
            }
        }, 3500);
    }
}

async function loadPOReferrals(poPeriodId = null) {
    const tbody = document.getElementById("po-referral-tbody");
    const token = getToken();
    if (!token) return;

    try {
        const qs = poPeriodId != null && poPeriodId !== "" ? `?poPeriodId=${encodeURIComponent(poPeriodId)}` : "";
        const response = await fetch(`${API_BASE}/api/admin/referrals${qs}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.status === 401) {
            clearToken();
            showLoginView();
            return;
        }

        const result = await response.json();
        if (!response.ok || !result.success) {
            if (tbody) {
                tbody.innerHTML = `<tr><td colspan="8" class="empty-state-sm">${escapeHtml(result.message || "Gagal memuat data referral.")}</td></tr>`;
            }
            return;
        }

        referralReportCache = result;
        if (result.selectedPoPeriodId != null) {
            selectedReferralPoId = result.selectedPoPeriodId;
        }
        renderPOReferralSection(result);

    } catch (err) {
        console.error("Load PO referrals error:", err);
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="8" class="empty-state-sm">Gagal terhubung ke server untuk memuat rekap referral.</td></tr>`;
        }
    }
}

function renderPOReferralSection(report) {
    if (!report) return;
    const periods = Array.isArray(report.periods) ? report.periods : [];
    const rows = Array.isArray(report.referrals) ? report.referrals : [];
    const totals = report.totals || {};

    if (poReferralBatchSelect) {
        if (periods.length === 0) {
            poReferralBatchSelect.innerHTML = `<option value="">Belum ada periode PO</option>`;
            poReferralBatchSelect.disabled = true;
        } else {
            poReferralBatchSelect.disabled = false;
            const activePoId = report.selectedPoPeriodId != null ? String(report.selectedPoPeriodId) : String(periods[0].id);
            poReferralBatchSelect.innerHTML = periods.map((p) => {
                const statusText = p.status === "open" ? "Aktif" : "Ditutup";
                return `<option value="${escapeHtml(String(p.id))}">${escapeHtml(p.batchName || `Batch PO #${p.id}`)} (${statusText})</option>`;
            }).join("");
            poReferralBatchSelect.value = activePoId;
        }
    }

    setText("po-ref-paid-orders", String(totals.paidOrdersCount || 0));
    setText(
        "po-ref-pending-orders-sub",
        (totals.pendingOrdersCount || 0) > 0
            ? `+ ${totals.pendingOrdersCount} pending (${totals.pendingPcs || 0} pcs)`
            : "Status Lunas & Finish batch ini"
    );
    setText("po-ref-paid-pcs", `${totals.paidPcs || 0} pcs`);
    setText("po-ref-paid-revenue", formatRupiah(totals.paidRevenue || 0));
    setText("po-ref-total-commission", formatRupiah(totals.totalCommission || 0));

    const tbody = document.getElementById("po-referral-tbody");
    if (!tbody) return;

    if (rows.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="empty-state-sm">Belum ada kode referral terdaftar.</td></tr>`;
        return;
    }

    const readOnly = isInvestorRole();

    tbody.innerHTML = rows.map((r) => {
        const paidPcs = Number(r.paidPcs || 0);
        const pct = Number(r.commissionPct != null ? r.commissionPct : calculateReferralCommissionPct(paidPcs));
        const paidRev = Number(r.paidRevenue || 0);
        const commAmt = Number(r.commissionAmount != null ? r.commissionAmount : Math.round(paidRev * pct / 100));
        const nextLabel = r.nextTierInfo?.label || (pct >= 5 ? "Maksimal 5%" : "-");
        const ownerDiffers = r.ownerName && r.ownerName.toLowerCase() !== String(r.code || "").toLowerCase();

        const statusBadge = r.isDeleted
            ? `<span class="badge-pill badge-neutral">Dihapus</span>`
            : r.isActive
                ? `<span class="badge-pill badge-green">Aktif</span>`
                : `<span class="badge-pill badge-neutral">Nonaktif</span>`;

        const orderSub = (r.pendingOrdersCount || 0) > 0
            ? `<div class="text-muted-sm mt-4">+ ${r.pendingOrdersCount} pending (${r.pendingPcs || 0} pcs)</div>`
            : "";

        const actionCell = (readOnly || r.id == null)
            ? `<span class="text-muted-sm">-</span>`
            : `
                <div class="po-referral-actions-cell">
                    <button
                        type="button"
                        class="btn-outline-sm po-ref-action-btn po-ref-toggle-btn"
                        data-ref-id="${r.id}"
                        data-active="${r.isActive ? "1" : "0"}"
                    >${r.isActive ? "Nonaktifkan" : "Aktifkan"}</button>
                    <button
                        type="button"
                        class="btn-delete-small po-ref-action-btn po-ref-delete-btn"
                        data-ref-id="${r.id}"
                        data-code="${escapeHtml(r.code || "")}"
                    >Hapus</button>
                </div>
            `;

        return `
            <tr>
                <td>
                    <strong>${escapeHtml(r.code || "-")}</strong>
                    ${ownerDiffers ? `<div class="text-muted-sm">${escapeHtml(r.ownerName)}</div>` : ""}
                </td>
                <td>${statusBadge}</td>
                <td class="align-right">
                    <strong>${r.paidOrdersCount || 0} pesanan</strong>
                    ${orderSub}
                </td>
                <td class="align-right"><strong>${paidPcs} pcs</strong></td>
                <td>
                    <span class="badge-pill ${pct > 0 ? "badge-gold" : "badge-neutral"}">${pct}%</span>
                    <div class="text-muted-sm mt-4">${escapeHtml(nextLabel)}</div>
                </td>
                <td class="align-right">${formatRupiah(paidRev)}</td>
                <td class="align-right"><strong class="text-green">${formatRupiah(commAmt)}</strong></td>
                <td class="align-right">${actionCell}</td>
            </tr>
        `;
    }).join("");

    tbody.querySelectorAll(".po-ref-toggle-btn").forEach((btn) => {
        btn.addEventListener("click", () => handleToggleReferral(btn));
    });
    tbody.querySelectorAll(".po-ref-delete-btn").forEach((btn) => {
        btn.addEventListener("click", () => handleDeleteReferral(btn));
    });
}

async function handleCreateReferral(e) {
    e.preventDefault();
    if (isInvestorRole()) return;

    const code = (poReferralNewCodeInput?.value || "").trim();
    const ownerName = (poReferralNewOwnerInput?.value || "").trim();
    if (!code) {
        showPOReferralMsg("Kode referral wajib diisi.", "error");
        return;
    }

    const origText = poReferralAddBtn ? poReferralAddBtn.innerText : "Tambah Kode Referral";
    if (poReferralAddBtn) {
        poReferralAddBtn.disabled = true;
        poReferralAddBtn.innerText = "Menambahkan...";
    }

    try {
        const response = await fetch(`${API_BASE}/api/admin/referrals`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
            body: JSON.stringify({ code, ownerName })
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
            showPOReferralMsg(result.message || "Gagal menambahkan kode referral.", "error");
            return;
        }

        if (poReferralNewCodeInput) poReferralNewCodeInput.value = "";
        if (poReferralNewOwnerInput) poReferralNewOwnerInput.value = "";
        showPOReferralMsg(result.message || "Kode referral berhasil ditambahkan.", "success");
        await loadPOReferrals(selectedReferralPoId);

    } catch (err) {
        console.error("Create referral error:", err);
        showPOReferralMsg("Gagal terhubung ke server.", "error");
    } finally {
        if (poReferralAddBtn) {
            poReferralAddBtn.disabled = false;
            poReferralAddBtn.innerText = origText;
        }
    }
}

async function handleToggleReferral(btn) {
    if (isInvestorRole()) return;
    const refId = btn.dataset.refId;
    const currentlyActive = btn.dataset.active === "1";
    const origText = btn.innerText;
    btn.disabled = true;
    btn.innerText = "...";

    try {
        const response = await fetch(`${API_BASE}/api/admin/referrals/${encodeURIComponent(refId)}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
            body: JSON.stringify({ isActive: !currentlyActive })
        });
        const result = await response.json();
        if (!response.ok || !result.success) {
            showPOReferralMsg(result.message || "Gagal mengubah status kode referral.", "error");
            btn.disabled = false;
            btn.innerText = origText;
            return;
        }

        showPOReferralMsg(result.message || "Status kode referral diperbarui.", "success");
        await loadPOReferrals(selectedReferralPoId);
    } catch (err) {
        console.error("Toggle referral error:", err);
        showPOReferralMsg("Gagal terhubung ke server.", "error");
        btn.disabled = false;
        btn.innerText = origText;
    }
}

async function handleDeleteReferral(btn) {
    if (isInvestorRole()) return;
    const refId = btn.dataset.refId;
    const codeLabel = btn.dataset.code || "kode ini";
    if (!confirm(`Hapus kode referral "${codeLabel}" dari daftar aktif?\n\nRiwayat pesanan lama yang memakai kode ini tetap tersimpan di laporan.`)) {
        return;
    }

    btn.disabled = true;
    try {
        const response = await fetch(`${API_BASE}/api/admin/referrals/${encodeURIComponent(refId)}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${getToken()}` }
        });
        const result = await response.json();
        if (!response.ok || !result.success) {
            showPOReferralMsg(result.message || "Gagal menghapus kode referral.", "error");
            btn.disabled = false;
            return;
        }

        showPOReferralMsg(result.message || "Kode referral dihapus.", "success");
        await loadPOReferrals(selectedReferralPoId);
    } catch (err) {
        console.error("Delete referral error:", err);
        showPOReferralMsg("Gagal terhubung ke server.", "error");
        btn.disabled = false;
    }
}

if (poReferralBatchSelect) {
    poReferralBatchSelect.addEventListener("change", () => {
        const val = poReferralBatchSelect.value ? Number(poReferralBatchSelect.value) : null;
        selectedReferralPoId = Number.isFinite(val) ? val : null;
        userPickedReferralBatch = true;
        loadPOReferrals(selectedReferralPoId);
    });
}

if (referralRefreshBtn) {
    referralRefreshBtn.addEventListener("click", () => {
        loadPOReferrals(userPickedReferralBatch ? selectedReferralPoId : null);
    });
}

if (poReferralAddForm) {
    poReferralAddForm.addEventListener("submit", handleCreateReferral);
}

/* =========================
   INIT
   ========================= */

(async function init() {
    initPeriodFilterControls();

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

        const meData = await response.json().catch(() => ({}));
        currentAdminRole = meData.role || "admin";
        currentAdminUsername = meData.username || (currentAdminRole === "investor" ? "velainvestor" : "Admin");
        applyRolePermissionsUI();

        showDashboardView();
        bootWorkspace();

    } catch (error) {
        console.error("Init error:", error);
        clearToken();
        showLoginView();
    }
})();