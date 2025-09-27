export interface TemperatureResult {
  name: string;
  temperature: number;
}

export interface TemperatureResponseDto {
  data: TemperatureResult[];
}
