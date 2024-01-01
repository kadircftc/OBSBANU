import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OgrenciOzlukBilgileriDto } from 'app/core/components/admin/ogrenci/models/ogrenciOzlukBilgileriDto';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OzlukBilgileriService {

  constructor(private httpClient: HttpClient) { }

  getOgrenciOzlukBilgileri(id:number): Observable<OgrenciOzlukBilgileriDto> {
    return this.httpClient.get<OgrenciOzlukBilgileriDto>(environment.getApiUrl + '/Ogrencis/getOzlukBilgileri?id='+id)
  }




}