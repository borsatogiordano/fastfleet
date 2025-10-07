import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { PackageModule } from './modules/packages/package.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, PackageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
