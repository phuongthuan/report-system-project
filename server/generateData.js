var faker = require('faker');

var database = {
  users: [],
  reports: [],
  weeky_reports: [],
  messages: []
};

const division = [
  'Front End Team 1',
  'Front End Team 2',
  'Front End Team 3',
  'Front End Team 4',
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

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
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

for (let i=46; i<=49; i++) {
  database.users.push({
    id: i,
    email: "teamleader" + i + "@gmail.com",
    firstName: faker.name.prefix() + ' ' + faker.name.firstName(),
    lastName: faker.name.lastName(),
    avatar: faker.image.avatar(),
    address: faker.address.streetAddress("###") + ' ' + faker.address.city() + ' ' + faker.address.county(),
    phone: faker.phone.phoneNumberFormat(),
    division: `Front End Team ${50-i}`,
    password: "123456",
    role: "team_leader"
  });
}

database.users.push({
  id: 50,
  email: "groupleader@gmail.com",
  firstName: faker.name.prefix() + ' ' + faker.name.firstName(),
  lastName: faker.name.lastName(),
  avatar: faker.image.avatar(),
  address: faker.address.streetAddress("###") + ' ' + faker.address.city() + ' ' + faker.address.county(),
  phone: faker.phone.phoneNumberFormat(),
  division: 'Design Marketing Group A',
  password: "123456",
  role: "group_leader"
});

for (let i=1; i<=600; i++) {
  database.reports.push({
    id: i,
    userId: getRandomInt(1, 45),
    title: faker.lorem.sentence(),
    date: faker.date.between('2018-06-01', '2018-09-31'),
    achievement: faker.lorem.sentence(),
    plan: faker.lorem.sentences(), // Plan for next day.
    issues: getRandom(issues, getRandomInt(1, 5)),
    description: faker.lorem.paragraphs(),
    comment: faker.lorem.sentences()
  });
}

for (let i=1; i<=20; i++) {
  database.weeky_reports.push({
    id: i,
    userId: getRandomInt(46, 49),
    issues: faker.lorem.sentence(),
    solutions: faker.lorem.sentence(),
    date: faker.date.between('2018-06-01', '2018-09-31'),
    description: faker.lorem.paragraphs(),
    summary: faker.lorem.sentences()
  });
}

for (let i=1; i<=500; i++) {
  database.messages.push({
    id: i,
    userId: getRandomInt(1, 50),
    toUser: getRandomInt(1, 50),
    title: faker.lorem.sentence(),
    message: faker.lorem.sentence(),
    date: faker.date.between('2018-06-01', '2018-09-31'),
  });
}


console.log(JSON.stringify(database));