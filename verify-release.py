"""Verify the reviewed static artifact; never export the private source workspace."""
from pathlib import Path
import hashlib
import json

root = Path(__file__).resolve().parent
site = root / 'site'
manifest = json.loads((root / 'release-manifest.json').read_text())
actual = {str(p.relative_to(site)): p for p in site.rglob('*') if p.is_file()}
assert set(actual) == set(manifest['files']), 'Public file inventory differs from reviewed release'
for name, path in actual.items():
    assert not path.is_symlink(), f'Symlink is not a public asset: {name}'
    assert hashlib.sha256(path.read_bytes()).hexdigest() == manifest['files'][name], name
assert (site / 'index.html').is_file()
assert manifest['origin'] == 'https://toshaliliterature.org'
print(f'PASS: {len(actual)} reviewed public files')
