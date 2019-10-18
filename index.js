var express = require('express'),
    nodemailer = require("nodemailer"),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express();

app.set('port', (process.env.PORT || 8080));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/formProcess', function (req, res) {
    var data = req.body;
    var smtpTransport = nodemailer.createTransport('smtps://send.it.to.your.friend%40gmail.com:PASSWORD@smtp.gmail.com');
    smtpTransport.sendMail({  //email options
        from: "Send It To Your Friends <send.it.to.your.friend@gmail.com>",
        to: req.body.to, // receiver
        subject: "Bottle cap for washing your eyes", // subject
        html: "This bottle cap is designed for washing eyes exposed to tear gas/CS gas. You can 3D print this bottle cap and put it as a lid on plastic water bottles.<br>(Sent from sendittoyourfriends.com)", // body
	attachments: [
		{
			path: 'public/assets/bottlecapeyewasher.obj'
		}
	]
    }, function (error, response) {  //callback
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + res.message);
        }

        smtpTransport.close();
	res.redirect("/");
    });
});

app.listen(app.get('port'), function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Running on port: ' + app.get('port')); }
});
