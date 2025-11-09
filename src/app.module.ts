import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // TypeORM MSSQL connection - uses env vars with sensible defaults for local dev
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '1433', 10),
      username: process.env.DB_USERNAME || 'user',
      password: process.env.DB_PASSWORD || 'YourStrong!Passw0rd',
      database: process.env.DB_NAME || 'testdb',
      entities: [User],
      synchronize: true, // auto-create schema in development
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {  
}





