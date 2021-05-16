import { getRepository } from "typeorm";
import { Request, Response,  NextFunction } from "express";
import { validate } from 'class-validator';

import { User } from "../entity/User";
import { UserNotFoundException } from '../exceptions/UserNotFoundException';
import { WrongCredentialsException } from '../exceptions/WrongCredentialsException';
import { UserWithThatUsernameExistsException} from '../exceptions/UserWithThatUsernameExistsException';
import { getAccessToken, getRefreshtoken, refreshTokensList } from "../helpers/jwt";
import { HttpException } from "../exceptions/HttpException";


export class AuthController {
  private userRepository = getRepository(User);
 
  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { username, password } = req.body;
    if (!(username && password)) next(new WrongCredentialsException());

    let user:User;

    try {
      user = await this.userRepository.findOneOrFail({ where: { username } });
    } catch (e) {
      next(new UserNotFoundException(username))
    }

    if (user && !user.checkIfPasswordValid(password)) {
      return next(new WrongCredentialsException())
    }

    const accessToken = getAccessToken(username);
    const refreshToken = getRefreshtoken(username);
    refreshTokensList.push(refreshToken);

    res.json({ success: true, accessToken, refreshToken, user: { username: user.username, userId: user.id, role: user.role, group: user.group } });
  }

  
  async register(req: Request, res: Response, next: NextFunction): Promise<any> {
    const {username, password, firstname, lastname }: any = req.body;
    
    if(await this.userRepository.findOne({username: username})) {
      return next(new UserWithThatUsernameExistsException(username));
    }

    const user = this.userRepository.create({
      username,
      password, 
      firstname,
      lastname
    });

    const errors = await validate(user, { validationError: { target: false, value: false } });
    if(errors.length) {
      return next(new HttpException(400, 'Validation Error', errors));
    }

    user.hashPassword();
    const createdUser = await this.userRepository.save(user);

    const accessToken = getAccessToken(username);
    const refreshToken = getRefreshtoken(username);
    refreshTokensList.push(refreshToken);
    
    res.status(200).json({success: true, accessToken, refreshToken, user: { username: createdUser.username, userId: createdUser.id, role: createdUser.role, group: createdUser.group }  })
  }

}
