import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn({ unique: true })
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    verified: boolean;
}
