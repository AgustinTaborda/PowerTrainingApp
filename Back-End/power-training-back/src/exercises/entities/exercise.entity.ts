import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
@Entity('exercises')
export class Exercise {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'varchar', length: 255 })
    urlVideoExample: string;

    @Column({ type: 'varchar', length: 255 })
    benefits: string;

    @Column({ type: 'varchar', length: 255 })
    tags: string;

}
