ARG BUILD_FROM
FROM ${BUILD_FROM}

# Virtual display (TigerVNC), window manager, noVNC web client and the
# libraries the native Linux WinBox 4 build needs.
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        tigervnc-standalone-server \
        openbox \
        novnc \
        websockify \
        curl \
        unzip \
        iproute2 \
        ca-certificates \
        fonts-dejavu-core \
        libgl1 \
        libgl1-mesa-dri \
        libegl1 \
        libfontconfig1 \
        libfreetype6 \
        libdbus-1-3 \
        libxkbcommon0 \
        libxkbcommon-x11-0 \
        libxcb-cursor0 \
        libxcb-icccm4 \
        libxcb-image0 \
        libxcb-keysyms1 \
        libxcb-randr0 \
        libxcb-render-util0 \
        libxcb-shape0 \
        libxcb-xinerama0 \
        libxcb-xkb1 \
    && rm -rf /var/lib/apt/lists/*

COPY rootfs /

RUN chmod a+x /etc/services.d/*/run /etc/services.d/*/finish /usr/bin/winbox-launch \
    && sed -i 's|</head>|    <script type="module" src="winbox-fit.js"></script>\n</head>|' /usr/share/novnc/vnc.html \
    && grep -q 'winbox-fit.js' /usr/share/novnc/vnc.html
