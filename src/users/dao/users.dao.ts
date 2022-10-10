import { CreateUserDto } from "../dto/user.create.dto";
import { PutUserDto } from "../dto/user.put.dto";
import { PatchUserDto } from "../dto/user.patch.sto";
import debug from "debug";
import shortid from "shortid";

const log: debug.IDebugger = debug("app:in-memory-dao");

class UserDao {
  users: Array<CreateUserDto> = [];

  constructor() {
    log("Created new instance of UserDao");
  }

  async addUser(user: CreateUserDto) {
    user.id = shortid.generate();
    this.users.push(user);
    return user.id;
  }

  async getUsers() {
    return this.users;
  }

  async getUserById(userId: string) {
    return this.users.find((user: { id: string }) => user.id === userId);
  }

  async putUserById(userId: string, user: PutUserDto) {
    const objIndex = this.users.findIndex(
      (obj: { id: string }) => obj.id === userId
    );

    this.users.splice(objIndex, 1, user);
    return `${user.id} Updated via put`;
  }

  async patchUserById(userId: string, user: PatchUserDto) {
    const objIndex = this.users.findIndex(
      (obj: { id: string }) => obj.id === userId
    );

    let currentUser = this.users[objIndex];
    const allowedPatchFields = [
      "password",
      "firstName",
      "lastName",
      "permissionLevel",
    ];
    for (let field of allowedPatchFields) {
      if (field in user)
        //@ts-ignore
        currentUser[field] = user[field];
    }
    this.users.splice(objIndex, 1, currentUser);
    return `${user.id} Patched`;
  }

  async removeUserById(userId: string) {
    const objIndex = this.users.findIndex(
      (obj: { id: string }) => obj.id === userId
    );
    this.users.splice(objIndex, 1);
    return `${userId} removed`;
  }

  async getUserByEmail(email: string) {
    const objIndex = this.users.findIndex(
      (obj: { email: string }) => obj.email === email
    );

    const currentUser = this.users[objIndex];
    if (currentUser) return currentUser;
    else return null;
  }
}

export default new UserDao();
