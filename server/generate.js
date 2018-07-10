function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = () => {
  var faker = require("faker");
  var _ = require("lodash");

  var division = [
    'Front End Group 1',
    'Front End Group 2',
    'Front End Group 3'
  ];

  var issues = [
    'Hard for Debugging',
    'Keeping up with Technology',
    'Communication with others',
    'Time Estimation',
    'Security Threats'
  ];

  var userTypes = [
    'member',
    'team_leader',
    'group_leader'
  ];

  return {
    users: _.times(30, (n) => ({
      id: (n + 1),
      email: faker.random.arrayElement(userTypes) + (n + 1) + '@gmail.com',
      firstName: faker.name.prefix() + ' ' + faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: faker.image.avatar(),
      address: faker.address.streetAddress("###") + ' ' + faker.address.city() + ' ' + faker.address.county(),
      phone: faker.phone.phoneNumberFormat(),
      division: faker.random.arrayElement(division),
      password: "123456",
      role: faker.random.arrayElement(userTypes)
    })),

    reports: _.times(40, (n) => ({
      id: (n+1),
      memberId: getRandomInt(1, 20),
      title: faker.lorem.sentence(),
      date: faker.date.weekday(),
      achievement: faker.lorem.sentence(),
      plan: faker.lorem.sentences(), // Plan for next day.
      issues: issues,
      description: faker.lorem.paragraphs(),
      comment: faker.lorem.sentences()
    })),
  }
}



