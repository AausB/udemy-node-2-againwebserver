const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

hbs.registerPartials(__dirname + '/views/partials');

// express middleware
app.set('view engine', 'hbs');


app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) => {
    if (error) {
      console.log('ERROR: Unable to log to server.log');
    }
  });
  next();
});

// app.use((request, response, next) => {
//   response.render('maintenance.hbs', {
//     pageTitle: 'Please be patient',
//     maintenanceMessage: 'Website maintenance - we are back soon ...'
//
//     // no next() here
//   });
// });

// set up static directory
app.use(express.static(__dirname + '/public'));

// hbs helper
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// http handler for get request
app.get('/', (request, response) => {
  // response.send('<h1>Hello Express!</h1>');
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hey, welcome on the website'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page'
  });
})

// /bad : send JSON with errorMessage
app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
