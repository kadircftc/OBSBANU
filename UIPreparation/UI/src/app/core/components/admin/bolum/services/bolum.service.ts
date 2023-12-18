import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bolum } from '../models/Bolum';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BolumService {

  constructor(private httpClient: HttpClient) { }


  getBolumList(): Observable<Bolum[]> {

    return this.httpClient.get<Bolum[]>(environment.getApiUrl + '/bolums/getall')
  }

  getBolumById(id: number): Observable<Bolum> {
    return this.httpClient.get<Bolum>(environment.getApiUrl + '/bolums/getbyid?id='+id)
  }

  addBolum(bolum: Bolum): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/bolums/', bolum, { responseType: 'text' });
  }

  updateBolum(bolum: Bolum): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/bolums/', bolum, { responseType: 'text' });

  }

  deleteBolum(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/bolums/', { body: { id: id } });
  }


}