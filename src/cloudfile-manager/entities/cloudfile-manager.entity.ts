import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('cloudfile_manager')
export class CloudfileManager {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column()
    publicId: string;

    @Column()
    url: string;

    @Column()
    fileType: string;


    @Column()
    uploadedDate: Date;
}
