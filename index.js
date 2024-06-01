const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("trang chu");
})

app.get("/products", (req, res) => {
    res.send("trang danh sach san pham");
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})