# GeoPixelcons++ Shell Agent Guide

## Purpose

This repository produces the small Greasyfork-facing GeoPixelcons++ userscript.
It contains metadata, the verified library pin, and a safe boot/failure message.
The complete feature implementation is in the companion
`geopixelcons-library` repository.

Do not move feature state into this shell. `@require` runs before the shell, so
the library must expose only a side-effect-free factory; the shell calls its
`boot()` method after the document is ready.

## Required checks

```powershell
npm run verify
```

The build reads `library.require.json` by default and writes the small
`dist/<version>.user.js` artifact. Keep JavaScript UTF-8 without a BOM.

## AI Git agreement

AI may inspect, test, create commits, push, and open pull requests, but only
from an internal branch named `feature/<short-description>`.

- Never commit, merge, rebase, force-push, or push directly to `main`.
- Never delete or retarget tags; preview tags and stable tags are immutable.
- Never bypass a required PR review or protection rule.
- Use conventional commits: `feat:` for a minor release, `fix:` for a patch
  release, and `chore:` or `docs:` for non-release work.
- Prefer squash merges so Release Please receives one intentional conventional
  commit message.
- Never add secrets, private tokens, or local credentials to the repository.

Preview tags are test candidates, not Greasyfork releases. Stable tags are
created only by a human-reviewed Release Please PR, except for the explicitly
manual one-time `v2.0.0` bootstrap workflow.

## Preview tag rule

After the first stable release, `feat:` (or a `release:minor` label) yields the
next minor version; `fix:` or other work (or `release:patch`) yields the next
patch version. Each same-repository PR update creates exactly one immutable tag
in this form:

```text
v<next-version>-<feature-branch-slug>-<incrementing-number>
```

The counter starts at `1` and increases across every update of that feature
branch, even if the selected minor/patch base changes. The first PR before a
stable release uses the requested `v2.0.0` baseline.

## Cross-repository release order

First merge and release `geopixelcons-library`. Verify its public jsDelivr
artifact's SHA-256 SRI. Then change `library.require.json` in a new shell
feature branch, run the checks, and release the shell. Never publish a shell
whose pin is a preview/local tag, a branch, `latest`, or an unhashed URL.
