# Status Monitor

The status monitor is a diagnostic utility installed by the automated scripts to check the health and synchronization progress of your DAC Blockchain Node in real-time.

---

## How It Works

The status monitor connects to the running node's local IPC interface (IPC Named Pipe on Windows, Unix Domain Socket on Linux/macOS) using the `dacnode attach` console commands. It runs queries against the node's JSON-RPC interface to retrieve:
- `eth.blockNumber`: The latest block number synced by the node.
- `eth.getBlock('latest').hash`: The hash of the latest synced block.
- `net.peerCount`: The number of connected network peers.
- `eth.syncing`: The synchronization status (returns details if syncing, or `false` if fully synced).

---

## Operating System Usage

### Linux
The installer places the script globally. Run it from any directory:
```bash
dacnode-status
```
*(Note: Behind the scenes, this calls `/usr/local/bin/dacnode-status`)*

### macOS
The installer places the script globally. Run it from any directory:
```bash
dacnode-status
```
*(Note: Behind the scenes, this calls `/usr/local/bin/dacnode-status`)*

### Windows
The installer creates a local batch file. Navigate to your installation directory and run it:
```cmd
cd %USERPROFILE%\DACNode
status.bat
```
*(Note: On Windows, `status.bat` runs in an automatic loop, refreshing the console every 5 seconds. Press `CTRL+C` to exit the monitor loop)*

---

## Output Fields Explained

A healthy node output will look similar to this:
```yaml
--- DAC Node Status Monitor ---
Service: Active (Running)

Block: 1245890
Hash:  0xe6e7b233a3faad0ce811fa4a6995adacb1df1ff850b571120019283747585a9f
Peers: 12
Sync:  false
```

- **Service Status**:
  - `Active (Running)`: Indicates that the background daemon (systemd service, launchd daemon, or windows process) is active.
  - `Inactive`: The node service or process is stopped.
- **Block**: The block height currently reached by your local node.
- **Hash**: The cryptographic hash of the latest block on your node (useful to check if your node is on the correct chain fork).
- **Peers**: The number of other nodes your node is connected to via the P2P network. It should ideally be greater than `0` (typically `8` to `25` peers) to sync blocks.
- **Sync**:
  - `false`: Your node is fully synchronized and is receiving new blocks in real-time.
  - `true` / `Sync Object`: Your node is catching up to the network. It will display the starting block, current block, and highest block.

---

## Troubleshooting Connection Errors

If the status monitor outputs:
`Error: Unable to connect to DAC Node`

This means the monitor cannot find or connect to the node's IPC file socket. Follow these diagnostic steps:

1. **Verify if the Node is Running**:
   - **Linux**: Run `systemctl status dac-node`
   - **macOS**: Run `sudo launchctl list | grep dacnode`
   - **Windows**: Open Task Manager and check if `dacnode.exe` is running.

2. **Check the Startup Logs**:
   If the node is not running or has crashed, the IPC socket file won't be created. Check the logs to find the startup error:
   - **Linux**: `journalctl -u dac-node -n 100 -f`
   - **macOS**: `tail -n 100 /var/log/dacnode.err`
   - **Windows**: Check for crash outputs in the command prompt or log outputs.

3. **Verify File Permissions (Linux/macOS)**:
   The IPC socket file (usually `geth.ipc` inside the `.dac` data directory) must be readable by the user running the status command.
   - The Linux installer sets up group rights so that users in the `dac` group can access it.
   - The macOS installer places files in `/Users/Shared/DAC/` with open permissions so that normal user accounts can connect.
   
   If you encounter permission issues, ensure your user has appropriate rights, or run the status command with `sudo` if necessary.
