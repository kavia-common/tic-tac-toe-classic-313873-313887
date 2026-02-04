# npm install troubleshooting (React frontend)

This project uses Create React App (`react-scripts@5`).

## Quick environment check

```bash
node -v
npm -v
```

Recommended: Node 16 or 18 (LTS). Node 20 may work but can expose dependency/peer issues.

## Standard clean reinstall (fixes most issues)

From the `frontend/` folder:

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --no-audit --no-fund
```

## Peer dependency / ERESOLVE issues

If you see errors like `ERESOLVE could not resolve`:

```bash
npm install --no-audit --no-fund --legacy-peer-deps
```

If that resolves it, consider aligning dependency versions later (pinning specific versions).

## Network / registry / proxy issues

If you see `ETIMEDOUT`, `ECONNRESET`, TLS/SSL issues, or registry errors:

```bash
npm config set registry https://registry.npmjs.org/
npm config get proxy
npm config get https-proxy
```

If you are behind a corporate proxy, set `proxy` and `https-proxy` correctly, otherwise unset them.

## Permission issues (EACCES)

If you see `EACCES` errors related to the npm cache:

```bash
sudo chown -R "$(id -u)":"$(id -g)" ~/.npm
```

Avoid global installs when possible.

## When asking for help

Please provide:
1) Full `npm install` output
2) Node + npm versions
3) The referenced npm debug log file (usually under `~/.npm/_logs/`)
