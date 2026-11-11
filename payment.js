/* =========================
   PAYMENT PAGE — VELACOOKIES
   ========================= */

const API_BASE = "https://velacookies-production-d6e05223.up.railway.app";


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
const titleEl = document.getElementById("payment-title");

const orderIdEl = document.getElementById("payment-order-id");
const customerNameEl = document.getElementById("payment-customer-name");
const locationEl = document.getElementById("payment-location");
const totalLabelEl = document.getElementById("payment-total-label");
const totalEl = document.getElementById("payment-total");
const totalSubnoteEl = document.getElementById("payment-total-subnote");

const qrImageEl = document.getElementById("payment-qr-image");
const qrisOwnerEl = document.getElementById("payment-qris-owner");

const itemsEl = document.getElementById("payment-items");
const itemsTotalEl = document.getElementById("payment-items-total");

const expiryInfoEl = document.getElementById("payment-expiry-info");
const expiryCountdownEl = document.getElementById("payment-expiry-countdown");

/* Upload Bukti Bayar (Phase 2) */
const uploadBoxEl = document.getElementById("payment-upload-box");
const uploadBadgeEl = document.getElementById("payment-upload-badge");
const proofInputEl = document.getElementById("payment-proof-input");
const uploadDropzoneEl = document.getElementById("payment-upload-dropzone");
const uploadEmptyEl = document.getElementById("payment-upload-empty");
const uploadPreviewWrapEl = document.getElementById("payment-upload-preview-wrap");
const proofPreviewImgEl = document.getElementById("payment-proof-preview-img");
const uploadSavedBannerEl = document.getElementById("payment-upload-saved-banner");
const proofFileInfoEl = document.getElementById("payment-proof-file-info");
const proofChangeBtnEl = document.getElementById("payment-proof-change-btn");
const uploadStatusEl = document.getElementById("payment-upload-status");
const gateHintEl = document.getElementById("payment-gate-hint");

const confirmBtn = document.getElementById("payment-confirm-btn");
const waBtn = document.getElementById("payment-wa-btn");
const confirmCheckbox = document.getElementById("payment-confirm-checkbox");

const successModal = document.getElementById("payment-success-modal");
const modalWaBtn = document.getElementById("payment-modal-wa");
const modalCloseBtn = document.getElementById("payment-modal-close");


/* =========================
   STATE
   ========================= */

let currentOrder = null;
let paymentSettings = {
    adminWaNumber: "6285117122454",
    qrisImageUrl: "images/qris.jpeg",
    qrisOwnerName: "Velacookies"
};

let countdownInterval = null;
let isUploadingProof = false;
let localPreviewUploadedInSession = false;

const ALLOWED_PROOF_MIMES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_PROOF_BYTES = 2.5 * 1024 * 1024;


/* =========================
   HELPERS
   ========================= */

function formatRupiah(number) {
    return "Rp" + Number(number || 0).toLocaleString("id-ID");
}

function formatFileSize(bytes) {
    if (!bytes || bytes <= 0) return "";
    if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(0) + " KB";
    }
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
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

function openWhatsApp(phone, message) {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}


/* =========================
   IMAGE COMPRESSION (≤ 2.5 MB)
   ========================= */

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.onerror = () => reject(new Error("Gagal membaca file gambar."));
        reader.readAsDataURL(file);
    });
}

function estimateBase64Bytes(dataUrl) {
    const commaIdx = dataUrl.indexOf(",");
    if (commaIdx === -1) return dataUrl.length;
    const b64 = dataUrl.slice(commaIdx + 1);
    return Math.ceil((b64.length * 3) / 4);
}

