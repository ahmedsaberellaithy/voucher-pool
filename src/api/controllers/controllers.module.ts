import { Module } from '@nestjs/common';
import { VoucherController } from './voucher/voucher.controller';
// import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';

@Module({
  //   imports: [UsecasesProxyModule.register()],
  controllers: [VoucherController],
})
export class ControllersModule {}
