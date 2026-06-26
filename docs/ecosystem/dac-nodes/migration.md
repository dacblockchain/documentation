# Migration Guide (Quadrans to DAC)

This guide describes how to migrate an existing Quadrans Node to a DAC Node.

## Overview

The migration tool helps transition your node from the legacy Quadrans network to the new DAC Blockchain network. It performs the following automated actions:
1.  **Backs up** your existing Quadrans configurations.
2.  **Migrates** the block database (`chaindata`) and keystores to the new DAC directory structure, saving time and bandwidth.
3.  **Installs** the new DAC Node software using the official automated installer.

## Prerequisites

- An existing, active Quadrans Node installation.
- Root or Administrator access.
- Sufficient disk space to copy and move chaindata directories.

## Migration Scripts

### Linux
Run the migration script directly via terminal:
```bash
curl -O https://repo.dachain.tech/installer/migration/migrate_linux.sh
sudo bash migrate_linux.sh
```

### macOS
Open Terminal and execute the macOS migration script:
```bash
curl -O https://repo.dachain.tech/installer/migration/migrate_macos.sh
sudo bash migrate_macos.sh
```

### Windows
1. Download `migrate_windows.bat` from the official repository.
2. Right-click the downloaded file and select **Run as Administrator**.
3. Follow the on-screen instructions in the Command Prompt window.

---

## Migration Process Under the Hood

The script performs the following sequence of events:
1.  **Stop**: The script halts any currently running Quadrans services/nodes to prevent database corruption.
2.  **Move**: It relocates `chaindata` to the new DAC data directory (e.g., `~/.dac/`).
3.  **Copy**: It duplicates key elements like the `keystore` and password files into the new paths.
4.  **Install**: It invokes the official DAC Node installer in **auto-mode**. The installer automatically detects your previous network settings (Mainnet vs Testnet) and configures the new DAC node accordingly without requiring manual user input.
5.  **Finalize**: The old Quadrans service is stopped and disabled from booting.

---

## Manual Migration (Step-by-Step)

If you prefer not to use the automated migration script, you can perform the migration manually by following these steps:

### Step 1: Stop the Quadrans Service
*   **Linux**:
    ```bash
    sudo systemctl stop quadrans-node
    sudo systemctl disable quadrans-node
    ```
*   **macOS**:
    ```bash
    sudo launchctl stop io.quadrans.gqdc
    sudo launchctl unload /Library/LaunchDaemons/io.quadrans.gqdc.plist
    ```
*   **Windows**: Close the running node command prompt window, or run:
    ```cmd
    taskkill /F /IM gqdc.exe
    ```

### Step 2: Copy Keystore and Password Files
*   **Linux**:
    Copy keystore files to the new `dac` user directory:
    ```bash
    sudo mkdir -p /home/dac/.dac/keystore
    sudo cp -r /home/quadrans/.quadrans/keystore/. /home/dac/.dac/keystore/
    sudo cp /home/quadrans/password.txt /home/dac/password.txt
    sudo chown -R dac:dac /home/dac/
    ```
*   **macOS**:
    Copy files to the shared directory:
    ```bash
    sudo mkdir -p /Users/Shared/DAC/.dac/keystore
    sudo cp -r /Users/Shared/Quadrans/.quadrans/keystore/. /Users/Shared/DAC/.dac/keystore/
    sudo cp /Users/Shared/Quadrans/password.txt /Users/Shared/DAC/password.txt
    ```
*   **Windows**:
    Copy directories manually or run:
    ```cmd
    xcopy /E /I /Y "%USERPROFILE%\QuadransNode\keystore" "%USERPROFILE%\DACNode\keystore"
    copy /Y "%USERPROFILE%\QuadransNode\password.txt" "%USERPROFILE%\DACNode\password.txt"
    ```

### Step 3: Copy Node P2P Identity nodekey (Optional)
Copy the `nodekey` file to preserve your node's peer-to-peer Enode identity:
*   **Linux**:
    ```bash
    sudo mkdir -p /home/dac/.dac/gdacnode
    sudo cp /home/quadrans/.quadrans/gqdc/nodekey /home/dac/.dac/gdacnode/nodekey
    sudo chown -R dac:dac /home/dac/
    ```
*   **macOS**:
    ```bash
    sudo mkdir -p /Users/Shared/DAC/.dac/gdacnode
    sudo cp /Users/Shared/Quadrans/.quadrans/gqdc/nodekey /Users/Shared/DAC/.dac/gdacnode/nodekey
    ```
*   **Windows**:
    ```cmd
    if not exist "%USERPROFILE%\DACNode\gdacnode" mkdir "%USERPROFILE%\DACNode\gdacnode"
    copy /Y "%USERPROFILE%\QuadransNode\geth\nodekey" "%USERPROFILE%\DACNode\gdacnode\nodekey"
    ```

### Step 4: Move Chaindata
Moving your blockchain database avoids resyncing from scratch:
*   **Linux**:
    ```bash
    sudo mv /home/quadrans/.quadrans/gqdc/chaindata /home/dac/.dac/gdacnode/chaindata
    sudo chown -R dac:dac /home/dac/
    ```
*   **macOS**:
    ```bash
    sudo mv /Users/Shared/Quadrans/.quadrans/gqdc/chaindata /Users/Shared/DAC/.dac/gdacnode/chaindata
    ```
*   **Windows**:
    ```cmd
    move "%USERPROFILE%\QuadransNode\geth\chaindata" "%USERPROFILE%\DACNode\gdacnode\chaindata"
    ```

### Step 5: Install and Configure DAC Node
Run the official automated installer, which will detect the migrated data structure and generate the background services:
*   **Linux / macOS**:
    ```bash
    curl -o dac-install.sh https://repo.dachain.tech/installer/install.sh && sudo bash dac-install.sh
    ```
*   **Windows**: Run `install.bat` as Administrator.

Verify in `/home/dac/environment` (Linux), `/Users/Shared/DAC/environment` (macOS), or `%USERPROFILE%\DACNode\start.bat` (Windows) that the `--miner.etherbase` and `--unlock` parameters contain your migrated wallet address.

---

## Validation

::: warning Address Verification
Ensure that your account address matches the address you used under Quadrans. This is critical if you are a Validator, Supervisor, or Miner receiving block rewards.
:::

Verify your new node is running correctly:

### Linux / macOS
Run the status script from any terminal:
```bash
dacnode-status
```

### Windows
Navigate to your node installation folder and run:
```cmd
cd %USERPROFILE%\DACNode
status.bat
```

For detailed explanations of the metrics shown in these status tools, please see the [Status Monitor](./status-monitor.md) guide.
