import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ogrenci } from '../models/Ogrenci';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OgrenciService {

  constructor(private httpClient: HttpClient) { }


  getOgrenciList(): Observable<Ogrenci[]> {

    return this.httpClient.get<Ogrenci[]>(environment.getApiUrl + '/ogrencis/getall')
  }

  getOgrenciById(id: number): Observable<Ogrenci> {
    return this.httpClient.get<Ogrenci>(environment.getApiUrl + '/ogrencis/getbyid?id='+id)
  }

  addOgrenci(ogrenci: Ogrenci): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/ogrencis/', ogrenci, { responseType: 'text' });
  }

  updateOgrenci(ogrenci: Ogrenci): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/ogrencis/', ogrenci, { responseType: 'text' });

  }

  deleteOgrenci(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/ogrencis/', { body: { id: id } });
  }


}