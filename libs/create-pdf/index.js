const fs = require('fs'),
    cheerio = require('cheerio'),
    request = require('request'),
    pdf = require('html-pdf'),
    options = { 
        'orientation': 'portrait',
        'border': {
            'top': '0.5in',
            'right': '2cm',
            'bottom': '.5in',
            'left': '2cm'
        }
    };

const urlToString = url => {
    return new Promise(function(resolve, reject){
        request(url, (err, resp, body) => {
            if(err) reject(err);
            resolve(cheerio.load(body).html());
        });
    }); 
};


module.exports = (URI, res) => {
    return new Promise(function(resolve, reject){
        urlToString(URI)
            .then(html => {
                pdf.create(html, options).toStream((err, stream) => {
                    if(err) reject(err);
                    resolve(stream);
                });
            });
    });
};




/*pdf.create(html, options).toBuffer(function(err, buffer){
        res.setHeader('Content-type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=file.pdf`);
        res.end(buffer);
    });*/
    

    /*const html = req.body.data;
    res.set('Content-type', 'application/pdf');
    res.set('Content-disposition', 'attachment; filename=pdf.pdf');
    pdf.create(html).toStream((err, stream) => {
      if (err) { res.status(422).send(err); }
      stream.pipe(res);
    });*/