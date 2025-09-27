import { ColorConverterService } from "./color-converter.service";
import { TemperatureController } from "./temperature.contoller";
import { TemperatureService } from "./temperature.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [TemperatureController],
  providers: [
    TemperatureService,
    ColorConverterService,
  ],
})
export class TemperatureModule {};
