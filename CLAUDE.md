# Claude Instructions

Read [AGENTS.md](AGENTS.md) first; it is the shared working agreement for all
coding agents.

This repository is the tiny GeoPixelcons++ userscript shell. Keep the
`@require` URL exact, tag-based, and SRI-pinned; the separate library repository
owns the feature implementation. Do not use a preview tag for a public build.

When using Git, work only in an internal `feature/<name>` branch. You may make
normal Git changes there—including commits, pushes, and PR creation—but never
write to `main`, force-push, merge a PR, or change/delete tags. Run `npm run
verify` before committing runtime or release changes.
