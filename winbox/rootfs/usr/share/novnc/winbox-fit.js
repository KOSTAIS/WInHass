// Small-screen support for noVNC's "remote resize" mode.
//
// Remote resize normally makes the WinBox desktop exactly as large as the
// browser view. On a phone that is far smaller than WinBox's minimum window
// size, so WinBox ends up cropped. Instead, when the view is smaller than
// the configured minimum, request a proportionally larger desktop and scale
// it down to fit. Larger screens behave exactly as before.
import RFB from "./core/rfb.js";

const cfg = { min_width: 1024, min_height: 600 };

function targetSize(screen) {
    const f = Math.max(1, cfg.min_width / screen.w, cfg.min_height / screen.h);
    return { w: screen.w * f, h: screen.h * f };
}

function overflows(rfb) {
    const s = rfb._screenSize();
    return rfb._fbWidth > s.w + 1 || rfb._fbHeight > s.h + 1;
}

const origResize = RFB.prototype._requestRemoteResize;
RFB.prototype._requestRemoteResize = function () {
    const real = this._screenSize;
    this._screenSize = function () { return targetSize(real.call(this)); };
    try {
        return origResize.call(this);
    } finally {
        delete this._screenSize;
    }
};

// While the remote desktop is larger than the view, scale it to fit
// (scaling also turns off viewport clipping/panning).
for (const name of ["_updateClip", "_updateScale"]) {
    const orig = RFB.prototype[name];
    RFB.prototype[name] = function () {
        const saved = this._scaleViewport;
        if (this._resizeSession && this._fbWidth && overflows(this)) {
            this._scaleViewport = true;
        }
        try {
            return orig.call(this);
        } finally {
            this._scaleViewport = saved;
        }
    };
}

fetch("winbox-config.json", { cache: "no-store" })
    .then(r => (r.ok ? r.json() : {}))
    .then(c => {
        if (c.min_width > 0) cfg.min_width = c.min_width;
        if (c.min_height > 0) cfg.min_height = c.min_height;
        // Re-apply the size in case we are already connected.
        window.dispatchEvent(new Event("resize"));
    })
    .catch(() => {});
