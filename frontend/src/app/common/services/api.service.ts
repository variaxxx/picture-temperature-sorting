import { env } from "../../../environments/environment";
import { MethodOption, OrderOption } from "../../pages/home/home";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, of, tap } from "rxjs";

export interface TemperatureRequestDto {
  files: File[];
  order: OrderOption;
  method: MethodOption;
  minTemp?: number;
  maxTemp?: number;
}

@Injectable({ providedIn: "root" })
export class ApiService {
  private readonly http = inject(HttpClient);

  calculateTemp(dto: TemperatureRequestDto) {
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

    return this.http.post(`${env.apiBaseUrl}/temp`, fd).pipe(
      tap((res) => {
        console.log(res);
      }),
      catchError((e) => {
        console.error(`Error while fetching API: ${e}`);
        return of(undefined);
      }),
    );
  }
}
