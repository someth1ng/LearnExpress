const express   = require('express');
const hbs       = require('hbs');
const fs        = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${ now }: ${ req.method } ${ req.url }`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

// use public dir
app.use(express.static(__dirname + '/public'));

// hbs helper
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', txt => {
    return txt.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        msg: 'Welcome to my Website!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        id: 404,
        message: 'Page not found.'
    });
});

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log('Server has started!');
});
