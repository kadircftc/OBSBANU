import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { OgretimElemaniSinavDto } from '../../sinav-notlandirma/models/ogretimElemaniSinavlarDto';
import { OgretimElemaniOzlukBilgileriDto } from '../models/ogretimElemaniOzlukBilgileriDto';

@Injectable({
  providedIn: 'root'
})
export class OgretimElemaniServiceIn {

  constructor(private httpClient: HttpClient) { }

  getOgretimElemaniOzlukBilgileri(id:number): Observable<OgretimElemaniOzlukBilgileriDto> {
    return this.httpClient.get<OgretimElemaniOzlukBilgileriDto>(environment.getApiUrl + '/OgretimElemanis/getOgretimElemaniOzlukBilgileri?id='+id)
  }

  getOgretimElemaniSinav(id:number): Observable<OgretimElemaniSinavDto[]> {
    return this.httpClient.get<OgretimElemaniSinavDto[]>(environment.getApiUrl + '/OgretimElemanis/getOgretimElemaniSinavlar?id='+id)
  }




}