import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST') || 'localhost',
                port: configService.get('DB_PORT') || 5432,
                username: configService.get('DB_USERNAME') || 'root',
                password: configService.get('DB_PASSWORD') || '',
                database: configService.get('DB_DATABASE') || 'posrgres',
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                // migrations: [__dirname + '/../migrations/*{.ts,.js}'],
                synchronize: true, // Tự động đồng bộ cơ sở dữ liệu 
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule { }
