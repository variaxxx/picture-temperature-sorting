import { TemperatureResponseDto, TemperatureResult } from "./dto/temperature-response.dto";
import { ProcessImagesDto, TempMethod, TempOrder } from "./dto/upload-images.dto";
import { TemperatureService } from "./temperature.service";
import { BadRequestException, Body, Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";

// TODO: validate file format

@Controller("temp")
export class TemperatureController {
  constructor(
    private readonly service: TemperatureService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor("files", 50))
  async upload(
    @Body() dto: ProcessImagesDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<TemperatureResponseDto> {
    const data: TemperatureResult[] = [];
    for (const file of files) {
      let res;
      if (dto.method === TempMethod.TANNER_HELLAND) {
        res = await this.service.tannerHelland(file);
      } else if (dto.method === TempMethod.MODIFIED_TH) {
        res = await this.service.modifiedTH(file);
      } else if (dto.method === TempMethod.MC_CAMY) {
        res = await this.service.mcCamy(file);
      } else {
        throw new BadRequestException("Invalid method provided");
      }
      data.push({
        name: file.originalname,
        temperature: res,
      });
    }

    let sortedData: TemperatureResult[];
    if (dto.order === TempOrder.WARM_FIRST) {
      sortedData = data.sort((a, b) => a.temperature - b.temperature);
    } else if (dto.order === TempOrder.COOL_FIRST) {
      sortedData = data.sort((a, b) => b.temperature - a.temperature);
    } else {
      throw new BadRequestException("Invalid order provided");
    }

    if (dto.minTemp)
      sortedData = sortedData.filter(i => i.temperature >= dto.minTemp!);
    if (dto.maxTemp)
      sortedData = sortedData.filter(i => i.temperature <= dto.maxTemp!);

    return { data: sortedData };
  }
}
