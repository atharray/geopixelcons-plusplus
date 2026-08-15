// ==UserScript==
// @name         GeoPixelcons++
// @namespace    http://tampermonkey.net/
// x-release-please-start-version
// @version      2.0.2
// x-release-please-end
// @description  Unified GeoPixels enhancement suite - by Pixelcons
// @author       ariapokoteng, Manako, D.V.H., JainIlluverii
// @match        *://geopixels.net/*
// @match        *://*.geopixels.net/*
// @require      https://cdn.jsdelivr.net/gh/atharray/geopixelcons-library@v2.3.0/dist/geopixelcons-library.js#sha256-KP2yOma20fl7CtgEBFhHQKOaVugcRde37sql88/yMps=
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// @grant        unsafeWindow
// @connect      *
// @license      MIT
// @icon         https://www.google.com/s2/favicons?sz=64&domain=geopixels.net
// ==/UserScript==

(function bootGeoPixelconsShell() {
    'use strict';

    // x-release-please-start-version
    const VERSION = '2.0.2';
    // x-release-please-end
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
