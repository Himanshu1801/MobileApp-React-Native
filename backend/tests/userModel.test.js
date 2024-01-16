const User = require('../userModel');

test('Create User object', () => {
  const userData = {
    name: 'John Doe',
    age: 25,
    emailId: 'john@example.com',
    password: 'password123',
  };

  const newUser = User.createUser(userData);

  const user2 = {
    name: newUser.name,
    age: newUser.age,
    emailId: newUser.emailId,
    password: newUser.password,
  };

  expect(user2).toEqual(userData);
});