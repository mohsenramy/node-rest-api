import UsersDao from "../dao/users.dao";
import { CRUD } from "../../common/crud.interface";
import { CreateUserDto } from "../dto/user.create.dto";
import { PutUserDto } from "../dto/user.put.dto";
import { PatchUserDto } from "../dto/user.patch.sto";

class UsersService implements CRUD {
  list = async (limit: number, page: number) => {
    return UsersDao.getUsers();
  };

  create = async (resource: CreateUserDto) => {
    return UsersDao.addUser(resource);
  };

  putById = async (id: string, resource: PutUserDto) => {
    return UsersDao.putUserById(id, resource);
  };

  readById = async (id: string) => {
    return UsersDao.getUserById(id);
  };

  deleteById = async (id: string) => {
    return UsersDao.removeUserById(id);
  };

  patchById = async (id: string, resource: PatchUserDto) => {
    return UsersDao.patchUserById(id, resource);
  };

  getUserByEmail = async (email: string) => {
    return UsersDao.getUserByEmail(email);
  };
}

export default new UsersService();
