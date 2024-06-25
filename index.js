const express = require("express");
require('dotenv').config();
const bodyParse = require('body-parser');
const flash = require("express-flash")
const cookieParser = require("cookie-parser");
const session = require("express-session");

const database = require("./config/database");
database.connect();

const routeAdmin = require("./routes/admin/index.route");
const routeClient = require("./routes/client/index.route");
const systemConfig = require("./config/system");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT;

// Flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 6000 }}));
app.use(flash());
// End flash

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static('public'));

//App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

routeAdmin.index(app);
routeClient.index(app);

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});


    