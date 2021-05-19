import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { Group } from "./Group";
import { UserLab } from "./UserLab";

@Entity({ name: 'lab'})
export class Lab {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column("varchar", {length: '255'})
    title: string

    @Column("text")
    automataCodes: string;
    
    @ManyToMany(() => Group)
    @JoinTable()
    groups: Group[]

    @OneToMany(() => UserLab, (userLab) => userLab.lab)
    userLabs: UserLab[]
}