async function compressImageToDataUrl(file) {
    const rawDataUrl = await readFileAsDataURL(file);

    /* Jika sudah kecil (≤ 900 KB) dan tipe didukung, langsung pakai */
    if (file.size <= 900 * 1024 && ["image/jpeg", "image/png", "image/webp"].includes(file.type.toLowerCase())) {
        return {
            dataUrl: rawDataUrl,
            byteLength: file.size
        };
    }

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            try {
                const maxDim = 1600;
                let width = img.naturalWidth || img.width;
                let height = img.naturalHeight || img.height;

                if (width > maxDim || height > maxDim) {
                    const ratio = Math.min(maxDim / width, maxDim / height);
                    width = Math.max(1, Math.round(width * ratio));
                    height = Math.max(1, Math.round(height * ratio));
                }

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(0, 0, width, height);
                ctx.drawImage(img, 0, 0, width, height);

                let quality = 0.84;
                let compressedUrl = canvas.toDataURL("image/jpeg", quality);
                let byteLen = estimateBase64Bytes(compressedUrl);

                while (byteLen > MAX_PROOF_BYTES && quality > 0.45) {
                    quality -= 0.12;
                    compressedUrl = canvas.toDataURL("image/jpeg", quality);
                    byteLen = estimateBase64Bytes(compressedUrl);
                }

                resolve({
                    dataUrl: compressedUrl,
                    byteLength: byteLen
                });
            } catch (err) {
                reject(err);
            }
        };
        img.onerror = () => reject(new Error("File bukan gambar yang valid."));
        img.src = rawDataUrl;
    });
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
    const rules = order.paymentRules || {};
    const requiresDp50 = Boolean(rules.requiresDp50);

    /* Status badge */
    const statusMap = {
        "pending": {
            label: order.hasPaymentProof ? "Menunggu Verifikasi Admin" : "Menunggu Pembayaran",
            className: ""
        },
        "success": { label: "Pembayaran Sukses", className: "success" },
        "finished": { label: "Pesanan Selesai (Finish)", className: "success" },
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

    if (titleEl) {
        titleEl.innerText = requiresDp50 ? "Pembayaran DP 50% COD (QRIS)" : "Pembayaran QRIS";
    }

    /* Meta */
    if (orderIdEl) orderIdEl.innerText = order.orderId || "—";
    if (customerNameEl) customerNameEl.innerText = order.customerNameMasked || "—";
    if (locationEl) locationEl.innerText = getLocationLabel(order.location);

    if (requiresDp50) {
        const dpAmt = Number(rules.dpRequiredAmount || Math.ceil((order.total || 0) / 2));
        const sisaAmt = Math.max(0, Number(order.total || 0) - dpAmt);
        if (totalLabelEl) totalLabelEl.innerText = "Nominal Wajib Transfer (DP 50%)";
        if (totalEl) totalEl.innerText = formatRupiah(dpAmt);
        if (totalSubnoteEl) {
            totalSubnoteEl.hidden = false;
            totalSubnoteEl.innerText = `Dari Total Pesanan ${formatRupiah(order.total || 0)} · Sisa ${formatRupiah(sisaAmt)} dibayar tunai saat COD`;
        }
    } else {
        if (totalLabelEl) totalLabelEl.innerText = "Total Pembayaran";
        if (totalEl) totalEl.innerText = formatRupiah(order.total || 0);
        if (totalSubnoteEl) {
            totalSubnoteEl.hidden = true;
            totalSubnoteEl.innerText = "";
        }
    }

    /* QR */
    if (qrImageEl) {
        let imgUrl = (paymentSettings.qrisImageUrl || "images/qris.jpeg").trim();
        if (imgUrl.startsWith("/images/")) imgUrl = imgUrl.slice(1);
        qrImageEl.src = imgUrl;
        qrImageEl.onerror = function() {
            if (!this.dataset.fallbackTried) {
                this.dataset.fallbackTried = "1";
                this.src = "images/qris.jpeg";
            }
        };
    }
    if (qrisOwnerEl) {
        qrisOwnerEl.innerText = paymentSettings.qrisOwnerName || "Velacookies";
    }

    /* Items */
    renderOrderItems(order.items);

    /* Expiry countdown */
    renderExpiry(order);

    /* Render Upload Box State */
    renderUploadBoxState(order);

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
            order.status === "finished" ? "Pesanan Selesai (Finish)" :
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

            if (confirmCheckbox) {
                confirmCheckbox.disabled = true;
            }

            if (uploadDropzoneEl) {
                uploadDropzoneEl.classList.add("is-disabled");
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


/* =========================
   UPLOAD BUKTI PEMBAYARAN UI & LOGIC
   ========================= */

function setUploadStatusBanner(type, htmlContent) {
    if (!uploadStatusEl) return;
    if (!htmlContent) {
        uploadStatusEl.hidden = true;
        uploadStatusEl.className = "payment-upload-status";
        uploadStatusEl.innerHTML = "";
        return;
    }
    uploadStatusEl.hidden = false;
    uploadStatusEl.className = `payment-upload-status is-${type}`;
    uploadStatusEl.innerHTML = htmlContent;
}

function renderUploadBoxState(order) {
    if (!uploadBoxEl || !order) return;

    const isPending = order.status === "pending";
    if (uploadDropzoneEl) {
        uploadDropzoneEl.classList.toggle("is-disabled", !isPending || isUploadingProof);
    }
    if (proofChangeBtnEl) {
        proofChangeBtnEl.disabled = !isPending || isUploadingProof;
    }

    if (order.hasPaymentProof) {
        if (uploadEmptyEl) uploadEmptyEl.hidden = true;
        if (uploadPreviewWrapEl) uploadPreviewWrapEl.hidden = false;

        if (!localPreviewUploadedInSession) {
            if (proofPreviewImgEl) proofPreviewImgEl.hidden = true;
            if (uploadSavedBannerEl) uploadSavedBannerEl.hidden = false;
            if (proofFileInfoEl) proofFileInfoEl.innerText = "Bukti pembayaran sudah terunggah";
        }

        const summary = order.receiptSummary || null;
        if (summary && summary.isReceipt === false) {
            uploadBoxEl.className = "payment-upload-box is-warning";
            if (uploadBadgeEl) {
                uploadBadgeEl.className = "payment-upload-badge warning";
                uploadBadgeEl.innerText = "⚠️ Bukan Struk";
            }
            setUploadStatusBanner(
                "error",
                `⚠️ <strong>Gambar yang diunggah terdeteksi bukan struk pembayaran.</strong><br>Silakan klik tombol <strong>"🔄 Ganti Foto"</strong> di atas untuk mengunggah screenshot bukti transfer QRIS yang benar.`
            );
        } else if (summary && Array.isArray(summary.concerns) && summary.concerns.length > 0) {
            uploadBoxEl.className = "payment-upload-box is-uploaded";
            if (uploadBadgeEl) {
                uploadBadgeEl.className = "payment-upload-badge success";
                uploadBadgeEl.innerText = "✓ Bukti Terunggah";
            }
            setUploadStatusBanner(
                "warning",
                `✅ <strong>Bukti pembayaran sudah diterima sistem &amp; sedang menunggu verifikasi Admin.</strong><br>Catatan pemeriksaan: ${escapeHtml(summary.concerns.join(" · "))}`
            );
        } else {
            uploadBoxEl.className = "payment-upload-box is-uploaded";
            if (uploadBadgeEl) {
                uploadBadgeEl.className = "payment-upload-badge success";
                uploadBadgeEl.innerText = "✓ Bukti Terunggah";
            }
            const detailText = summary && summary.detectedAmount
                ? `(${formatRupiah(summary.detectedAmount)} · ${escapeHtml(summary.matchLabel || "Menunggu Verifikasi Admin")}) `
                : "";
            setUploadStatusBanner(
                "success",
                `✅ <strong>Bukti pembayaran berhasil diterima!</strong> ${detailText}Sedang menunggu verifikasi Admin Velacookies.`
            );
        }
    } else {
        uploadBoxEl.className = "payment-upload-box";
        if (uploadEmptyEl) uploadEmptyEl.hidden = false;
        if (uploadPreviewWrapEl) uploadPreviewWrapEl.hidden = true;
        if (uploadBadgeEl) {
            uploadBadgeEl.className = "payment-upload-badge";
            uploadBadgeEl.innerText = "Wajib Diunggah";
        }

        if (order.verificationStatus === "rejected") {
            uploadBoxEl.className = "payment-upload-box is-warning";
            if (uploadBadgeEl) {
                uploadBadgeEl.className = "payment-upload-badge warning";
                uploadBadgeEl.innerText = "Wajib Unggah Ulang";
            }
            setUploadStatusBanner(
                "error",
                `⚠️ <strong>Bukti pembayaran sebelumnya belum dapat diverifikasi oleh Admin.</strong><br>Silakan unggah ulang foto screenshot bukti transfer QRIS yang jelas pada kotak di atas.`
            );
        } else {
            setUploadStatusBanner("", "");
        }
    }
}

async function handleProofFileSelected(file) {
    if (!file || !currentOrder) return;

    if (currentOrder.status !== "pending") {
        alert("Pesanan ini sudah tidak dalam status menunggu pembayaran.");
        return;
    }

    const mime = (file.type || "").toLowerCase();
    if (!ALLOWED_PROOF_MIMES.includes(mime)) {
        setUploadStatusBanner("error", "❌ Format file tidak didukung. Pilih gambar berformat <strong>JPG, PNG, atau WEBP</strong> ya.");
        return;
    }

    isUploadingProof = true;
    updateActionsForStatus(currentOrder);

    try {
        setUploadStatusBanner("loading", "⏳ Mengoptimalkan ukuran gambar...");
        const compressed = await compressImageToDataUrl(file);

        if (compressed.byteLength > MAX_PROOF_BYTES) {
            isUploadingProof = false;
            setUploadStatusBanner("error", "❌ Ukuran gambar terlalu besar (lebih dari 2.5 MB). Silakan pilih screenshot dengan ukuran lebih kecil.");
            updateActionsForStatus(currentOrder);
            return;
        }

        /* Tampilkan preview lokal */
        localPreviewUploadedInSession = true;
        if (uploadEmptyEl) uploadEmptyEl.hidden = true;
        if (uploadPreviewWrapEl) uploadPreviewWrapEl.hidden = false;
        if (uploadSavedBannerEl) uploadSavedBannerEl.hidden = true;
        if (proofPreviewImgEl) {
            proofPreviewImgEl.src = compressed.dataUrl;
            proofPreviewImgEl.hidden = false;
        }
        if (proofFileInfoEl) {
            proofFileInfoEl.innerText = `${file.name} (${formatFileSize(compressed.byteLength)})`;
        }
        if (uploadBadgeEl) {
            uploadBadgeEl.className = "payment-upload-badge";
            uploadBadgeEl.innerText = "⏳ Memeriksa...";
        }

        setUploadStatusBanner(
            "loading",
            "⏳ <strong>Sedang mengunggah &amp; memeriksa bukti pembayaran...</strong> Mohon tunggu sebentar ya."
        );

        const response = await fetch(`${API_BASE}/api/orders/${currentOrder.orderId}/upload-proof`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                imageBase64: compressed.dataUrl
            })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || "Gagal mengunggah bukti pembayaran.");
        }

        currentOrder.hasPaymentProof = true;
        currentOrder.customerConfirmed = true;
        currentOrder.customerConfirmedAt = result.confirmedAt || new Date().toISOString();
        currentOrder.verificationStatus = result.verificationStatus || "awaiting_verification";
        currentOrder.receiptSummary = result.receiptAnalysis || null;

        if (statusLabel && currentOrder.status === "pending") {
            statusLabel.innerText = "Menunggu Verifikasi Admin";
        }

        renderUploadBoxState(currentOrder);

    } catch (error) {
        console.error("Upload proof error:", error);
        setUploadStatusBanner(
            "error",
            `❌ <strong>Gagal mengunggah bukti pembayaran:</strong> ${escapeHtml(error.message || "Terjadi gangguan jaringan. Silakan coba lagi.")}`
        );
        if (uploadBadgeEl && !currentOrder.hasPaymentProof) {
            uploadBadgeEl.className = "payment-upload-badge warning";
            uploadBadgeEl.innerText = "Gagal Unggah";
        }
    } finally {
        isUploadingProof = false;
        updateActionsForStatus(currentOrder);
    }
}

