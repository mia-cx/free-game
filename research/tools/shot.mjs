// Screenshots pages through Chromium's CDP in a background tab.
// Usage: node tools/shot.mjs <port> <out-dir> <width> <dark:0|1> <url>... [--eval <js>]
import { writeFile } from 'node:fs/promises';

const [port, outDir, width, dark, ...rest] = process.argv.slice(2);
const evalAt = rest.indexOf('--eval');
const urls = evalAt === -1 ? rest : rest.slice(0, evalAt);
const script = evalAt === -1 ? null : rest[evalAt + 1];

const { webSocketDebuggerUrl } = await (await fetch(`http://localhost:${port}/json/version`)).json();
const ws = new WebSocket(webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));

let id = 0;
const pending = new Map();
ws.addEventListener('message', ({ data }) => {
	const msg = JSON.parse(data);
	if (msg.id && pending.has(msg.id)) {
		const { resolve, reject } = pending.get(msg.id);
		pending.delete(msg.id);
		msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
	}
});
const send = (method, params = {}, sessionId) =>
	new Promise((resolve, reject) => {
		pending.set(++id, { resolve, reject });
		ws.send(JSON.stringify({ id, method, params, sessionId }));
	});

const { targetId } = await send('Target.createTarget', { url: 'about:blank', background: true });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
const s = (m, p) => send(m, p, sessionId);
await s('Page.enable');
await s('Emulation.setFocusEmulationEnabled', { enabled: true });
await s('Emulation.setDeviceMetricsOverride', {
	width: Number(width),
	height: 900,
	deviceScaleFactor: 1,
	mobile: Number(width) < 600
});
await s('Emulation.setEmulatedMedia', {
	features: [{ name: 'prefers-color-scheme', value: dark === '1' ? 'dark' : 'light' }]
});

for (const [i, url] of urls.entries()) {
	await s('Page.navigate', { url });
	await new Promise((r) => setTimeout(r, 1500));
	if (script) await s('Runtime.evaluate', { expression: script, awaitPromise: true });
	await new Promise((r) => setTimeout(r, 300));
	const { data } = await s('Page.captureScreenshot', {
		format: 'png',
		captureBeyondViewport: !process.env.VIEWPORT_ONLY
	});
	const file = `${outDir}/${i}-${width}${dark === '1' ? '-dark' : ''}.png`;
	await writeFile(file, Buffer.from(data, 'base64'));
	console.log(file);
}
await send('Target.closeTarget', { targetId });
ws.close();
