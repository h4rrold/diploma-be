import {Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique} from "typeorm";
import { User } from "./User";
import { Length } from "class-validator";

@Entity({ name: 'group'})
@Unique(['title'])
export class Group {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Length(2, 10)
    @Column('varchar', {length: 10})
    title: string;

    @OneToMany(() => User, user => user.group)
    users: User[]
}
