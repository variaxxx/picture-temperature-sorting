import { env } from "../../../environments/environment";
import { MethodOption, OrderOption } from "../../pages/home/home";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

export interface TemperatureRequestDto {
  files: File[];
  order: OrderOption;
  method: MethodOption;
  minTemp?: number;
  maxTemp?: number;
}

export interface TemperatureResponseDto {
  data: {
    name: string;
    temperature: number;
  }[];
}

@Injectable({ providedIn: "root" })
export class ApiService {
  private readonly http = inject(HttpClient);

  result?: TemperatureResponseDto;
  files?: File[];

  calculateTemp(dto: TemperatureRequestDto): Observable<TemperatureResponseDto> {
    const fd = new FormData();

    fd.set("method", dto.method);
    fd.set("order", dto.order);
    for (const file of dto.files) {
      fd.append("files", file);
    }
    if (dto.minTemp)
      fd.set("minTemp", dto.minTemp.toString());
    if (dto.maxTemp)
      fd.set("maxTemp", dto.maxTemp.toString());

    return this.http.post<TemperatureResponseDto>(`${env.apiBaseUrl}/temp`, fd).pipe(
      tap((res) => {
        this.result = res;
        this.files = dto.files;
      }),
    );
  }

  hasResult(): boolean {
    return !!this.result;
  }
}
