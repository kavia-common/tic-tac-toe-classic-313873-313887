# npm install troubleshooting (React frontend)

This project uses Create React App (`react-scripts@5`).

## 0) What I need from you (copy/paste this “diagnostics bundle”)

If you haven’t shared logs yet, please paste the output of:

```bash
# from tic-tac-toe-classic-313873-313887/frontend
node -v
npm -v
npm config get registry
npm config get proxy
npm config get https-proxy
npm config list -l | sed -n '1,120p'   # ok to paste first ~120 lines only

# then run install with verbose logs
npm install --no-audit --no-fund --verbose
```

If the install fails, also paste:
- The **exact error block** (from `npm ERR!` down to the end)
- The **debug log path** printed by npm (usually `~/.npm/_logs/<timestamp>-debug-0.log`), and the contents of that log if possible.

Without the above, we can only guess which failure mode you’re hitting.

## 1) Quick environment check

```bash
node -v
npm -v
```

Recommended: Node 16 or 18 (LTS). Node 20 may work but can expose dependency/peer issues.

If you’re on Node 20+ and getting install errors, try Node 18:
- If you use `nvm`: `nvm install 18 && nvm use 18`
- Then re-run the clean reinstall steps below.

## 2) Standard clean reinstall (fixes most issues)

From the `frontend/` folder:

```bash
rm -rf node_modules package-lock.json
npm cache verify
npm install --no-audit --no-fund
```

If you still fail, try a fully cold cache (rarely needed, but effective for corrupted cache):
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --no-audit --no-fund
```

## 3) Peer dependency / ERESOLVE issues

If you see errors like `ERESOLVE could not resolve`:

```bash
npm install --no-audit --no-fund --legacy-peer-deps
```

Notes:
- This project’s dependency set is small (react/react-dom/react-scripts). `ERESOLVE` usually means your npm/node combo is stricter, or something in your environment is injecting extra deps.
- If `--legacy-peer-deps` works, send the log anyway and we can decide whether to pin/adjust versions.

## 4) Network / registry / proxy / SSL issues

Symptoms: `ETIMEDOUT`, `ECONNRESET`, `CERT_*`, TLS handshake errors, 403/407 proxy errors.

Run:

```bash
npm config set registry https://registry.npmjs.org/
npm ping
npm config get proxy
npm config get https-proxy
```

If you are **not** behind a proxy, make sure proxy settings are empty:

```bash
npm config delete proxy
npm config delete https-proxy
```

If you **are** behind a corporate proxy, ensure they’re set correctly and that your org’s certs are installed (often the root cause of `CERT_*` errors).

## 5) Permission issues (EACCES)

If you see `EACCES` related to npm cache or global directories:

```bash
sudo chown -R "$(id -u)":"$(id -g)" ~/.npm
```

Also avoid `sudo npm install` in the project folder.

## 6) OS-specific build toolchain issues (node-gyp / Python / make)

Less likely for this repo, but if you see `node-gyp` errors:
- On macOS: install Xcode Command Line Tools: `xcode-select --install`
- On Ubuntu/Debian: `sudo apt-get update && sudo apt-get install -y build-essential python3 make g++`

(If you paste your error log we can confirm whether this applies.)

## When asking for help

Please provide:
1) Full `npm install --verbose` output
2) Node + npm versions
3) The referenced npm debug log file (usually under `~/.npm/_logs/`)
4) Whether you are behind a proxy/VPN and what OS you’re on
