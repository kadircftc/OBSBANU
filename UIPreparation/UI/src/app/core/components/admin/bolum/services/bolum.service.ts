import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Bolum } from '../models/Bolum';


@Injectable({
  providedIn: 'root'
})
export class BolumService {

  constructor(private httpClient: HttpClient) { }


  getBolumList(): Observable<Bolum[]> {

    return this.httpClient.get<Bolum[]>(environment.getApiUrl + '/Bolums/getall')
  }

  getBolumById(id: number): Observable<Bolum> {
    return this.httpClient.get<Bolum>(environment.getApiUrl + '/Bolums/getbyid?id='+id)
  }

  addBolum(bolum: Bolum): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/Bolums/', bolum, { responseType: 'text' });
  }


  updateBolum(bolum: Bolum): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/Bolums/', bolum, { responseType: 'text' });

  }

  deleteBolum(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/Bolums/', { body: { id: id } });
  }


}