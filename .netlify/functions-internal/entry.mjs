import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_164118a7.mjs';
import 'react';
import 'react-dom/server';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import '@astrojs/internal-helpers/path';
import 'html-escaper';
import 'clsx';
import './chunks/astro_91f7a1d0.mjs';
import 'mime';
import 'path-to-regexp';

const _page0  = () => import('./chunks/image-endpoint_a0169dca.mjs');
const _page1  = () => import('./chunks/index_cba46e3d.mjs');
const _page2  = () => import('./chunks/index_3ca239c0.mjs');
const _page3  = () => import('./chunks/ai-search_c6c6f4a5.mjs');
const _page4  = () => import('./chunks/astro-movies_40544372.mjs');const pageMap = new Map([["node_modules/astro/dist/assets/image-endpoint.js", _page0],["src/pages/index.astro", _page1],["src/pages/movie/[id]/index.astro", _page2],["src/pages/beta/ai-search.astro", _page3],["src/pages/api/v1/astro-movies.ts", _page4]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap };
