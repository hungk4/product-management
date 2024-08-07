const express = require("express");
require('dotenv').config();
const bodyParse = require('body-parser');

const flash = require("express-flash")
const cookieParser = require("cookie-parser");
const session = require("express-session");

const methodOverride = require('method-override');
const path = require('path');

const database = require("./config/database");
database.connect();

const routeAdmin = require("./routes/admin/index.route");
const routeClient = require("./routes/client/index.route");
const systemConfig = require("./config/system");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'))

// Flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 6000 }}));
app.use(flash());
// End flash

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(express.static(`${__dirname}/public`));

//App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

routeAdmin.index(app);
routeClient.index(app);

app.get("*", (req, res) => {
    res.render("client/pages/errors/404", {
        pageTitle: "404 Not Found"
    });
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});


    