import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Group } from "./Group";
import { Length, MinLength, MaxLength, IsString } from "class-validator";
import * as bcrypt from "bcryptjs";

export enum UserRole {
  PROFESSOR = "professor",
  STUDENT = "student",
}

@Entity({ name: "users" })
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  @IsString()
  @MinLength(4, {
    message: "$property is too short. Minimal length should be $constraint1",
  })
  @MaxLength(14, {
    message: "$property is too long. Maximal length should be $constraint1",
  })
  username: string;

  @MinLength(6, {
    message: "$property is too short. Minimal length should be $constraint1",
  })
  @MaxLength(20, {
    message: "$property is too long. Maximal length should be $constraint1",
  })
  @Column()
  password: string;

  @Length(2, 20)
  @Column()
  firstname: string;

  @Length(3, 20)
  @Column()
  lastname: string;

  @Column({nullable: true})
  groupId: string;
  @ManyToOne(() => Group, (group) => group.id)
  @JoinColumn({name: 'groupId'})
  group: Group;

  @Column({
    type: "set",
    enum: UserRole,
    default: [UserRole.STUDENT],
  })
  role: UserRole;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfPasswordValid(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
