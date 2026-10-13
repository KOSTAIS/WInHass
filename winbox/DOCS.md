# MikroTik WinBox

This add-on runs MikroTik's native Linux **WinBox 4** on a virtual display
and streams it to your browser with noVNC through Home Assistant Ingress.
Open it from the **WinBox** entry in the sidebar.

## How it works

- On first start the add-on downloads `WinBox_Linux.zip` from
  `download.mikrotik.com` and caches it in the add-on's `/data` folder.
- WinBox settings, saved sessions and the managed-router list are kept in
  `/data`, so they survive restarts and updates and are part of backups.
- The add-on uses host networking, so WinBox's **Neighbors** tab can
  discover routers on your LAN and you can connect by MAC address.
- The browser view resizes WinBox to fit the window.
- If you close WinBox, it starts again on its own.

## Options

| Option | Default | Description |
| --- | --- | --- |
| `winbox_version` | `4.0` | WinBox version to download. Use a folder name from `https://download.mikrotik.com/routeros/winbox/`. Change it to upgrade. |
| `winbox_url` | *(empty)* | Optional direct link to a `WinBox_Linux.zip`. Overrides `winbox_version`. |
| `resolution` | `1600x900` | Starting size of the virtual screen. |

If the download fails, the log says so. Copy the **Linux** WinBox link
from <https://mikrotik.com/download> into `winbox_url` and restart the
add-on.

## Clipboard

Use the noVNC side panel (the small tab on the left edge) to copy and
paste text between your computer and WinBox.

## Security

The VNC session has no password of its own. Home Assistant controls
access: only logged-in Home Assistant users can reach it through Ingress,
and the add-on listens only on the internal Home Assistant network, not
on your LAN. Passwords saved in WinBox are stored in the add-on's data
and its backups.

## Limitations

- **amd64 (x86-64) only.** MikroTik ships WinBox for Linux only for
  x86-64, so this add-on does not run on Raspberry Pi or other ARM
  hardware.
