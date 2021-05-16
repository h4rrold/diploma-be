import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Lab } from "../entity/Lab";

export class LabController {
  private labRepository = getRepository(Lab);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.labRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.labRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.labRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const userToRemove = await this.labRepository.findOne(request.params.id);
    await this.labRepository.remove(userToRemove);
  }
}
