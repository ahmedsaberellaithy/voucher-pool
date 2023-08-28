import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../../../domain/config/database.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig {
  constructor(private configService: ConfigService) {}

  private getStringEnv(envName: string): string {
    const envValue: string | undefined =
      this.configService.get<string>(envName);
    if (!envValue) {
      throw new Error(`Environment variable ${envName} is not set`);
    }
    return envValue;
  }

  private getNumberEnv(envName: string): number {
    const envValue: number | undefined =
      this.configService.get<number>(envName);
    if (!envValue) {
      throw new Error(`Environment variable ${envName} is not set`);
    }
    return envValue;
  }

  getDatabaseHost(): string {
    return this.getStringEnv('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.getNumberEnv('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.getStringEnv('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.getStringEnv('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.getStringEnv('DATABASE_NAME');
  }

  getDatabaseSchema(): string {
    return this.getStringEnv('DATABASE_SCHEMA');
  }

  getDatabaseSync(): boolean {
    const sync = this.configService.get<boolean>('DATABASE_SYNC');

    if (typeof sync === 'undefined') {
      throw new Error('Environment variable DATABASE_SYNC is not set');
    }

    return sync;
  }
}
