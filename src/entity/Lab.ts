import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, JoinColumn} from "typeorm";
import { User } from './User';
import { AutomataCode } from './AutomataCode';

@Entity({ name: 'labs'})
export class Lab {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column("varchar", {length: '96'})
    title: string

    @Column("text")
    automataCodes: AutomataCode[];

    @ManyToMany(() => User)
    @JoinTable()
    user: User[]
}
