import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OgretimElemani } from '../models/OgretimElemani';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OgretimElemaniService {

  constructor(private httpClient: HttpClient) { }


  getOgretimElemaniList(): Observable<OgretimElemani[]> {

    return this.httpClient.get<OgretimElemani[]>(environment.getApiUrl + '/ogretimElemanis/getall')
  }

  getOgretimElemaniById(id: number): Observable<OgretimElemani> {
    return this.httpClient.get<OgretimElemani>(environment.getApiUrl + '/ogretimElemanis/getbyid?id='+id)
  }

  addOgretimElemani(ogretimElemani: OgretimElemani): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/ogretimElemanis/', ogretimElemani, { responseType: 'text' });
  }

  updateOgretimElemani(ogretimElemani: OgretimElemani): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/ogretimElemanis/', ogretimElemani, { responseType: 'text' });

  }

  deleteOgretimElemani(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/ogretimElemanis/', { body: { id: id } });
  }


}