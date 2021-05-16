import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Group } from "../entity/Group";

export class GroupController {

    private groupRepository = getRepository(Group);

    async all() {
        return this.groupRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.groupRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.groupRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const userToRemove = await this.groupRepository.findOne(request.params.id);
        await this.groupRepository.remove(userToRemove);
    }

}