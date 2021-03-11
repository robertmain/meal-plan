import { Controller, Get, Inject } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  @Inject(HealthCheckService)
  private readonly health: HealthCheckService;

  @Inject(TypeOrmHealthIndicator)
  private database: TypeOrmHealthIndicator;

  @Get()
  @HealthCheck()
  public check(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.database.pingCheck('database'),
    ]);
  }
}
