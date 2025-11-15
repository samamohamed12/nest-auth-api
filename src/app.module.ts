import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
// Helper to read and sanitize environment variables coming from .env
function env(name: string, fallback: string): string {
  const raw = process.env[name];
  if (!raw) return fallback;
  // trim whitespace and remove surrounding single or double quotes if present
  return raw.replace(/^['"]|['"]$/g, '').trim();
}
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { I18nModule, AcceptLanguageResolver,QueryResolver,HeaderResolver} from 'nestjs-i18n';
import * as path from 'path';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';


@Module({
  imports: [
    // TypeORM MSSQL connection - uses env vars with sensible defaults for local dev
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: env('DB_HOST', 'localhost'),
      port: parseInt(env('DB_PORT', '1433'), 10),
      username: env('DB_USERNAME', 'user'),
      password: env('DB_PASSWORD', 'YourStrong!Passw0rd'),
      database: env('DB_NAME', 'testdb'),
      entities: [User],
      synchronize: true, // auto-create schema in development
      options: {
        // For local/dev SQL Server instances it's common to allow self-signed certs
        encrypt: false,
        trustServerCertificate: true,
      },
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [{use: QueryResolver, options: ['lang']},         
       new HeaderResolver(['x-lang']),
       AcceptLanguageResolver,
                 
          ],

    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
   providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    AppService
  ],
  
})
export class AppModule {  
}







