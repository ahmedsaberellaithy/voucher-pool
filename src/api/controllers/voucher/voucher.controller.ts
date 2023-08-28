import {
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { VoucherDto } from './dtos/voucher.dto';
import { Controller, Get, Query } from '@nestjs/common';
import { ResponseFormat } from '@/infrastructure/interceptors/response.interceptor';
import { GetCustomerVouchers } from './dtos/getCustomerVouchers.dto';

@Controller('voucher')
@ApiTags('Vouchers')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(VoucherDto)
export class VoucherController {
  constructor() {}

  @Get('customer')
  //   @ApiOkResponse({
  //     isArray: true,
  //     schema: {
  //       isArray: true,
  //       schema: {
  //         allOf: [
  //           { $ref: getSchemaPath(ResponseFormat) },
  //           {
  //             properties: {
  //               data: {
  //                 $ref: getSchemaPath(VoucherDto),
  //               },
  //               isArray: {
  //                 type: 'boolean',
  //                 default: true,
  //               },
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   })
  async getCustomerVouchers(@Query() queryParams: GetCustomerVouchers) {}
}
