const express = require('express'),
      bodyParser = require('body-parser'),
      expressNunjucks = require('express-nunjucks');
      path = require('path'),
      app = express(),  
      port = process.env.PORT || 8080,
      url = require('url'),
      createPDF = require('./libs/create-pdf');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/src/templates');

app.set('view engine', 'html');

const njk = expressNunjucks(app, {
    watch: app.get('env') === 'development',
    noCache: app.get('env') === 'development',
    globals: {title: 'PDF'}
});

app.get('/ui', function(req, res) {
    res.render('views/index');
});


app.post('/', function (req, res) {
    createPDF(req.body['sp-url'])
        .then(pdf => {
            let filename = url.parse(req.body['sp-url']).host.split('.').join('-');
            res.header('Content-type', 'application/pdf');
            res.header('Content-disposition', `inline; filename=${filename}.pdf`);
            res.attachment(`${filename}.pdf`);
            pdf.pipe(res);
        })
        .catch(error => {
            res.status(500);
            res.redirect('back');
        });
});


app.listen(port, function() {
    console.log('server listening on port ' + port);
});

