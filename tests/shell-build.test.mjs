import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import test from 'node:test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const libraryArtifact = join(root, '..', 'geopixelcons-library', 'dist', 'geopixelcons-library.js');
const requireUrl = JSON.parse(readFileSync(join(root, 'library.require.json'), 'utf8')).url;

test('builds only with an immutable SRI-pinned library URL', () => {
    const result = spawnSync(process.execPath, ['build.js'], {
        cwd: root,
        env: { ...process.env, GPC_LIBRARY_REQUIRE_URL: requireUrl },
        encoding: 'utf8',
    });
    assert.equal(result.status, 0, result.stderr);
    const output = join(root, 'dist', '2.0.0.user.js');
    assert.equal(existsSync(output), true);
    const script = readFileSync(output, 'utf8');
    assert.match(script, new RegExp(`@require\\s+${requireUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
    assert.match(script, /GeoPixelconsLibrary\.boot/);
    assert.match(script, /typeof GeoPixelconsLibrary/);
    assert.doesNotThrow(() => new Function(script));
});

test('ships the reviewed library pin as the default build input', async () => {
    assert.match(requireUrl, /^https:\/\/cdn\.jsdelivr\.net\/gh\/atharray\/geopixelcons-library@v\d+\.\d+\.\d+(?:-[A-Za-z0-9-]+)?\/dist\/geopixelcons-library\.js#sha256-[A-Za-z0-9+/]+={0,2}$/);
    if (existsSync(libraryArtifact)) {
        const crypto = await import('node:crypto');
        const localSri = `sha256-${crypto.createHash('sha256').update(readFileSync(libraryArtifact)).digest('base64')}`;
        assert.equal(requireUrl.split('#')[1], localSri);
    }
});

test('rejects an unpinned library URL', () => {
    const result = spawnSync(process.execPath, ['build.js'], {
        cwd: root,
        env: { ...process.env, GPC_LIBRARY_REQUIRE_URL: 'https://cdn.jsdelivr.net/gh/atharray/geopixelcons-library@main/dist/geopixelcons-library.js' },
        encoding: 'utf8',
    });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /exact jsDelivr tag URL/);
});
