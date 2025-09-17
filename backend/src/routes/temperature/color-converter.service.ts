import { Injectable, Logger } from "@nestjs/common";
import * as math from "mathjs";

export interface ColorXYZ {
  x: number;
  y: number;
  z: number;
}

export interface ColorRGB {
  red: number;
  green: number;
  blue: number;
}

export interface ColorXYY {
  x: number;
  y: number;
  Y: number;
}

export interface ColorLAB {
  L: number;
  a: number;
  b: number;
}

@Injectable()
export class ColorConverterService {
  private readonly logger = new Logger(ColorConverterService.name);

  private readonly matrixSrgbXyz = math.matrix([
    [0.4124564, 0.3575761, 0.1804375],
    [0.2126729, 0.7151522, 0.0721750],
    [0.0193339, 0.1191920, 0.9503041],
  ]);

  public rgb2xy(
    rgb: ColorRGB,
  ): ColorXYY {
    const xyz = this.rgb2xyz(rgb);
    const xyy = this.xyz2xy(xyz);

    return xyy;
  }

  public rgb2xyz(
    rgb: ColorRGB,
  ): ColorXYZ {
    let { red, green, blue } = rgb;

    red = this.conditionalGammaCorrection(red / 255) * 100;
    green = this.conditionalGammaCorrection(green / 255) * 100;
    blue = this.conditionalGammaCorrection(blue / 255) * 100;
    const xyz = math.multiply(this.matrixSrgbXyz, math.matrix([red, green, blue])).toArray();

    return {
      x: Number(xyz[0]),
      y: Number(xyz[1]),
      z: Number(xyz[2]),
    };
  }

  public xyz2xy(
    xyz: ColorXYZ,
  ): ColorXYY {
    let x, y;

    if (xyz.x + xyz.y + xyz.z === 0) {
      x = 0;
      y = 0;
    } else {
      x = xyz.x / (xyz.x + xyz.y + xyz.z);
      y = xyz.y / (xyz.x + xyz.y + xyz.z);
    }

    this.logger.debug(`xyY: ${x}, ${y}, ${xyz.y}`);
    return { x, y, Y: xyz.y };
  }

  public conditionalGammaCorrection(
    channel: number,
  ): number {
    if (channel > 0.04045) {
      return ((channel + 0.055) / 1.055) ** 2.4;
    } else {
      return channel / 12.92;
    }
  }
}
