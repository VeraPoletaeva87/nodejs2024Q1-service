import { User } from 'src/users/user-schema';

export const data: Data = {
  users: [
    {
      id: '1',
      login: 'user1',
      password: '123456',
      version: 1,
      createdAt: 1709852705232,
      updatedAt: 1709852705232,
    },
  ],
};

export interface Data {
  users: User[];
}
