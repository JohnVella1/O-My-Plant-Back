require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./app/router');

const app = express();

const port = process.env.PORT || 5000;

const expressJSDocSwagger = require('express-jsdoc-swagger');

// Configuration JSDOC
const options = {
  info: {
    version: '1.0.0',
    title: `O'MyPlant`,
    description: 'A plant manager REST API',
    license: {
      name: 'MIT',
    },
  },
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  baseDir: __dirname,
  filesPattern: './**/*.js',
  swaggerUIPath: '/api-docs',
  exposeSwaggerUI: true,
  exposeApiDocs: false,
  apiDocsPath: '/v3/api-docs',
  notRequiredAsNullable: false,
  swaggerUiOptions: {},
};

const jsDocFunc = expressJSDocSwagger(app);

jsDocFunc(options);

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json({
  limit: 6000000
}));

// const cron = require('node-cron');

// const nodemailer = require('nodemailer');

// // défini l'envoyeur et le destinataire du mail
// // ainsi que le sujet et le contenu
// const mailOptions = {
//    from:'marie.omyplant@gmail.com',
//    to: 'oomyplant@gmail.com',
//    subject: 'wonderful!!! it works!!!',
//    text: 'C\'est mercredi, on arrose Félicie!!'
//  };

// // définir le service: ici GMAIL
// // secure – if true the connection will use TLS when connecting to server. 
// // If false (the default) then TLS is used if server supports the STARTTLS 
// // extension. In most cases set this value to true if you are connecting to 
// // port 465. For port 587 or 25 keep it false
// // auth – defines authentication data 
// // tls – defines additional node.js TLSSocket options to be passed to the 
// // socket constructor, eg. {rejectUnauthorized: true}.
//  const transporter = nodemailer.createTransport({
//    service: 'gmail',
//    secure: false, // use SSL
//    auth: {
//      user: 'marie.omyplant@gmail.com',
//      pass: 'Apo22plant!!'
//    },
//    tls: {
//      rejectUnauthorized: false
//  }
//  });

//  // running a task every minute:
//  cron.schedule('42 9 9 8 2', () => {
//    transporter.sendMail(mailOptions, (error, info) => {
//      if(error) {
//        console.log(error);
//      } else {
//        console.log('Email send: ' + info.response);
//      }
//    })
//  })

// cors
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "exposedHeaders": 'Authorization',
}));

app.use(router);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});