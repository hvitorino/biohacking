const SendGrid = require('sendgrid');

class Mailer extends SendGrid {

  constructor() {
    super(process.env.SENDGRID_APIKEY);
    this.send = this.send.bind(this);
  }

  send({ from, to, subject, content }) {
    const helper = SendGrid.mail;
    const fromEmail = new helper.Email(from);
    const toEmail = new helper.Email(to);
    const body = new helper.Content('text/plain', content);
    const mail = new helper.Mail(fromEmail, subject, toEmail, body);

    const request = this.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    return this.API(request);
  }

}

module.exports = Mailer;
