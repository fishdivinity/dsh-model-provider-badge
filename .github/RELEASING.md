# Releasing

## 1. First publish (manual, once)

Trusted publishing can only be attached to a package that already exists, so the
first version goes out by hand from the repository:

```powershell
npm publish --access public
```

Then verify:

```powershell
npm view dsh-model-provider-badge version
```

## 2. Attach the GitHub Actions publisher

On npmjs.com → the package → **Settings → Trusted publishing** → add a GitHub
Actions publisher:

| Field | Value |
|---|---|
| Repository | `<your-user>/dsh-model-provider-badge` |
| Workflow | `release.yml` |
| Environment | (empty) |

After this, no npm token is needed anywhere: the workflow authenticates with the
run's OIDC identity.

## 3. Every later release

1. Bump `version` in `package.json`.
2. Commit and push.
3. Tag and push the tag:

```powershell
git tag v0.1.1
git push origin v0.1.1
```

The workflow checks the tag against `package.json`, parses both scripts, and
publishes with provenance. Never publish a version twice: npm does not allow
reusing one.
