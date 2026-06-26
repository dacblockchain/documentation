# Manual Installation

This guide provides instructions for manually downloading and running a DAC Chain Testnet node. This method involves running the node binary directly from the terminal without creating system services or background processes.

### Prerequisites <a href="#prerequisites" id="prerequisites"></a>

* A terminal or command prompt.
* Internet connection.
* Basic familiarity with command-line interfaces.

### Official DAC Node Repo <a href="#prerequisites" id="prerequisites"></a>

The official binary releases for the DAC Blockchain protocol nodes are available in the [DAC Blockchain Node Download](https://download.dachain.tech/) website.

### 1. Linux <a href="#id-1-linux" id="id-1-linux"></a>

#### Download <a href="#download" id="download"></a>

Choose the command for your architecture:

**AMD64 (Standard x86\_64):**

```bash
wget -O dacnode https://repo.dachain.tech/node/dev/linux/amd64/dacnode
# OR
curl -L -o dacnode https://repo.dachain.tech/node/dev/linux/amd64/dacnode
```

**ARM64 (aarch64):**

```bash
wget -O dacnode https://repo.dachain.tech/node/dev/linux/arm64/dacnode
# OR
curl -L -o dacnode https://repo.dachain.tech/node/dev/linux/arm64/dacnode
```

#### Installation & Execution <a href="#installation--execution" id="installation--execution"></a>

1.  Make the binary executable:

    ```bash
    chmod +x dacnode
    ```
2.  Run the node on Testnet:

    ```bash
    ./dacnode --testnet
    ```

    _Optional: To specify a custom node name:_

    ```bash
    ./dacnode --testnet --identity "MyNodeName"
    ```

### 2. macOS <a href="#id-2-macos" id="id-2-macos"></a>

#### Download <a href="#download-1" id="download-1"></a>

Choose the command for your architecture:

**Intel (amd64):**

```bash
curl -L -o dacnode https://repo.dachain.tech/node/dev/darwin/amd64/dacnode
```

**Apple Silicon (M1/M2/M3 - arm64):**

```bash
curl -L -o dacnode https://repo.dachain.tech/node/dev/darwin/arm64/dacnode
```

#### Installation & Execution <a href="#installation--execution-1" id="installation--execution-1"></a>

1.  Make the binary executable:

    ```bash
    chmod +x dacnode
    xattr -d com.apple.quarantine dacnode
    ```
2.  Run the node on Testnet:

    ```bash
    ./dacnode --testnet
    ```

    **Note:** If you encounter a "developer cannot be verified" warning, you may need to allow the application in **System Settings > Privacy & Security**.

### 3. Windows <a href="#id-3-windows" id="id-3-windows"></a>

#### Download <a href="#download-2" id="download-2"></a>

Download the binary directly using your browser or PowerShell.

**Download URL (AMD64):** [https://repo.dachain.tech/node/dev/windows/amd64/dacnode.exe](https://repo.dachain.tech/node/dev/windows/amd64/dacnode.exe)

**PowerShell Command:**

```powershell
Invoke-WebRequest -Uri "https://repo.dachain.tech/node/dev/windows/amd64/dacnode.exe" -OutFile "dacnode.exe"
```

#### Installation & Execution <a href="#installation--execution-2" id="installation--execution-2"></a>

1. Open **Command Prompt** (cmd) or **PowerShell** in the folder where you downloaded `dacnode.exe`.
2.  Run the node on Testnet:

    ```cmd
    dacnode.exe --testnet
    ```

    _Optional: To specify a custom node name:_

    ```cmd
    dacnode.exe --testnet --identity "MyNodeName"
    ```

### Verify Execution <a href="#verify-execution" id="verify-execution"></a>

When the node starts successfully, you should see logs indicating:

* **Chain config**: Testnet
* **P2P Server started**
* **Synchronisation** progress (fetching blocks)

To stop the node, press `CTRL+C` in the terminal.
