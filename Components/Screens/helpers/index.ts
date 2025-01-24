import { faker } from '@faker-js/faker';
import { User } from "./interfaces";

// Function to generate random UUID
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

class Helpers {
  genActiveUser() {
    const user: User = {
      fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      avatar: faker.image.avatar(),
      location: `${faker.address.state()} ${faker.address.countryCode()}`,
    };

    return user;
  }

  genFriendsList(max: number | undefined = 5): Array<User> {
    const users: Array<User> = [];

    for (let index = 0; index < max; index++) {
      users.push({
        id: generateUUID(),  // Using custom UUID generator
        fullName: faker.name.firstName(),
        avatar: faker.image.avatar(),
      });
    }

    return users;
  }

  genAccountBalance(minAmount: number, maxAmount: number): number {
    const amount = faker.number.int({ min: minAmount, max: maxAmount });
    return Number(amount);
  }
}

export default new Helpers();
