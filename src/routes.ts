import { UserController } from "./controller/UserController";
import { GroupController } from "./controller/GroupController";
import { AuthController } from "./controller/AuthController";
import { RefreshTokenController } from "./controller/RefreshTokenController";

export const Routes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
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
  {
    method: "get",
    route: "/groups",
    controller: GroupController,
    action: "all",
  },
  {
    method: "post",
    route: '/login',
    controller: AuthController,
    action: 'login',
    noToken: true
  },
  {
    method: "post",
    route: '/register',
    controller: AuthController,
    action: 'register',
    noToken: true
  },
  {
    method: "post",
    route: '/refresh_token',
    controller: RefreshTokenController,
    action: 'refresh',
    noToken: true
  }
];
