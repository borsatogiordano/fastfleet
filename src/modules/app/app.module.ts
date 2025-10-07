import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { PrismaModule } from '../database/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { PackageModule } from '../packages/package.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, PackageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
