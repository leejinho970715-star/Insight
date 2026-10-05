// Vercel serves the generated HTML and assets directly; server.mjs is local-only.
process.env.DEPLOYMENT_URL ||= 'https://insight-psi.vercel.app/';
await import('./build-pages.mjs');
await import('./verify.mjs');
