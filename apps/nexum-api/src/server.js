import { createNexumApi } from "./http.js";

const port = Number.parseInt(process.env.PORT ?? "8788", 10);
const host = process.env.HOST ?? "127.0.0.1";

const server = createNexumApi();

server.listen(port, host, () => {
  console.error(`nexum-api listening on http://${host}:${port}`);
});
