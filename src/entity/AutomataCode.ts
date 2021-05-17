import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { User } from '../entity/User';
import { Lab } from "./Lab";

@Entity({ name: 'automata_codes'})
export class AutomataCode {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column("varchar", {length: '96'})
    title: string

    @Column("text")
    code: string;

    @Column()
    userId: string;

    @Column()
    labId: string;

    @ManyToOne(() => Lab,(lab) => lab.id)
    @JoinColumn({name: 'labId'})
    lab: Lab
}
