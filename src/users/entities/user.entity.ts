import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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

    @Column({ type: 'nvarchar', length: 512, nullable: true })
    resetToken: string | null;

    // Use a SQL Server compatible datetime type
    @Column({ type: 'datetime', nullable: true })
    resetTokenExpiry: Date | null;

}
