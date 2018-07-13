var faker = require('faker');

var database = {
  users: [],
  reports: []
};

const division = [
  'Front End Group 1',
  'Front End Group 2',
  'Front End Group 3'
];

const issues = [
  'Hard for Debugging',
  'Keeping up with Technology',
  'Communication with others',
  'Time Estimation',
  'Security Threats'
];

const userTypes = [
  'member',
  'team_leader',
  'group_leader'
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


for (let i=1; i<=45; i++) {
  database.users.push({
    id: i,
    email: "member" + i + "@gmail.com",
    firstName: faker.name.prefix() + ' ' + faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatar: faker.image.avatar(),
    address: faker.address.streetAddress("###") + ' ' + faker.address.city() + ' ' + faker.address.county(),
    phone: faker.phone.phoneNumberFormat(),
    division: faker.random.arrayElement(division),
    password: "123456",
    role: "member"
  });
}

for (let i=1; i<=5; i++) {
  database.users.push({
    id: i,
    email: "teamleader" + i + "@gmail.com",
    firstName: faker.name.prefix() + ' ' + faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatar: faker.image.avatar(),
    address: faker.address.streetAddress("###") + ' ' + faker.address.city() + ' ' + faker.address.county(),
    phone: faker.phone.phoneNumberFormat(),
    division: faker.random.arrayElement(division),
    password: "123456",
    role: "team_leader"
  });
}

database.users.push({
  id: 1,
  email: "groupleader@gmail.com",
  firstName: faker.name.prefix() + ' ' + faker.name.firstName(),
  lastName: faker.name.lastName(),
  avatar: faker.image.avatar(),
  address: faker.address.streetAddress("###") + ' ' + faker.address.city() + ' ' + faker.address.county(),
  phone: faker.phone.phoneNumberFormat(),
  division: faker.random.arrayElement(division),
  password: "123456",
  role: "group_leader"
});

for (let i=1; i<=400; i++) {
  database.reports.push({
    id: i,
    userId: getRandomInt(1, 40),
    title: faker.lorem.sentence(),
    date: faker.date.weekday(),
    achievement: faker.lorem.sentence(),
    plan: faker.lorem.sentences(), // Plan for next day.
    issues: issues,
    description: faker.lorem.paragraphs(),
    comment: faker.lorem.sentences()
  });
}

console.log(JSON.stringify(database));