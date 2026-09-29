import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Defensive filter for third-party telemetry rejections (e.g. Midtrans Faro SDK)
if (typeof window !== 'undefined') {
    window.addEventListener('unhandledrejection', (event) => {
        const reason = event?.reason;
        const msg = reason ? (reason.stack || reason.message || String(reason)) : '';
        if (msg.includes('katulampa.gopay.sh') || msg.includes('@grafana/faro') || msg.includes('transport-fetch')) {
            event.preventDefault();
        }
    });
}
