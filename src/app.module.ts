import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ControllersModule } from './api/controllers/controllers.module';

@Module({
  imports: [],
  controllers: [ControllersModule],
  providers: [AppService],
})
export class AppModule {}
