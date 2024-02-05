self.addEventListener("push", function (e) {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.link,
    actions: [
      {
        action: "action-1",
        title: "操作一",
      },
      {
        action: "action-2",
        title: "操作二",
      },
    ],
  });
});
