import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MathModule } from './math/math.module';

@Module({
  imports: [MathModule],
  controllers: [AppController],
})
export class AppModule {}
