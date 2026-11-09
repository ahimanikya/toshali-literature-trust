# Toshali Literature Trust

Public static website for https://toshaliliterature.org.

This repository contains only the reviewed public export. Canonical design,
content preparation and provenance remain in the Kabita Live project workspace.
The site is built there using Astro and Node 24 before this export is prepared.

Publication is manual. Ahimanikya must approve the exact commit for every release.
Only the repository owner may dispatch the main-branch publishing workflow, with
the full approved commit SHA. The `github-pages` environment requires ahimanikya
as sole reviewer, permits main only, and disables administrator bypass.
Pushing commits never publishes the site.

The release manifest binds every public file to its SHA-256 digest. Only `site/`
is uploaded as a Pages artifact; the private knowledge base, raw captures,
registration simulation and unpublished submissions are excluded.
