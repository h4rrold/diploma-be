import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { User } from '../entity/User';

@Entity({ name: 'labs'})
export class Lab {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column("varchar", {length: '96'})
    title: string

    @Column("")
    automataCode: string;

    @ManyToMany(() => User)
    @JoinTable()
    user: User[]
}
