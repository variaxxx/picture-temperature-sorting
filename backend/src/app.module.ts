import { TemperatureModule } from "./routes/temperature/temperature.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TemperatureModule,
  ],
})
export class AppModule {}
