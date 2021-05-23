import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { GroupNotFoundException, UserNotFoundException } from "../exceptions/NotFoundException";
import { group } from "console";
import { Lab } from "../entity/Lab";

export class UserController {

    private userRepository = getRepository(User);
    private labsRepository = getRepository(Lab);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

    async getUserGroupLabsList(request: Request, response: Response, next: NextFunction) {
        const { userId } = request.params;
        if(!userId) {
            return response.sendStatus(400);
        }
        const user = await this.userRepository.findOne({relations: ['group'],where: {id: userId}});
        if(!user) {
            return next(new UserNotFoundException(''));
        }
      
        if(!user.group) {
            return next(new GroupNotFoundException());
        }

        const labs = await this.labsRepository.createQueryBuilder('lab').leftJoin('lab.groups', 'group')
        .where('group.id = :id', {id: user.group.id})
        .distinctOn(['lab.id'])
        .execute();;
        
        return response.status(200).json({labs});
    }
}