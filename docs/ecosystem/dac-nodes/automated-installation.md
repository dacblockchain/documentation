# Automated Installation

The official DAC Node automated installers allow you to easily deploy, run, and manage a node daemon on various platforms. 

Using platform-specific wrapper scripts (Bash scripts for Linux/macOS and Batch scripts for Windows), the installation process is guided, interactive, and automated from start to finish.

---

## Core Features

Our automated installer scripts are designed to streamline operations and handle all low-level configuration details:

- **Architecture Auto-detection**: Detects platform CPU architecture natively (supporting `amd64`/`x86_64`, `arm64`/Apple Silicon, and standard `arm7`).
- **Background Daemon Registration**: Registers the node as a system service to ensure it starts automatically on boot:
  - **Linux**: Configured as a managed `systemd` service.
  - **macOS**: Configured as a system-wide `LaunchDaemon`.
  - **Windows**: Launcher scripts provided with options for background task setup.
- **Interactive Wizard Setup**: Easily configure node names, storage states (Light/Standard, Full, or Archive), networks (Mainnet vs Testnet), and HTTP/RPC API access flags.
- **Wallet & Mining Setup**: Automatically sets up wallet generation, keystore encryption passwords, and starts mining operations cleanly out-of-the-box.
- **Automated Lifecycle Operations**: Re-running the scripts allows you to instantly check sync stats, reconfigure startup parameters, update the node binary, or cleanly uninstall the service while keeping secure keystore backups.

---

## Supported Operating Systems

Select your operating system to view step-by-step setup guides using the automated installer:

### 🐧 [Linux Installation](./installer-linux.md)
Learn how to run the automated setup on Ubuntu, Debian, CentOS, and other systemd-supported distributions.

### 🍏 [macOS Installation](./installer-macos.md)
Configure a launch daemon and shared data directories natively on Intel or Apple Silicon Macs.

### 🪟 [Windows Installation](./installer-windows.md)
Deploy isolated folders and configure startup scripts on Windows 10 or 11.
