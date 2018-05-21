var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer');
    var bodyParser = require('body-parser');

    var app = express();
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var port = 3000;
    app.get('/', function (req, res) {
      res.render('index'); // why from views file 
    });
    app.post('/send-email', function (req, res) {
      let transporter = nodeMailer.createTransport({
          service: 'Gmail',
          auth: {
              user: 'xxxx@gmail.com',
              pass: 'xxxx'
          }
      });
      let mailOptionToMe = {
          from: '"dong van" <nickyvan194@gmail.com>', // sender address
          to: 'nickyvan194@gmail.com', // list of receivers
          subject: req.body.subject, // Subject line
          text: req.body.body// plain text body
          // html body
      }
      let mailOptions = {
          from: '"dong van" <nickyvan194@gmail.com>', // sender address
          to: req.body.to, // list of receivers
          subject: req.body.subject, // Subject line
          text: req.body.body, // plain text body
          html: '<b>Thank for using my service! I reply soon</b>' // html body
      };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            });
          transporter.sendMail(mailOptionToMe, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
                res.render('index');
            });
      });
    app.listen(port, function(req, res){
      console.log('Server is running at port: ',port);
    });