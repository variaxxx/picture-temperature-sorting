import { ColorConverterService, ColorRGB } from "./color-converter.service";
import { Injectable } from "@nestjs/common";
import * as sharp from "sharp";

@Injectable()
export class TemperatureService {
  constructor(
    private readonly colorConverter: ColorConverterService,
  ) {}

  public async avgRgb(
    picture: Express.Multer.File,
  ): Promise<ColorRGB> {
    const { data, info } = await sharp(picture.buffer)
      .raw()
      .toBuffer({ resolveWithObject: true });

    let sumR = 0;
    let sumG = 0;
    let sumB = 0;
    for (let i = 0; i < data.length; i += info.channels) {
      sumR += data[i];
      sumG += data[i + 1];
      sumB += data[i + 2];
    }

    const pixelCount = info.width * info.height;
    return {
      red: Math.floor(sumR / pixelCount),
      green: Math.floor(sumG / pixelCount),
      blue: Math.floor(sumB / pixelCount),
    };
  }

  public rgb2temp(
    rgb: ColorRGB,
  ): number {
    let temperature, testRGB;
    const epsilon = 0.4;
    let minTemperature = 1000;
    let maxTemperature = 40000;
    while (maxTemperature - minTemperature > epsilon) {
      temperature = (maxTemperature + minTemperature) / 2;
      testRGB = this.temp2rgb(temperature);
      if ((testRGB.blue / testRGB.red) >= (rgb.blue / rgb.red)) {
        maxTemperature = temperature;
      } else {
        minTemperature = temperature;
      }
    }
    return Math.round(temperature);
  }

  public temp2rgb(
    kelvin: number,
  ): ColorRGB {
    const temperature = kelvin / 100;
    let red, green, blue;

    if (temperature < 66) {
      red = 255;
    } else {
      const a = 351.97690566805693;
      const b = 0.114206453784165;
      const c = -40.25366309332127;
      const x = temperature - 55;

      red = a + b * x + c * Math.log(x);
      red = Math.max(0, red);
      red = Math.min(255, red);
    }

    if (temperature < 66) {
      const a = -155.25485562709179;
      const b = -0.44596950469579133;
      const c = 104.49216199393888;
      const x = temperature - 2;

      green = a + b * x + c * Math.log(x);
      green = Math.max(0, green);
      green = Math.min(255, green);
    } else {
      const a = 325.4494125711974;
      const b = 0.07943456536662342;
      const c = -28.0852963507957;
      const x = temperature - 50;

      green = a + b * x + c * Math.log(x);
      green = Math.max(0, green);
      green = Math.min(255, green);
    }

    if (temperature >= 66) {
      blue = 255;
    } else if (temperature > 20) {
      const a = -254.76935184120902;
      const b = 0.8274096064007395;
      const c = 115.67994401066147;
      const x = temperature - 10;

      blue = a + b * x + c * Math.log(x);
      blue = Math.max(0, blue);
      blue = Math.min(255, blue);
    } else {
      blue = 0;
    }

    return {
      red: Math.round(red),
      blue: Math.round(blue),
      green: Math.round(green),
    };
  }

  public rgb2tempTH(
    rgb: ColorRGB,
  ): number {
    let temperature, testRGB;
    const epsilon = 0.4;
    let minTemperature = 1000;
    let maxTemperature = 40000;
    while (maxTemperature - minTemperature > epsilon) {
      temperature = (maxTemperature + minTemperature) / 2;
      testRGB = this.temp2rgbTH(temperature);
      if ((testRGB.blue / testRGB.red) >= (rgb.blue / rgb.red)) {
        maxTemperature = temperature;
      } else {
        minTemperature = temperature;
      }
    }
    return Math.round(temperature);
  }

  public temp2rgbTH(
    kelvin: number,
  ): ColorRGB {
    const temperature = kelvin / 100;
    let red, green, blue;

    if (temperature < 66) {
      red = 255;
    } else {
      const a = 329.698727446;
      const b = -0.1332047592;
      const x = temperature - 60;

      red = a * x ** b;
      red = Math.max(0, red);
      red = Math.min(255, red);
    }

    if (temperature < 66) {
      const a = -161.1195681161;
      const b = 99.4708025861;
      const x = temperature;

      green = a + b * Math.log(x);
      green = Math.max(0, green);
      green = Math.min(255, green);
    } else {
      const a = 288.1221695283;
      const b = -0.0755148492;
      const x = temperature - 60;

      green = a * x ** b;
      green = Math.max(0, green);
      green = Math.min(255, green);
    }

    if (temperature >= 66) {
      blue = 255;
    } else if (temperature > 20) {
      const a = -305.0447927307;
      const b = 138.5177312231;
      const x = temperature - 10;

      blue = a + b * Math.log(x);
      blue = Math.max(0, blue);
      blue = Math.min(255, blue);
    } else {
      blue = 0;
    }

    return {
      red: Math.round(red),
      blue: Math.round(blue),
      green: Math.round(green),
    };
  }

  // https://www.zombieprototypes.com/p-210/
  public async tannerHelland(
    picture: Express.Multer.File,
  ): Promise<number> {
    const avgRgb = await this.avgRgb(picture);

    const temp = this.rgb2tempTH(avgRgb);

    // await sharp(picture.buffer).toFile(`tests/tannerHelland/${temp}-${Date.now()}.${picture.originalname.split(".")[1]}`);

    return temp;
  }

  public async modifiedTH(
    picture: Express.Multer.File,
  ): Promise<number> {
    const avgRgb = await this.avgRgb(picture);

    const temp = this.rgb2temp(avgRgb);

    // await sharp(picture.buffer).toFile(`tests/modifiedTH/${temp}-${Date.now()}.${picture.originalname.split(".")[1]}`);

    return temp;
  }

  // https://en.wikipedia.org/wiki/Correlated_color_temperature
  public async mcCamy(
    picture: Express.Multer.File,
  ): Promise<number> {
    const avgRgb = await this.avgRgb(picture);
    const xyY = this.colorConverter.rgb2xy(avgRgb);

    const n = (xyY.x - 0.3366) / (0.1735 - xyY.y);
    let cct = Math.round(449 * n ** 3 + 3525 * n ** 2 + 6823.3 * n + 5520.33);

    if (cct < 0) {
      cct = 0;
    } else if (cct > 40000) {
      cct = 40000;
    }

    // await sharp(picture.buffer).toFile(`tests/mcCamy/${cct}-${Date.now()}.${picture.originalname.split(".")[1]}`);

    return cct;
  }
}
