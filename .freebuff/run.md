# How to Run the Dev Server

## Reproduce uncommitted artifacts

No special artifacts needed — `.env.local` is already present in the worktree.

## Run the server

```bash
node node_modules/next/dist/bin/next dev -p 3010
```

Port 3010 is the default dev port. If occupied, kill the previous process first:

```bash
netstat -ano | grep "3010.*LISTEN"
taskkill //PID <pid> //F
```

**Note:** The project uses `output: 'export'` in `next.config.ts`, so `next start` does NOT work. Use `next dev` for development, or `npx serve out` to serve the static build.
