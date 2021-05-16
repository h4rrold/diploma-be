import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { User } from "./User";

@Entity({ name: 'groups'})
export class Group {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    name: string;

    @OneToMany(() => User, user => user.id)
    users: User[]
}
