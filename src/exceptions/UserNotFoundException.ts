import {HttpException} from './HttpException';

export class UserNotFoundException extends HttpException {
  constructor(username: string) {
    super(404, `User with username ${username} not found`);
  }
}