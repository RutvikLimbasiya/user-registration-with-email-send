const { addToQueue } = require('./queue');
const { sendEmail } = require('./emailService');

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

  addToQueue(async () => {
    const subject = `Welcome ${username}`;
    const text = `Hello ${username},\n\nThank you for registering with us.`;
    await sendEmail(email, subject, text);
  });

  res.status(201).json({ message: 'User registered successfully.' });
}

module.exports = { registerUser };
