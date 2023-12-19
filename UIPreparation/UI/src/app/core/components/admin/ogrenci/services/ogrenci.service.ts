import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Ogrenci } from '../models/Ogrenci';


@Injectable({
  providedIn: 'root'
})
export class OgrenciService {

  constructor(private httpClient: HttpClient) { }


  getOgrenciList(): Observable<Ogrenci[]> {

    return this.httpClient.get<Ogrenci[]>(environment.getApiUrl + '/Ogrencis/getall')
  }

  getOgrenciById(id: number): Observable<Ogrenci> {
    return this.httpClient.get<Ogrenci>(environment.getApiUrl + '/Ogrencis/getbyid?id='+id)
  }

  addOgrenci(ogrenci: Ogrenci): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/Ogrencis/', ogrenci, { responseType: 'text' });
  }

  updateOgrenci(ogrenci: Ogrenci): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/Ogrencis/', ogrenci, { responseType: 'text' });

  }

  deleteOgrenci(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/Ogrencis/', { body: { id: id } });
  }


}