(function bootGeoPixelconsShell() {
    'use strict';

    const VERSION = '__VERSION__';
    const library = typeof GeoPixelconsLibrary !== 'undefined'
        ? GeoPixelconsLibrary
        : (typeof globalThis !== 'undefined' ? globalThis.GeoPixelconsLibrary : null);

    function reportFailure(error) {
        const message = '[GeoPixelcons++] The verified feature library did not load. GeoPixels remains available; reinstall a release whose library tag is online.';
        console.error(message, error);
        if (!document.body || document.getElementById('gpc-library-load-error')) return;
        const notice = document.createElement('div');
        notice.id = 'gpc-library-load-error';
        notice.textContent = message;
        notice.setAttribute('role', 'alert');
        notice.style.cssText = 'position:fixed;left:12px;right:12px;bottom:12px;z-index:2147483647;padding:12px;border-radius:10px;background:#7f1d1d;color:#fff;font:14px/1.4 system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.35);';
        document.body.appendChild(notice);
    }

    function boot() {
        if (!library || typeof library.boot !== 'function') {
            reportFailure(new Error('GeoPixelconsLibrary.boot() is unavailable.'));
            return;
        }
        try {
            library.boot();
            console.log(`[GeoPixelcons++] v${VERSION} shell initialized.`);
        } catch (error) {
            reportFailure(error);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
        boot();
    }
})();
