let database = [
  {
    email: "test1@test.com",
    userId: 1,
    phone: "123456",
  },
  {
    email: "test2@test.com",
    userId: 2,
    phone: "123456",
  },
];

async function getUserFromDatabase(emailId) {
  const user = database.find((item) => item.email === emailId);
  if (user) {
    return user;
  } else {
    return null;
  }
}

async function addPhoneNumberToDatabaseUser(id) {
  const index = database.findIndex((item) => item.userId == id);
  if (index) {
    database[index].phone = "1234567890";
    console.log(database[index]);
  }
}
async function updateUser() {
  let user = await getUserFromDatabase("test2@test.com");
  if (user) {
    await addPhoneNumberToDatabaseUser(user.userId);
  }
}

const result = updateUser(1, 2);
