const express = require("express");
const app = express();
const cors = require("cors");

const imageUploadRoutes = require("./routes/imageUpload.route");
const heroRoutes = require("./routes/hero.route");
const noticeRoutes = require("./routes/notice.route");


// Custom CORS middleware to set additional headers
const customCors = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // Use specific origin in production
    // Another common pattern: Allow dynamic origin
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle preflight request (OPTIONS)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Proceed to next middleware or route
    next();
};

app.use(cors());
app.use(customCors);
app.use(express.json());



// my apis
app.use("/api/v1/upload", imageUploadRoutes);
app.use("/api/v1/hero", heroRoutes);
app.use("/api/v1/notice", noticeRoutes);

//get image
app.get("/images/:filename", function (req, res) {
    var filename = req.params.filename;
    res.sendFile(__dirname + "/image/" + filename);
});

// route hit
app.get("/", (req, res, next) => {
    res.send(
        `<h1 style="color:#00ff00;font-size:62px; text-align:center;margin-top:200px">"Database Running with ICE"</h1>`
    );
});

module.exports = app;
