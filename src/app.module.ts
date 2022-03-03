import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThemesModule } from './themes/themes.module';
import { PluginsModule } from './plugins/plugins.module';
import { AuthorsModule } from './authors/authors.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdatesModule } from './updates/updates.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      ssl:
        process.env.NODE_ENV === 'production'
          ? {
              requestCert: true,
              rejectUnauthorized: false,
            }
          : false,
    }),
    UsersModule,
    AuthorsModule,
    PluginsModule,
    ThemesModule,
    UpdatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
