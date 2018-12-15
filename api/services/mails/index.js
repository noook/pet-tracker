/**
 * @service mails
 * @description Mails service
 */

const
	{ smtp, prevented } = require.main.require('./config'),
	nodemailer = require('nodemailer');

class Mails {
	notifyNewAlert(data) {
		const transporter = nodemailer.createTransport(smtp);
		const message = {
			from: 'me@neilrichter.com',
			to: prevented,
			subject: 'New Alert !',
			text: `An abandonned ${data.animal} has been found !`,
		};
		transporter.sendMail(message);
	}
}

module.exports = new Mails();