import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Danismanlik } from '../models/Danismanlik';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DanismanlikService {

  constructor(private httpClient: HttpClient) { }


  getDanismanlikList(): Observable<Danismanlik[]> {

    return this.httpClient.get<Danismanlik[]>(environment.getApiUrl + '/danismanliks/getall')
  }

  getDanismanlikById(id: number): Observable<Danismanlik> {
    return this.httpClient.get<Danismanlik>(environment.getApiUrl + '/danismanliks/getbyid?id='+id)
  }

  addDanismanlik(danismanlik: Danismanlik): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/danismanliks/', danismanlik, { responseType: 'text' });
  }

  updateDanismanlik(danismanlik: Danismanlik): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/danismanliks/', danismanlik, { responseType: 'text' });

  }

  deleteDanismanlik(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/danismanliks/', { body: { id: id } });
  }


}