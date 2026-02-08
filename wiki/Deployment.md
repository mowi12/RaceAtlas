# Deployment

## Overview

Deployments are handled via Docker images built in CI and pulled by the VPS. The deploy workflow runs after a successful
Docker publish on `main`, so merging to `main` is what triggers a production update.

## GitHub Actions

Required repository variables/secrets:

- `SSH_HOST`
- `SSH_USER`
- `SSH_PORT`
- `SSH_PRIVATE_KEY`

The deploy workflow runs:

```bash
docker compose pull
docker compose up -d
docker image prune -f
```

## Local Docker

```bash
docker compose up -d
```

The app is available at `http://localhost:3042` (configurable via `.env`).
