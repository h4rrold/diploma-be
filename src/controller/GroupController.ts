import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Group } from "../entity/Group";
import { validate } from 'class-validator';
import { HttpException } from '../exceptions/HttpException';

export class GroupController {

    private groupRepository = getRepository(Group);

    async listAll() {
        return await this.groupRepository.find();
    }

    async createOne(req: Request, res: Response, next: NextFunction) {
        const { title } = req.body;
        
        const group = new Group();
        group.title= title;

        const errors = await validate(group, { validationError: { target: false, value: false } });
        if(errors.length) {
            return next(new HttpException(400, 'Validation Error', errors));
          }

        const createdGroup = await this.groupRepository.save(group);
        res.status(200).json({group: createdGroup });
    }

}