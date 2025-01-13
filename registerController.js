const { addToQueue } = require('./queue');

let users = [];

function isEmailDuplicate(email) {
    return users.some(user => user.email === email);
}

async function registerUser(req, res) {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).send('Name and email are required.');
  }

  if (isEmailDuplicate(email)) {
    return res.status(400).send('This email is already registered.');
  }

  const newUser = { username, email };
  users.push(newUser);

  console.log(`User registered: ${username} with email: ${email}`);

  const emailData = {
    toEmail: email,
    subject: `Welcome ${username}`,
    text: `Hello ${username},\n\nThank you for registering with us.`
  }
  addToQueue(emailData);

  res.status(201).json({ message: 'User registered successfully.' });
}

module.exports = { registerUser };
