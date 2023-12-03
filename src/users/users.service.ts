import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user-dto';
import { UpdateUserDto } from 'src/dto/update-user-dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Charlie Wilson',
      email: 'charlie.wilson@example.com',
      role: 'INTERN',
    },
  ];
  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0) {
        throw new NotFoundException(`Users with role ${role} not found`);
      }
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const foundUser = this.users.find((user) => user.id === id);
    if (!foundUser)
      return new NotFoundException(`User with ID ${id} not found`);
    return foundUser;
  }

  create(user: CreateUserDto) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, userUpdate: UpdateUserDto) {
    //else {
    this.users = this.users.map((u) => {
      if (u.id === id) {
        return {
          ...u,
          ...userUpdate,
        };
      }
      return u;
    });

    const user = this.findOne(id);
    return user;
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    if (!removedUser) {
      return new NotFoundException(`User with ID ${id} not found`);
    }
    this.users = this.users.filter((u) => u.id !== id);
    return removedUser;
  }
}
