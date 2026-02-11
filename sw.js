const CACHE_NAME = "placido-qr-v1";
// Lista de arquivos para salvar offline
const ASSETS = [
  "/app.html",
  "/qrcode.png",
  "/icon.png",
  "/manifest.json"
];

// Instalação: Baixa os arquivos
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch: Quando o app pede um arquivo, tenta entregar do cache
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});