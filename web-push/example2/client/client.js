const publicVapidKey =
  "BNMSHXaAE7fcpxB9IbbUdJM7IC8rA3Nm1D5M9oN7RGjFw1AuKhDZ1_rp6VMIw9W5Ov3ATd3MgMbZ5MzotuGc4Cs";

if ("serviceWorker" in navigator) {
  registerServiceWorker().catch(console.log);
}

async function registerServiceWorker() {
  const register = await navigator.serviceWorker.register("./worker.js", {
    scope: "/",
  });

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey,
  });

  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
