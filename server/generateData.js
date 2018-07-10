var faker = require('faker');

var database = { reports: [] };

var issues = [
  'Hard for Debugging',
  'Keeping up with Technology',
  'Communication with others',
  'Time Estimation',
  'Security Threats'
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (var i=1; i<=1000; i++) {
  database.reports.push({
    id: i,
    memberId: getRandomInt(1, 20),
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