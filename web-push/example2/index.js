const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client")))

const publicVapidKey = "BNMSHXaAE7fcpxB9IbbUdJM7IC8rA3Nm1D5M9oN7RGjFw1AuKhDZ1_rp6VMIw9W5Ov3ATd3MgMbZ5MzotuGc4Cs";

const privateVapidKey = "s8A53Msn_J6pZST3qS--6o6lKTWn2u7-mrR3iQpp-4U";

webpush.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);

app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    console.log(subscription)
    res.status(201).json({});
    const payload = JSON.stringify({ title: "我是测试", body: "This is your first push notification" });

    webpush.sendNotification(subscription, payload).catch(console.log);
})

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});