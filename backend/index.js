const express = require("express");
const cors = require("cors");
const fs = require('fs');
const https = require('https');
const path = require('path'); // تأكد من استيراد مكتبة path
require('dotenv').config();
require('./models/db');

const app = express();
const PORT = process.env.PORT || 443; // 443 هو المنفذ الافتراضي لـ HTTPS

// خدمة الملفات الثابتة من مجلد البناء لتطبيق React
app.use(express.static(path.join(__dirname, '/usr/local/lsws/Example/html/')));

const postsRouter = require("./routes/posts");
const categoriesRouter = require("./routes/Categories");
const ColorRouter = require("./routes/Color");
const OrderRouter = require("./routes/Orders");
const ItemRouter = require("./routes/Items");
const AdminRouter = require("./routes/Admin");

app.use(cors());
app.use(express.json());

app.use("/posts", postsRouter);
app.use("/admin", AdminRouter);
app.use("/categories", categoriesRouter);
app.use("/color", ColorRouter);
app.use("/order", OrderRouter);
app.use("/item", ItemRouter);
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/usr/local/lsws/Example/html/', 'index.html'));
});

const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/jalal.store-0001/privkey_unencrypted.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/jalal.store-0001/fullchain.pem')
};

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Server listening at https://localhost:${PORT}`);
});