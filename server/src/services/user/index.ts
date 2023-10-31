import * as createUser from "./Create";
import * as deleteUser from "./Delete";
import * as updateUser from "./Update";
import * as getAllUsers from "./GetAll";
import * as getUserById from "./GetById";

export const UsersServices = {
  ...createUser,
  ...deleteUser,
  ...updateUser,
  ...getAllUsers,
  ...getUserById,
};
