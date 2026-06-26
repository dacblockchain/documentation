# Post-Install Mining Setup (Linux)

This guide describes how to enable mining and configure a wallet for your DAC Node on Linux *after* the automated installation process has completed. 

This is useful if you:
- Skipped the wallet/mining configuration step during installation.
- Want to switch to a different mining wallet.
- Imported an existing wallet keystore post-installation.

---

## Step 1: Copy the Keystore File

If you are importing an existing wallet rather than creating one from scratch, you must place its keystore file where the DAC Node service can access it.

1. Copy your keystore JSON file (usually named like `UTC--...`) to the node's data directory:
   ```bash
   sudo cp path/to/keystore/UTC--... /home/dac/.dac/keystore/
   ```
   *(Note: Create the directory `/home/dac/.dac/keystore/` first if it does not exist)*

2. Ensure correct ownership and permissions so the `dac` service user can access it:
   ```bash
   sudo chown -R dac:dac /home/dac/.dac
   sudo chmod 700 /home/dac/.dac/keystore
   sudo chmod 600 /home/dac/.dac/keystore/*
   ```

---

## Step 2: Prepare the Password File

The node needs a plaintext password file to decrypt and unlock the keystore file automatically when starting.

::: danger Security Warning
Since this file contains your wallet password in plaintext, it is crucial to restrict its file permissions as shown below so that only the `dac` service user can read it.
:::

1. Write your wallet password to `/home/dac/password.txt`:
   ```bash
   echo "your_wallet_password_here" | sudo tee /home/dac/password.txt > /dev/null
   ```
   *(Make sure to replace `your_wallet_password_here` with your actual keystore password)*

2. Restrict permissions so only the `dac` user can read/write the password file:
   ```bash
   sudo chown dac:dac /home/dac/password.txt
   sudo chmod 600 /home/dac/password.txt
   ```

---

## Step 3: Edit the Environment File

The Linux launcher script reads startup parameters from `/home/dac/environment`. You need to set the `MINER_FLAGS` variable there.

1. Open `/home/dac/environment` using a text editor (e.g., `nano`):
   ```bash
   sudo nano /home/dac/environment
   ```

2. Locate the `MINER_FLAGS` line and update it with the following flags:
   ```properties
   MINER_FLAGS="--mine --miner.etherbase 0xYOUR_WALLET_ADDRESS --unlock 0xYOUR_WALLET_ADDRESS --password /home/dac/password.txt --allow-insecure-unlock"
   ```
   ::: tip Address Substitution
   Replace both `0xYOUR_WALLET_ADDRESS` placeholders with the actual `0x`-prefixed address of your mining wallet.
   :::

3. Save and close the file (in nano, press `Ctrl+O`, `Enter`, then `Ctrl+X`).

---

## Step 4: Restart the DAC Node Service

Apply the changes by restarting the systemd service:

```bash
sudo systemctl restart dac-node
```

---

## Step 5: Verify Mining Status

1. Check the live service logs to confirm that the node is running, the wallet is unlocked successfully, and mining is active:
   ```bash
   journalctl -u dac-node -f
   ```
   *Look for output lines indicating that the account was unlocked and the miner has started.*

2. Run the status utility to see your mining activity in real-time:
   ```bash
   dacnode-status
   ```
   For details on the status values, see the [Status Monitor](./status-monitor.md) guide.