function updateActionsForStatus(order) {
    if (!confirmBtn || !order) return;

    if (order.status === "pending") {
        const hasProof = Boolean(order.hasPaymentProof);
        const isChecked = Boolean(confirmCheckbox && confirmCheckbox.checked);

        if (confirmCheckbox) {
            confirmCheckbox.disabled = isUploadingProof;
        }

        if (isUploadingProof) {
            confirmBtn.disabled = true;
            confirmBtn.innerText = "⏳ Mengunggah Bukti Bayar...";
            if (gateHintEl) {
                gateHintEl.hidden = false;
                gateHintEl.className = "payment-gate-hint";
                gateHintEl.innerText = "⏳ Tunggu sebentar, bukti pembayaran sedang diunggah dan diperiksa...";
            }
            return;
        }

        if (!hasProof) {
            /* WAJIB upload bukti bayar terlebih dahulu sebelum tombol aktif */
            confirmBtn.disabled = true;
            confirmBtn.innerText = "✓ Saya Sudah Bayar & Chat Admin";
            if (gateHintEl) {
                gateHintEl.hidden = false;
                gateHintEl.className = "payment-gate-hint";
                gateHintEl.innerText = isChecked
                    ? "⚠️ Kamu sudah mencentang kotak, tapi wajib mengunggah foto bukti pembayaran pada kotak di atas terlebih dahulu ya."
                    : "📌 Unggah foto bukti pembayaran di atas & centang kotak persetujuan untuk mengaktifkan tombol konfirmasi.";
            }
            return;
        }

        if (!isChecked) {
            confirmBtn.disabled = true;
            confirmBtn.innerText = "✓ Saya Sudah Bayar & Chat Admin";
            if (gateHintEl) {
                gateHintEl.hidden = false;
                gateHintEl.className = "payment-gate-hint";
                gateHintEl.innerText = "☝️ Bukti bayar sudah terunggah! Sekarang centang kotak persetujuan di atas untuk mengaktifkan tombol konfirmasi.";
            }
            return;
        }

        confirmBtn.disabled = false;
        confirmBtn.innerText = "✓ Saya Sudah Bayar & Chat Admin";
        if (gateHintEl) {
            gateHintEl.hidden = false;
            gateHintEl.className = "payment-gate-hint is-ready";
            gateHintEl.innerText = "✅ Bukti pembayaran sudah tersimpan! Klik tombol di bawah untuk mengirim chat konfirmasi ke WhatsApp Admin.";
        }
    } else if (order.status === "success" || order.status === "finished") {
        confirmBtn.disabled = true;
        confirmBtn.innerText = order.status === "finished" ? "✓ Pesanan Selesai (Finish)" : "✓ Pembayaran Berhasil";
        if (gateHintEl) gateHintEl.hidden = true;

        if (confirmCheckbox) {
            confirmCheckbox.disabled = true;
        }
    } else if (order.status === "expired") {
        confirmBtn.disabled = true;
        confirmBtn.innerText = "× Pesanan Expired";
        if (gateHintEl) gateHintEl.hidden = true;

        if (confirmCheckbox) {
            confirmCheckbox.disabled = true;
        }
    } else {
        confirmBtn.disabled = true;
        confirmBtn.innerText = "× Pesanan Tidak Aktif";
        if (gateHintEl) gateHintEl.hidden = true;

        if (confirmCheckbox) {
            confirmCheckbox.disabled = true;
        }
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
    const rules = (order && order.paymentRules) || {};

    lines.push("Halo Velacookies! \uD83C\uDF6A");
    lines.push("");
    if (rules.requiresDp50) {
        lines.push("Saya sudah transfer DP 50% COD via QRIS dan mengunggah bukti pembayarannya di website:");
    } else {
        lines.push("Saya sudah transfer via QRIS dan mengunggah bukti pembayarannya di website:");
    }
    lines.push("");
    lines.push(`Order ID: ${order.orderId}`);
    lines.push(`Nama: ${order.customerNameMasked}`);
    if (rules.requiresDp50) {
        lines.push(`Total Pesanan: ${formatRupiah(order.total)}`);
        lines.push(`Nominal DP 50%: ${formatRupiah(rules.dpRequiredAmount)}`);
    } else {
        lines.push(`Total: ${formatRupiah(order.total)}`);
    }
    lines.push(`Lokasi: ${getLocationLabel(order.location)}`);
    lines.push("");
    lines.push("Mohon dicek dan diverifikasi ya Kak, terima kasih!");

    return lines.join("\n");
}

function buildGeneralWaMessage(order) {
    const lines = [];

    lines.push("Halo Velacookies! \uD83C\uDF6A");
    lines.push("");
    lines.push("Saya mau tanya soal pesanan saya:");
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

    if (isUploadingProof) {
        alert("Tunggu sebentar ya, foto bukti pembayaran sedang diunggah.");
        return;
    }

    /* Wajib unggah bukti bayar terlebih dahulu */
    if (!currentOrder.hasPaymentProof) {
        alert("Silakan unggah foto bukti pembayaran pada kotak di atas terlebih dahulu ya.");
        if (uploadBoxEl) {
            uploadBoxEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
    }

    /* Wajib centang dulu */
    if (!confirmCheckbox || !confirmCheckbox.checked) {
        alert("Centang dulu kotak persetujuan di atas ya, biar pesanan bisa diproses.");
        return;
    }

    /* Karena upload bukti bayar di website sudah menandai customerConfirmed = true di backend,
       kita bisa langsung mengarahkan ke WhatsApp dan menampilkan modal sukses */
    if (currentOrder.customerConfirmed === true) {
        const message = buildConfirmWaMessage(currentOrder);
        openWhatsApp(paymentSettings.adminWaNumber, message);
        openSuccessModal();
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

        confirmBtn.innerText = "✓ Buka WhatsApp Admin Lagi";
        confirmBtn.disabled = false;

        /* LANGSUNG buka WA (auto redirect) */
        const waMessage = buildConfirmWaMessage(currentOrder);
        openWhatsApp(paymentSettings.adminWaNumber, waMessage);

        /* Modal muncul sebagai fallback
           (kalau browser block popup, customer masih bisa klik tombol WA di modal) */
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

function triggerProofFileDialog() {
    if (!currentOrder || currentOrder.status !== "pending" || isUploadingProof) return;
    if (proofInputEl) {
        proofInputEl.value = "";
        proofInputEl.click();
    }
}

if (uploadDropzoneEl) {
    uploadDropzoneEl.addEventListener("click", (e) => {
        if (e.target.closest("#payment-proof-change-btn")) return;
        if (!currentOrder || currentOrder.status !== "pending" || isUploadingProof) return;
        /* Jika belum ada bukti, klik area dropzone langsung buka file picker */
        if (!currentOrder.hasPaymentProof) {
            triggerProofFileDialog();
        }
    });

    uploadDropzoneEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            triggerProofFileDialog();
        }
    });

    uploadDropzoneEl.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (!currentOrder || currentOrder.status !== "pending" || isUploadingProof) return;
        uploadDropzoneEl.classList.add("is-dragover");
    });

    uploadDropzoneEl.addEventListener("dragleave", () => {
        uploadDropzoneEl.classList.remove("is-dragover");
    });

    uploadDropzoneEl.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadDropzoneEl.classList.remove("is-dragover");
        if (!currentOrder || currentOrder.status !== "pending" || isUploadingProof) return;
        const droppedFile = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (droppedFile) {
            handleProofFileSelected(droppedFile);
        }
    });
}

if (proofChangeBtnEl) {
    proofChangeBtnEl.addEventListener("click", (e) => {
        e.stopPropagation();
        triggerProofFileDialog();
    });
}

if (proofInputEl) {
    proofInputEl.addEventListener("change", () => {
        const selectedFile = proofInputEl.files && proofInputEl.files[0];
        if (selectedFile) {
            handleProofFileSelected(selectedFile);
        }
    });
}

if (confirmBtn) {
    confirmBtn.addEventListener("click", handleConfirmPayment);
}

if (confirmCheckbox) {
    confirmCheckbox.addEventListener("change", () => {
        if (currentOrder) {
            updateActionsForStatus(currentOrder);
        }
    });
}

if (waBtn) {
    waBtn.addEventListener("click", () => {
        const message = currentOrder
            ? buildGeneralWaMessage(currentOrder)
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
