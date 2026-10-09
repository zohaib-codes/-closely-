
import { createApi } from "./app.js";


const api = createApi();

let isShutingDown = false;

async function shutDown(signal: "SIGINT" | "SIGTERM"): Promise<void> {
  if (isShutingDown) {
    return
  }

  isShutingDown = true;

  const shutdownDeadline = setTimeout(() => {
    api.log.fatal("Api shutdown exceeded 10 seconds");
    process.exit(1);
  }, 10_000);

  shutdownDeadline.unref();
  try {
    api.log.info({ signal }, "Api shutdown started");
    await api.close();
    api.log.info("Api shutdown completed");
  } catch (error: unknown) {
    api.log.error({ err: error }, "Api shutdown failed");
    process.exitCode = 1;
  } finally{
    clearTimeout(shutdownDeadline);
  }

}




try {
  await api.listen({
    host: "127.0.0.1",
    port: 3000
  })

  process.on("SIGINT", () => {
    void shutDown("SIGINT")
  })

  process.on("SIGTERM", () => {
    void shutDown("SIGTERM")
  })
} catch (error: unknown) {
  api.log.error({ err: error }, "Api startup failed");
  process.exitCode = 1;
}


