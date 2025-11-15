import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4} from 'uuid';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();
    

    @Column({ length: 100 })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'nvarchar', length: 50, nullable: true })
    role: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


    @Column({ type: 'nvarchar', length: 10, nullable: true })
    otpCode: string | null;

    @Column({ type: 'datetime', nullable: true })
    otpExpiry: Date | null;
    

}
