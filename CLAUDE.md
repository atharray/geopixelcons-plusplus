# Claude Instructions

Read [AGENTS.md](AGENTS.md) first; it is the shared working agreement for all
coding agents.

This repository is the tiny GeoPixelcons++ userscript shell. Keep the
`@require` URL exact, tag-based, and SRI-pinned; the separate library repository
owns the feature implementation. Do not use a preview tag for a public build.

When using Git, work only in an internal `feature/<name>` branch. You may make
normal Git changes there—including commits, pushes, and PR creation. After the
user has tested the candidate in Tampermonkey and explicitly approves release
in the current conversation, you may merge the feature PR and verified Release
Please PR through normal branch protection. Never write directly to `main`,
force-push, self-approve a required review, or change/delete tags. Run `npm run
verify` before committing runtime or release changes. Greasyfork upload remains
a manual user action.

Whenever `library.require.json` changes here in response to a
`geopixelcons-library` merge, tell the user the resulting `@require` line
(preview or stable) — see [AGENTS.md](AGENTS.md)'s cross-repository release
order section.

The Release Please configuration versions the tracked `dist/user.js` artifact
through its generic version markers, so keep that artifact aligned with
`package.json` before merging a release PR.
