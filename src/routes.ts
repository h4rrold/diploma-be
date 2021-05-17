import { UserController } from "./controller/UserController";
import { GroupController } from "./controller/GroupController";
import { AuthController } from "./controller/AuthController";
import { RefreshTokenController } from "./controller/RefreshTokenController";
import { UserRole } from "./entity/User";

export const Routes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    permissions: [UserRole.PROFESSOR]
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
  },
  /** Auth Routes */
  {
    method: "post",
    route: '/login',
    controller: AuthController,
    action: 'login',
  },
  {
    method: "post",
    route: '/register',
    controller: AuthController,
    action: 'register',
  },
  /** Group Controller */
  {
    method: "get",
    route: "/groups",
    controller: GroupController,
    action: "listAll",
  },
  {
    method: "post",
    route: '/groups',
    controller: GroupController,
    action: 'createOne',
    withAuth: true,
    permissions: [UserRole.PROFESSOR]
  },
  {
    method: "post",
    route: '/refresh_token',
    controller: RefreshTokenController,
    action: 'refresh',
  }
];
