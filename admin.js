/* =========================================================
   ADMIN PANEL — VELACOOKIES (FULL EDITION + WA AI CHATBOT)
   ========================================================= */

const API_BASE = "https://velacookies-backend.hostless.app";
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

/* Finance Tab DOM */
const financeMonthInput = document.getElementById("finance-month");
const financeRefreshBtn = document.getElementById("finance-refresh");
const finRevenue = document.getElementById("fin-revenue");
const finPeriodStatus = document.getElementById("fin-period-status");
const finTotalSpent = document.getElementById("fin-total-spent");
const finNetRemaining = document.getElementById("fin-net-remaining");

const finHppPct = document.getElementById("fin-hpp-pct");
const finHppAllocated = document.getElementById("fin-hpp-allocated");
const finHppSpent = document.getElementById("fin-hpp-spent");
const finHppRemaining = document.getElementById("fin-hpp-remaining");
const finHppBar = document.getElementById("fin-hpp-bar");
const finHppUsageLabel = document.getElementById("fin-hpp-usage-label");

const finCashflowPct = document.getElementById("fin-cashflow-pct");
const finCashflowAllocated = document.getElementById("fin-cashflow-allocated");
const finCashflowSpent = document.getElementById("fin-cashflow-spent");
const finCashflowRemaining = document.getElementById("fin-cashflow-remaining");
const finCashflowBar = document.getElementById("fin-cashflow-bar");
const finCashflowUsageLabel = document.getElementById("fin-cashflow-usage-label");

const finProfitPct = document.getElementById("fin-profit-pct");
const finProfitAllocated = document.getElementById("fin-profit-allocated");
const finProfitDetail = document.getElementById("fin-profit-detail");
const finProfitFinal = document.getElementById("fin-profit-final");

const financeTabs = document.querySelectorAll(".finance-tab");
const financeFormPanels = document.querySelectorAll(".finance-form-panel");
const financeHistoryFilter = document.getElementById("finance-history-filter");
const financeHistoryHppSection = document.getElementById("finance-history-hpp-section");
const financeHistoryCfSection = document.getElementById("finance-history-cf-section");
const financeHistoryTotalFooter = document.getElementById("finance-history-total-footer");

const hppForm = document.getElementById("hpp-form");
const hppDate = document.getElementById("hpp-date");
const hppItem = document.getElementById("hpp-item");
const hppQty = document.getElementById("hpp-qty");
const hppUnit = document.getElementById("hpp-unit");
const hppAmount = document.getElementById("hpp-amount");
const hppNote = document.getElementById("hpp-note");
const hppSubmit = document.getElementById("hpp-submit");

const cashflowForm = document.getElementById("cashflow-form");
const cfDate = document.getElementById("cf-date");
const cfCategory = document.getElementById("cf-category");
const cfDesc = document.getElementById("cf-desc");
const cfAmount = document.getElementById("cf-amount");
const cfNote = document.getElementById("cf-note");
const cfSubmit = document.getElementById("cf-submit");

const hppHistoryTbody = document.getElementById("hpp-history-tbody");
const hppHistoryEmpty = document.getElementById("hpp-history-empty");
const hppHistoryMonth = document.getElementById("hpp-history-month");
const cfHistoryTbody = document.getElementById("cf-history-tbody");
const cfHistoryEmpty = document.getElementById("cf-history-empty");
const cfHistoryMonth = document.getElementById("cf-history-month");

/* WhatsApp Chatbot & Verification DOM */
const sidebarWaBadge = document.getElementById("sidebar-wa-badge");
const waBotStatusPill = document.getElementById("wa-bot-status-pill");
const waMetricTotal = document.getElementById("wa-metric-total");
const waMetricVerify = document.getElementById("wa-metric-verify");
const waMetricDp = document.getElementById("wa-metric-dp");
const waMetricHuman = document.getElementById("wa-metric-human");

const waSubtabInboxBtn = document.getElementById("wa-subtab-inbox-btn");
const waSubtabGatewayBtn = document.getElementById("wa-subtab-gateway-btn");
const waSubtabKnowledgeBtn = document.getElementById("wa-subtab-knowledge-btn");
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

let allStocks = [];
let currentFinanceMonth = "";
let currentFinanceSummary = null;
let cashflowCategories = [];
let currentPOData = null;
let poStatusCache = null;
let currentStockFilter = "all";
let stockAdjustMode = "add";
let financeHppItems = [];
let financeCfItems = [];

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
        "#hpp-form input, #hpp-form select, #hpp-form textarea, #hpp-form button",
        "#cashflow-form input, #cashflow-form select, #cashflow-form textarea, #cashflow-form button",
        "#settings-form input, #settings-form select, #settings-form textarea, #settings-form button",
        "#budget-settings-form input, #budget-settings-form select, #budget-settings-form button",
        "#wa-gateway-form input, #wa-gateway-form select, #wa-gateway-form textarea, #wa-gateway-form button",
        "#wa-setting-approve-tpl, #wa-setting-reject-tpl"
    ];
    document.querySelectorAll(writeFormSelectors.join(", ")).forEach((el) => {
        el.disabled = isInvestor;
    });
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
        "finished": "🔒 Finish",
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
    if (targetTab === "stocks") loadStocks();
    if (targetTab === "preorder") loadPOSettings();
    if (targetTab === "reports") renderDailyReport();
    if (targetTab === "whatsapp") loadWaWorkspace();
    if (targetTab === "settings") {
        loadSettings();
        loadBudgetSettings();
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
    currentFinanceSummary = null;
    showLoginView();
}

