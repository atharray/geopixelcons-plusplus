# GeoPixelcons++ Shell

The small Greasyfork-facing userscript for GeoPixelcons++. Large feature code is
provided by the separately versioned `geopixelcons-library` bundle, loaded from
an exact jsDelivr tag plus Tampermonkey SRI hash.

## Local verification

```powershell
npm run verify
```

The default library pin lives in `library.require.json`. It is source-controlled
on purpose, not a secret. Change it only after the library's stable GitHub tag
is public and its **downloaded** jsDelivr bytes match the SRI value.

## Releases

1. Work on an internal `feature/<name>` branch and open a PR to protected
   `main`.
2. The PR workflow creates an immutable test tag, for example
   `v2.0.0-feature-mobile-shell-1`. The agent gives the user the generated
   candidate userscript for temporary local Tampermonkey testing.
3. When the user reports a successful test and explicitly authorizes release,
   the agent merges the PR through normal branch protection. For the first
   `v2.0.0` stable release, it then runs **Bootstrap stable release** from
   GitHub Actions.
4. Afterwards Release Please opens a release PR from merged `feat:` or `fix:`
   work. With the same release authorization, the agent verifies and merges it
   to create future stable tags and rebuilt userscript assets.
5. Upload only a stable release asset to Greasyfork—never a preview tag.

The library must be released and CDN-verified before this shell is released.
See [AGENTS.md](AGENTS.md) and [CLAUDE.md](CLAUDE.md) for the AI Git agreement.
