const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

// Create express app.
const app = express();

// Use body parser which we will use to parse request body that sending from client.
app.use(bodyParser.json());

// We will store our client files in ./client directory.
app.use(express.static(path.join(__dirname, "client")))

const publicVapidKey = "BNMSHXaAE7fcpxB9IbbUdJM7IC8rA3Nm1D5M9oN7RGjFw1AuKhDZ1_rp6VMIw9W5Ov3ATd3MgMbZ5MzotuGc4Cs";

const privateVapidKey = "s8A53Msn_J6pZST3qS--6o6lKTWn2u7-mrR3iQpp-4U";

// Setup the public and private VAPID keys to web-push library.
webpush.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);

// Create route for allow client to subscribe to push notification.
app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({ title: "我是测试", body: "This is your first push notification" });

    webpush.sendNotification(subscription, payload).catch(console.log);
})

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});