if (logoutBtn) logoutBtn.addEventListener("click", doLogout);

function bootWorkspace() {
    applyRolePermissionsUI();
    switchTab("dashboard");
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

function isAwaitingVerification(o) {
    return (o.status || "pending") === "pending" && Boolean(o.paymentProofUrl || o.customerConfirmed);
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

function renderDashboard() {
    const todayWIB = getTodayDateString();
    const yesterday = getDateStringOffset(todayWIB, -1);
    const successOrders = allOrders.filter(isPaidOrder);
    const pendingOrders = allOrders.filter((o) => (o.status || "pending") === "pending");
    const verifyOrders = pendingOrders.filter(isAwaitingVerification);
    const todayMetrics = getMetrics(successOrders.filter((o) => getLocalDateString(o.createdAt) === todayWIB));
    const yesterdayMetrics = getMetrics(successOrders.filter((o) => getLocalDateString(o.createdAt) === yesterday));
    const allMetrics = getMetrics(successOrders);

    const todayDate = new Date().toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta", weekday: "long", day: "numeric", month: "long", year: "numeric" });
    setText("dashboard-date-subtitle", `${todayDate} · ${pendingOrders.length} pesanan menunggu tindakan`);

    setText("dash-today-revenue", formatRupiah(todayMetrics.revenue));
    renderDelta(document.getElementById("dash-today-rev-delta"), todayMetrics.revenue, yesterdayMetrics.revenue);
    setText("dash-today-rev-sub", `Dari ${todayMetrics.orders} pesanan terbayar · total semua waktu ${formatRupiah(allMetrics.revenue)}`);

    setText("dash-active-orders", String(pendingOrders.length + todayMetrics.orders));
    setText("dash-pending-pill", `${pendingOrders.length} menunggu`);
    setText("dash-active-orders-sub", `${todayMetrics.orders} terbayar hari ini · ${verifyOrders.length} menunggu verifikasi`);

    setText("dash-today-pcs", `${todayMetrics.items} pcs`);
    const avg = todayMetrics.orders ? (todayMetrics.items / todayMetrics.orders).toFixed(1).replace(".0", "") : 0;
    setText("dash-avg-pcs", `Rata-rata ${avg} pcs per pesanan`);

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

    renderDashboardChart();
    renderDashboardPOCard();
    renderDashboardStockList();
}

function renderDashboardChart() {
    const chartEl = document.getElementById("dash-chart-7day");
    if (!chartEl) return;
    const today = getTodayDateString();
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const dateStr = getDateStringOffset(today, -i);
        const m = getMetrics(allOrders.filter((o) => isPaidOrder(o) && getLocalDateString(o.createdAt) === dateStr));
        days.push({ date: dateStr, ...m });
    }
    const maxRev = Math.max(...days.map((d) => d.revenue), 1);
    const maxPcs = Math.max(...days.map((d) => d.items), 1);

    chartEl.innerHTML = days.map((d) => {
        const [, mm, dd] = d.date.split("-");
        return `
            <div class="chart-bar-wrap ${d.date === today ? "is-active" : ""}" data-date="${d.date}" title="${formatRupiah(d.revenue)} · ${d.orders} pesanan · ${d.items} pcs">
                <span class="chart-bar-value">${d.orders}</span>
                <div class="chart-bar-pair">
                    <div class="chart-bar bar-rev" style="height:${Math.max((d.revenue / maxRev) * 100, 3)}%;"></div>
                    <div class="chart-bar bar-pcs" style="height:${Math.max((d.items / maxPcs) * 100, 3)}%;"></div>
                </div>
                <span class="chart-bar-label">${dd}/${mm}</span>
            </div>
        `;
    }).join("");

    chartEl.querySelectorAll(".chart-bar-wrap").forEach((bar) => {
        bar.addEventListener("click", () => {
            if (reportDateInput) reportDateInput.value = bar.dataset.date;
            switchTab("reports");
        });
    });

    const totalRev = days.reduce((s, d) => s + d.revenue, 0);
    setText("dash-7d-total-rev", formatRupiah(totalRev));
    setText("dash-7d-avg-rev", formatRupiah(Math.round(totalRev / 7)));
    setText("dash-7d-total-orders", `${days.reduce((s, d) => s + d.orders, 0)} pesanan`);
    setText("dash-7d-total-pcs", `${days.reduce((s, d) => s + d.items, 0)} pcs`);
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
    setText("dash-po-batch-code", po ? `Periode #${po.id}` : "Batch PO");
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

bindClick("dash-queue-verify", () => { switchTab("whatsapp"); switchWaSubtab("verification"); });
bindClick("dash-queue-wa", () => { switchTab("whatsapp"); setWaInboxFilter("needs_human"); switchWaSubtab("inbox"); });
bindClick("dash-queue-stock", () => { currentStockFilter = "low"; switchTab("stocks"); });
bindClick("dash-go-po-btn", () => switchTab("preorder"));
bindClick("dash-go-stocks-btn", () => switchTab("stocks"));
bindClick("dash-export-btn", () => {
    setReportDateToToday();
    exportDailyCSV();
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
            const items = (order.items || []).map((it) => `${it.name} ${it.addonName || ""}`).join(" ").toLowerCase();
            return name.includes(query) || wa.includes(query) || orderId.includes(query) || items.includes(query);
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
if (refreshBtn) refreshBtn.addEventListener("click", () => loadOrders());
if (overviewRefreshBtn) overviewRefreshBtn.addEventListener("click", () => { loadOrders(); loadStocks(); loadPOSettings(); loadWaWorkspace({ silent: true }); });

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
    if (statusVal === "pending" && order.paymentProofUrl) return { text: "Bukti terunggah", cls: "claimed" };
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

function buildOrderRowHtml(order, isOverviewTable = false) {
    const locLabel = getLocationLabel(order.location);
    const locClass = getLocationClass(order.location);
    const custType = getCustomerType(order);
    const paymentLabel = (order.paymentMethod || "cash") === "qris" ? "QRIS" : "COD";
    const pcsCount = getOrderTotalCookies(order);
    const paySub = getPaymentStatusSub(order);
    const itemsText = escapeHtml(getOrderItemsSummary(order));
    const detailBtn = `<button type="button" class="btn-detail" data-order-id="${escapeHtml(order.orderId)}">Detail &rarr;</button>`;

    if (isOverviewTable) {
        return `
            <tr>
                <td><span class="cell-order-id">${escapeHtml(order.orderId || "-")}</span></td>
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
            <td><span class="cell-order-id">${escapeHtml(order.orderId || "-")}</span></td>
            <td><span class="cell-order-date">${formatDate(order.createdAt)}</span></td>
            <td>
                <div class="cell-customer">
                    <span class="customer-name">${escapeHtml(order.customerName || "-")}</span>
                    <span class="customer-badge ${custType}">${custType === "baru" ? "Baru" : "Lama"}</span>
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
}

function buildOrderTimelineHtml(order) {
    const steps = [{ label: "Pesanan dibuat", time: order.createdAt, done: true }];
    if (order.customerConfirmed || order.paymentProofUrl) {
        steps.push({ label: order.paymentProofUrl ? "Bukti pembayaran diunggah" : "Pelanggan klaim sudah bayar", time: order.customerConfirmedAt, done: true });
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
        actionButtons.push(`<span class="locked-order-pill">👁️ Mode Investor (Hanya Lihat Data)</span>`);
    } else if (statusVal === "finished") {
        actionButtons.push(`<span class="locked-order-pill">🔒 Pesanan Finish (Terkunci Permanen)</span>`);
        actionButtons.push(`<a class="btn-outline" href="https://wa.me/${normalizeWA(order.whatsapp)}" target="_blank" rel="noopener">Hubungi WA</a>`);
    } else {
        if (statusVal === "success") {
            actionButtons.push(`<button type="button" class="btn-finish detail-action-btn" data-action="finish">🔒 Tandai Finish</button>`);
        } else {
            actionButtons.push(`<button type="button" class="btn-primary detail-action-btn" data-action="approve">Terima pembayaran</button>`);
        }
        if (statusVal === "pending" && (order.paymentProofUrl || order.customerConfirmed)) {
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
                </div>
                <p class="page-subtitle">Dibuat ${formatDate(order.createdAt)} WIB · ${pcs} pcs · ${paymentLabel}</p>
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
                if (order.paymentProofUrl || order.customerConfirmed) {
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
                <div class="locked-order-pill" style="justify-content:center;width:100%;">👁️ Mode Investor (Hanya Lihat Data)</div>
            ` : statusVal === "finished" ? `
                <div class="locked-order-pill" style="justify-content:center;width:100%;">🔒 Pesanan Finish (Terkunci Permanen)</div>
            ` : `
                <p class="mini-label" style="margin-bottom:4px;">Ubah Status</p>

                ${statusVal === "success"
                    ? `<button class="action-btn btn-finish" data-action="finish" data-order-id="${order.orderId}">🔒 Tandai Finish</button>`
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
        finishOrderSubmitBtn.innerText = "🔒 Ya, Finish & Kunci Pesanan";
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
   FINANCE — LOAD & RENDER
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

function renderFinanceSummary(s) {
    if (!s) return;

    finRevenue.innerText = formatRupiah(s.revenue);

    const statusMap = {
        "open": "Periode masih berjalan",
        "reviewed": "Periode sedang direview",
        "closed": "Periode sudah ditutup"
    };
    finPeriodStatus.innerText = statusMap[s.periodStatus] || "-";

    const spent = (s.hppSpent || 0) + (s.cashflowSpent || 0);
    if (finTotalSpent) finTotalSpent.innerText = formatRupiah(spent);
    if (finNetRemaining) finNetRemaining.innerText = formatRupiah(s.profitFinal);
    if (financeHistoryTotalFooter) financeHistoryTotalFooter.innerText = formatRupiah(spent);

    const marginPct = s.revenue > 0 ? Math.round((s.profitFinal / s.revenue) * 100) : 0;
    setText("fin-margin-sub", `Margin bersih ${marginPct}% dari omzet`);

    const monthPrefix = currentFinanceMonth || getCurrentMonthString();
    const monthOrders = allOrders.filter((o) => getLocalDateString(o.createdAt).startsWith(monthPrefix));
    const pendingOrders = monthOrders.filter((o) => (o.status || "pending") === "pending");
    const pendingSum = pendingOrders.reduce((acc, o) => acc + (o.total || 0), 0);
    setText("fin-pending-funds", formatRupiah(pendingSum));
    setText("fin-pending-funds-sub", `Dari ${pendingOrders.length} pesanan belum disetujui`);

    const successMonthOrders = monthOrders.filter((o) => o.status === "success");
    const qrisSum = successMonthOrders.filter((o) => (o.paymentMethod || "cash") === "qris").reduce((acc, o) => acc + (o.total || 0), 0);
    const codSum = successMonthOrders.filter((o) => (o.paymentMethod || "cash") !== "qris").reduce((acc, o) => acc + (o.total || 0), 0);
    setText("fin-recon-qris", formatRupiah(qrisSum));
    setText("fin-recon-cod", formatRupiah(codSum));
    setText("fin-recon-out", `- ${formatRupiah(spent)}`);
    setText("fin-recon-net", formatRupiah((qrisSum + codSum) - spent));

    finHppPct.innerText = s.hppPct + "%";
    finHppAllocated.innerText = formatRupiah(s.hppAllocated);
    finHppSpent.innerText = formatRupiah(s.hppSpent);
    finHppRemaining.innerText = formatRupiah(s.hppRemaining);
    updateProgressBar(finHppBar, s.hppSpent, s.hppAllocated, finHppUsageLabel);

    finCashflowPct.innerText = s.cashflowPct + "%";
    finCashflowAllocated.innerText = formatRupiah(s.cashflowAllocated);
    finCashflowSpent.innerText = formatRupiah(s.cashflowSpent);
    finCashflowRemaining.innerText = formatRupiah(s.cashflowRemaining);
    updateProgressBar(finCashflowBar, s.cashflowSpent, s.cashflowAllocated, finCashflowUsageLabel);

    finProfitPct.innerText = s.profitPct + "%";
    finProfitAllocated.innerText = formatRupiah(s.profitAllocated);
    finProfitDetail.innerText = `-${formatRupiah(spent)}`;
    finProfitFinal.innerText = formatRupiah(s.profitFinal);
}

function updateProgressBar(el, spent, allocated, labelEl) {
    if (!el) return;
    if (allocated <= 0) {
        el.style.width = "0%";
        el.classList.remove("over");
        if (labelEl) labelEl.innerText = "0% terpakai";
        return;
    }
    const rawPct = ((spent / allocated) * 100).toFixed(1).replace(".0", "");
    const pct = Math.min((spent / allocated) * 100, 100);
    el.style.width = pct + "%";
    el.classList.toggle("over", spent > allocated);
    if (labelEl) labelEl.innerText = `${rawPct}% terpakai`;
}

function renderUnifiedFinanceTable() {
    const unifiedTbody = document.getElementById("finance-unified-tbody");
    if (!unifiedTbody) return;

    const filterVal = financeHistoryFilter?.value || "all";
    const monthPrefix = currentFinanceMonth || getCurrentMonthString();
    const rows = [];

    if (filterVal === "all" || filterVal === "in") {
        allOrders.filter((o) => isPaidOrder(o) && getLocalDateString(o.createdAt).startsWith(monthPrefix)).forEach((o) => {
            rows.push({
                date: getLocalDateString(o.createdAt),
                sortTime: parseISOString(o.createdAt)?.getTime() || 0,
                desc: `Pesanan ${o.orderId} — ${o.customerName || "Pelanggan"}`,
                sub: getOrderItemsSummary(o),
                category: (o.paymentMethod || "cash") === "qris" ? "Penjualan QRIS" : "Penjualan COD",
                type: "in",
                typeBadge: `<span class="badge-pill badge-green">Masuk</span>`,
                amount: o.total || 0,
                actionHtml: `<button type="button" class="btn-detail fin-order-detail-btn" data-order-id="${escapeHtml(o.orderId)}">Detail</button>`
            });
        });
    }

    if (filterVal === "all" || filterVal === "hpp") {
        financeHppItems.forEach((item) => {
            const qtyText = item.quantity ? ` (${item.quantity}${item.unit ? " " + item.unit : ""})` : "";
            rows.push({
                date: item.purchaseDate,
                sortTime: new Date((item.purchaseDate || "1970-01-01") + "T12:00:00Z").getTime(),
                desc: `${item.itemName}${qtyText}`,
                sub: item.note || "",
                category: "Bahan Baku (HPP)",
                type: "out",
                typeBadge: `<span class="badge-pill badge-gold">Keluar · HPP</span>`,
                amount: item.amount || 0,
                actionHtml: isInvestorRole() ? `<span class="text-muted-sm">-</span>` : `<button type="button" class="btn-delete-small" data-hpp-id="${item.id}">Hapus</button>`
            });
        });
    }

    if (filterVal === "all" || filterVal === "cashflow") {
        financeCfItems.forEach((item) => {
            rows.push({
                date: item.transactionDate,
                sortTime: new Date((item.transactionDate || "1970-01-01") + "T12:00:00Z").getTime(),
                desc: item.description || "-",
                sub: item.note || "",
                category: item.categoryName || "Operasional",
                type: "out",
                typeBadge: `<span class="badge-pill badge-neutral">Keluar · Operasional</span>`,
                amount: item.amount || 0,
                actionHtml: isInvestorRole() ? `<span class="text-muted-sm">-</span>` : `<button type="button" class="btn-delete-small" data-cf-id="${item.id}">Hapus</button>`
            });
        });
    }

    rows.sort((a, b) => b.sortTime - a.sortTime);

    if (rows.length === 0) {
        unifiedTbody.innerHTML = `<tr><td colspan="6" class="empty-state-sm">Belum ada transaksi tercatat pada periode ini.</td></tr>`;
        return;
    }

    unifiedTbody.innerHTML = rows.map((r) => `
        <tr>
            <td>${formatDateShort(r.date)}</td>
            <td>
                <strong>${escapeHtml(r.desc)}</strong>
                ${r.sub ? `<small style="display:block;color:var(--text-muted);">${escapeHtml(r.sub)}</small>` : ""}
            </td>
            <td>${escapeHtml(r.category)}</td>
            <td>${r.typeBadge}</td>
            <td class="align-right"><strong class="${r.type === "in" ? "text-green" : "text-danger"}">${r.type === "in" ? "+" : "-"}${formatRupiah(r.amount)}</strong></td>
            <td class="align-right">${r.actionHtml}</td>
        </tr>
    `).join("");

    unifiedTbody.querySelectorAll("[data-hpp-id]").forEach((btn) => {
        btn.addEventListener("click", () => deleteHppPurchase(Number(btn.dataset.hppId)));
    });
    unifiedTbody.querySelectorAll("[data-cf-id]").forEach((btn) => {
        btn.addEventListener("click", () => deleteCashflowTransaction(Number(btn.dataset.cfId)));
    });
    unifiedTbody.querySelectorAll(".fin-order-detail-btn").forEach((btn) => {
        btn.addEventListener("click", () => openOrderDetailPage(btn.dataset.orderId));
    });
}

if (financeHistoryFilter) {
    financeHistoryFilter.addEventListener("change", () => {
        renderUnifiedFinanceTable();
    });
}

bindClick("finance-scroll-form-btn", () => {
    document.getElementById("finance-form-card")?.scrollIntoView({ behavior: "smooth" });
});
bindClick("fin-edit-allocation-link", () => {
    switchTab("settings");
    setTimeout(() => document.getElementById("sec-budget-allocation")?.scrollIntoView({ behavior: "smooth" }), 80);
});

async function loadHppHistory() {
    if (hppHistoryMonth) hppHistoryMonth.innerText = currentFinanceMonth;

    try {
        const response = await fetch(
            `${API_BASE}/api/admin/finance/hpp-purchases?month=${currentFinanceMonth}`,
            { headers: { "Authorization": `Bearer ${getToken()}` } }
        );

        const result = await response.json();
        if (!response.ok || !result.success) return;

        financeHppItems = result.items || [];
        renderUnifiedFinanceTable();

    } catch (error) {
        console.error("Load HPP history error:", error);
    }
}

async function loadCashflowHistory() {
    if (cfHistoryMonth) cfHistoryMonth.innerText = currentFinanceMonth;

    try {
        const response = await fetch(
            `${API_BASE}/api/admin/finance/cashflow-transactions?month=${currentFinanceMonth}`,
            { headers: { "Authorization": `Bearer ${getToken()}` } }
        );

        const result = await response.json();
        if (!response.ok || !result.success) return;

        financeCfItems = result.items || [];
        renderUnifiedFinanceTable();

    } catch (error) {
        console.error("Load cashflow history error:", error);
    }
}

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

            hppSubmit.innerText = "Tersimpan";
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

            cfSubmit.innerText = "Tersimpan";
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
   FINANCE — EXPORT EXCEL (100% FULL STYLING)
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
        subCell.value = `Periode: ${currentFinanceMonth}   •   Dibuat: ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}`;
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
}

function renderBotHealthBanner(botHealth, isBotOn = true) {
    if (botHealth) {
        waBotHealthCache = botHealth;
    }
    const bh = botHealth || waBotHealthCache || {};
    const activeModel = bh.activeModel || bh.primaryModel || "gemini-3.8-flash";
    const primaryModel = bh.primaryModel || "gemini-3.8-flash";
    const fallbackModel = bh.fallbackModel || "gemini-3-flash-preview";
    const healthStatus = bh.status || "healthy";

    if (waSettingBotActiveTitle) {
        waSettingBotActiveTitle.innerText = `Aktifkan Balasan Otomatis AI (${activeModel})`;
    }

    if (waBotStatusPill) {
        if (!isBotOn) {
            waBotStatusPill.innerText = "Bot AI Nonaktif (Manual)";
            waBotStatusPill.className = "badge-pill badge-gold";
        } else if (healthStatus === "error") {
            waBotStatusPill.innerText = bh.statusLabel || "API Key / SDK Belum Aktif";
            waBotStatusPill.className = "badge-pill badge-danger";
        } else if (healthStatus === "degraded") {
            waBotStatusPill.innerText = bh.statusLabel || `Terdegradasi (Fallback · ${activeModel})`;
            waBotStatusPill.className = "badge-pill badge-gold";
        } else if (healthStatus === "failover") {
            waBotStatusPill.innerText = `AI Aktif · Failover (${activeModel})`;
            waBotStatusPill.className = "badge-pill badge-green";
        } else {
            waBotStatusPill.innerText = `AI Aktif · ${activeModel}`;
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
            waHealthStatusBadge.innerText = bh.statusLabel || `Failover Aktif · ${activeModel}`;
            waHealthStatusBadge.className = "badge-pill badge-green";
        } else {
            waHealthStatusBadge.innerText = bh.statusLabel || `AI Sehat · ${activeModel}`;
            waHealthStatusBadge.className = "badge-pill badge-green";
        }
    }

    if (waHealthActiveModel) {
        const cooldownSec = Number(bh.primaryCooldownRemainingSec || 0);
        waHealthActiveModel.innerText = cooldownSec > 0
            ? `${activeModel} (Cooldown utama ${cooldownSec} dtk)`
            : activeModel;
    }
    if (waHealthModelsPair) {
        waHealthModelsPair.innerText = `${primaryModel} -> ${fallbackModel}`;
    }
    if (waHealthThinkingTimeout) {
        waHealthThinkingTimeout.innerText = `thinking: ${bh.thinkingLevel || "low"} · batas ${bh.timeoutSeconds || 15} dtk`;
    }
    if (waHealthApikeyStatus) {
        const ok = bh.apiKeyConfigured !== false && bh.sdkInstalled !== false;
        waHealthApikeyStatus.innerText = ok ? "API Key & SDK google-genai Aktif" : "API Key / SDK Belum Siap";
        waHealthApikeyStatus.className = ok ? "text-green" : "";
    }

    const s24 = bh.stats24h || {};
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
            const hasProof = c.order && (c.order.paymentProofUrl || c.order.customerConfirmed);
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
            verifBadge = `<span class="status-badge status-finished">🔒 Finish</span>`;
        } else if (c.order && c.order.status === "success") {
            verifBadge = `<span class="status-badge status-success">Lunas</span>`;
        } else if (c.order && (c.order.paymentProofUrl || c.order.customerConfirmed)) {
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

function buildAdminReceiptAnalysisBoxHtml(order, compact = false) {
    const ai = order && order.aiReceiptAnalysis;
    const proofUrl = order && order.paymentProofUrl;
    if (!ai && !proofUrl) {
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
            ${proofUrl ? `<a href="${escapeHtml(proofUrl)}" target="_blank" rel="noopener" title="Klik untuk lihat ukuran penuh"><img src="${escapeHtml(proofUrl)}" alt="Struk Pembayaran" class="wa-proof-preview-img" style="margin-top:8px;max-height:${compact ? "180px" : "260px"};width:auto;max-width:100%;border-radius:8px;display:block;"></a>` : ""}
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
                <div class="locked-order-pill" style="justify-content:center;width:100%;">👁️ Mode Investor (Hanya Lihat Data)</div>
            ` : order.status === "finished" ? `
                <div class="locked-order-pill" style="justify-content:center;width:100%;">🔒 Pesanan Finish (Terkunci Permanen)</div>
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
   SETTINGS & BUDGET ALLOCATION
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

/* Budget Allocation Settings (/api/admin/finance/settings) */
const budgetSettingsForm = document.getElementById("budget-settings-form");
const budgetHppInput = document.getElementById("budget-hpp-pct");
const budgetCfInput = document.getElementById("budget-cf-pct");
const budgetProfitInput = document.getElementById("budget-profit-pct");
const budgetTotalBadge = document.getElementById("budget-total-pct-badge");
const budgetStatusEl = document.getElementById("budget-settings-status");
const budgetSubmitBtn = document.getElementById("budget-settings-submit");

function updateBudgetTotalBadge() {
    if (!budgetTotalBadge) return;
    const sum = (parseInt(budgetHppInput?.value || "0", 10) || 0)
        + (parseInt(budgetCfInput?.value || "0", 10) || 0)
        + (parseInt(budgetProfitInput?.value || "0", 10) || 0);
    budgetTotalBadge.innerText = `Total: ${sum}%`;
    budgetTotalBadge.className = `badge-pill ${sum === 100 ? "badge-green" : "badge-danger"}`;
}

[budgetHppInput, budgetCfInput, budgetProfitInput].forEach((inp) => {
    if (inp) inp.addEventListener("input", updateBudgetTotalBadge);
});

async function loadBudgetSettings() {
    if (!budgetSettingsForm) return;
    try {
        const res = await fetch(`${API_BASE}/api/admin/finance/settings`, {
            headers: { "Authorization": `Bearer ${getToken()}` }
        });
        const data = await res.json();
        if (!res.ok || !data.success || !data.settings) return;
        if (budgetHppInput) budgetHppInput.value = data.settings.hppPct;
        if (budgetCfInput) budgetCfInput.value = data.settings.cashflowPct;
        if (budgetProfitInput) budgetProfitInput.value = data.settings.profitPct;
        updateBudgetTotalBadge();
    } catch (err) {
        console.error("Load budget settings error:", err);
    }
}

if (budgetSettingsForm) {
    budgetSettingsForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const hppPct = parseInt(budgetHppInput?.value || "0", 10);
        const cashflowPct = parseInt(budgetCfInput?.value || "0", 10);
        const profitPct = parseInt(budgetProfitInput?.value || "0", 10);

        if (hppPct + cashflowPct + profitPct !== 100) {
            if (budgetStatusEl) {
                budgetStatusEl.innerText = "Total persentase wajib tepat 100%.";
                budgetStatusEl.className = "settings-status error";
            }
            return;
        }

        if (budgetSubmitBtn) budgetSubmitBtn.disabled = true;
        try {
            const res = await fetch(`${API_BASE}/api/admin/finance/settings`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify({ hppPct, cashflowPct, profitPct })
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                if (budgetStatusEl) {
                    budgetStatusEl.innerText = data.message || "Gagal menyimpan rasio anggaran.";
                    budgetStatusEl.className = "settings-status error";
                }
                return;
            }
            if (budgetStatusEl) {
                budgetStatusEl.innerText = "Rasio anggaran berhasil disimpan.";
                budgetStatusEl.className = "settings-status success";
                setTimeout(() => { budgetStatusEl.innerText = ""; }, 3000);
            }
        } catch (err) {
            console.error("Save budget settings error:", err);
        } finally {
            if (budgetSubmitBtn) budgetSubmitBtn.disabled = false;
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

    } catch (err) {
        console.error("Load PO settings error:", err);
    }
}

function renderPOPage() {
    const result = poStatusCache || {};
    const po = currentPOData;
    const isOpen = result.isOpen === true;
    const history = Array.isArray(result.history) ? result.history : [];

    if (headerPoBadge && headerPoText) {
        headerPoBadge.classList.toggle("closed", !isOpen);
        headerPoText.innerText = isOpen ? "Pre-order dibuka" : "Pre-order ditutup";
    }
    const sidebarPoBadge = document.getElementById("sidebar-po-badge");
    if (sidebarPoBadge) {
        sidebarPoBadge.innerText = isOpen ? "Buka" : "Tutup";
    }

    if (poCurrentBadge) {
        poCurrentBadge.className = `badge-pill ${isOpen ? "badge-green" : "badge-neutral"}`;
        poCurrentBadge.innerText = isOpen ? "PO DIBUKA" : "PO DITUTUP";
    }

    setText("po-hero-id-label", po ? `Periode #${po.id}` : "Belum ada periode");
    if (poInfoStatus) {
        poInfoStatus.innerText = po ? (po.batchName || `Batch PO #${po.id}`) : "Belum Ada Batch Pre-Order";
    }
    setText("po-hero-subtitle", isOpen
        ? "Batch pre-order sedang aktif menerima pesanan dari pelanggan di halaman toko."
        : "Pre-order sedang ditutup. Buka periode baru di formulir pengaturan batch untuk menerima pesanan.");

    const batchOrders = po ? getPOBatchOrders(po.id) : [];
    const allocatedPcs = batchOrders.reduce((s, o) => s + getOrderTotalCookies(o), 0);
    const maxQuota = po ? Number(po.maxQuota || 100) : 100;
    const quotaPct = maxQuota > 0 ? Math.min(Math.round((allocatedPcs / maxQuota) * 100), 100) : 0;
    const remainingPcs = Math.max(0, maxQuota - allocatedPcs);

    setText("po-hero-allocated-pcs", String(allocatedPcs));
    setText("po-hero-max-quota", `/ ${maxQuota} pcs`);
    const heroBar = document.getElementById("po-hero-progress-bar");
    if (heroBar) heroBar.style.width = `${quotaPct}%`;
    setText("po-hero-orders-count", `${batchOrders.length} pesanan masuk`);
    setText("po-hero-remaining-pcs", `Tersisa ${remainingPcs} pcs`);

    setText("po-info-open", po?.tanggalBuka ? formatDate(po.tanggalBuka) : "-");
    if (poInfoClose) poInfoClose.innerText = po?.tanggalTutup ? formatDate(po.tanggalTutup) : "-";
    if (poInfoProduction) poInfoProduction.innerText = po?.tanggalProduksi ? formatDateShort(getLocalDateString(po.tanggalProduksi)) : "-";

    const estRev = batchOrders.reduce((s, o) => s + (o.total || 0), 0);
    const paidRev = batchOrders.filter(isPaidOrder).reduce((s, o) => s + (o.total || 0), 0);
    setText("po-hero-est-revenue", formatRupiah(estRev));
    setText("po-hero-paid-revenue", `${formatRupiah(paidRev)} sudah lunas`);

    if (btnClosePo) {
        btnClosePo.style.display = isOpen ? "inline-flex" : "none";
    }

    if (poFormTitle && poSubmitBtn) {
        if (isOpen && po) {
            poFormTitle.innerText = "Perbarui jadwal & kuota batch aktif";
            poSubmitBtn.innerText = "Simpan perubahan jadwal";
            if (poBatchNameInput) poBatchNameInput.value = po.batchName || "";
            if (poOpenDateInput) poOpenDateInput.value = toDatetimeLocalValue(po.tanggalBuka);
            if (poCloseDate) poCloseDate.value = toDatetimeLocalValue(po.tanggalTutup);
            if (poProductionDate && po.tanggalProduksi) {
                poProductionDate.value = getLocalDateString(po.tanggalProduksi);
            }
            if (poMaxQuotaInput) poMaxQuotaInput.value = po.maxQuota || 100;
        } else {
            poFormTitle.innerText = "Buka periode pre-order baru";
            poSubmitBtn.innerText = "Buka Pre-Order Sekarang";
            const nextNum = (po?.id || 0) + 1;
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
            if (poMaxQuotaInput) poMaxQuotaInput.value = po?.maxQuota || 100;
        }
    }

    renderPOVariantAllocation(batchOrders, allocatedPcs);
    renderPOLocationCards(batchOrders);
    renderPOParticipants(batchOrders);
    renderPOHistory(history);
}

function renderPOVariantAllocation(batchOrders, totalPcs) {
    const tbody = document.getElementById("po-variant-allocation-tbody");
    setText("po-variant-total-badge", `Total ${totalPcs} pcs`);
    if (!tbody) return;

    const map = {};
    batchOrders.forEach((o) => {
        const seenInOrder = new Set();
        (o.items || []).forEach((it) => {
            const key = `${it.productId || it.name}||${it.addonName || ""}`;
            const label = it.addonName ? `${it.name} (+ ${it.addonName})` : it.name;
            if (!map[key]) map[key] = { label, orders: 0, pcs: 0, rev: 0 };
            if (!seenInOrder.has(key)) {
                map[key].orders += 1;
                seenInOrder.add(key);
            }
            map[key].pcs += it.quantity || 0;
            map[key].rev += it.subtotal || ((it.price || 0) * (it.quantity || 0));
        });
    });

    const list = Object.values(map).sort((a, b) => b.pcs - a.pcs);
    if (list.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="empty-state-sm">Belum ada item teralokasi pada batch ini.</td></tr>`;
        return;
    }

    tbody.innerHTML = list.map((v) => {
        const pct = totalPcs > 0 ? Math.round((v.pcs / totalPcs) * 100) : 0;
        return `
            <tr>
                <td><strong>${escapeHtml(v.label)}</strong></td>
                <td class="align-right">${v.orders} pesanan</td>
                <td class="align-right"><strong>${v.pcs} pcs</strong></td>
                <td>${pct}% dari batch</td>
                <td class="align-right">${formatRupiah(v.rev)}</td>
            </tr>
        `;
    }).join("");
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

function renderPOParticipants(batchOrders) {
    const tbody = document.getElementById("po-participants-tbody");
    setText("po-participants-count-badge", `${batchOrders.length} pesanan`);
    if (!tbody) return;

    const q = (poParticipantSearch?.value || "").trim().toLowerCase();
    const f = poParticipantFilter?.value || "all";

    const filtered = batchOrders.filter((o) => {
        if (f !== "all" && (o.status || "pending") !== f) return false;
        if (q) {
            return (o.orderId || "").toLowerCase().includes(q)
                || (o.customerName || "").toLowerCase().includes(q)
                || (o.whatsapp || "").toLowerCase().includes(q);
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
            <td><strong>${escapeHtml(o.customerName || "-")}</strong></td>
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

if (poParticipantSearch) poParticipantSearch.addEventListener("input", () => renderPOParticipants(currentPOData ? getPOBatchOrders(currentPOData.id) : []));
if (poParticipantFilter) poParticipantFilter.addEventListener("change", () => renderPOParticipants(currentPOData ? getPOBatchOrders(currentPOData.id) : []));

function renderPOHistory(history) {
    const tbody = document.getElementById("po-history-tbody");
    if (!tbody) return;
    if (!history || history.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="empty-state-sm">Belum ada riwayat periode pre-order.</td></tr>`;
        return;
    }

    tbody.innerHTML = history.map((h) => {
        const isOpen = h.status === "open";
        return `
            <tr>
                <td><strong>#${h.id}</strong></td>
                <td>${escapeHtml(h.batchName || `Batch PO #${h.id}`)}</td>
                <td>${formatDate(h.tanggalBuka)} - ${formatDate(h.tanggalTutup)}</td>
                <td>${h.tanggalProduksi ? formatDateShort(getLocalDateString(h.tanggalProduksi)) : "-"}</td>
                <td class="align-right">${h.orderCount || 0} pesanan</td>
                <td class="align-right"><strong>${h.allocatedPcs || 0} / ${h.maxQuota || 100} pcs</strong></td>
                <td><span class="badge-pill ${isOpen ? "badge-green" : "badge-neutral"}">${isOpen ? "Aktif" : "Ditutup"}</span></td>
            </tr>
        `;
    }).join("");
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