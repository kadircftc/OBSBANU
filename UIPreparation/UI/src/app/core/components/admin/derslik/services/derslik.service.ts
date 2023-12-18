import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Derslik } from '../models/Derslik';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DerslikService {

  constructor(private httpClient: HttpClient) { }


  getDerslikList(): Observable<Derslik[]> {

    return this.httpClient.get<Derslik[]>(environment.getApiUrl + '/dersliks/getall')
  }

  getDerslikById(id: number): Observable<Derslik> {
    return this.httpClient.get<Derslik>(environment.getApiUrl + '/dersliks/getbyid?id='+id)
  }

  addDerslik(derslik: Derslik): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/dersliks/', derslik, { responseType: 'text' });
  }

  updateDerslik(derslik: Derslik): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/dersliks/', derslik, { responseType: 'text' });

  }

  deleteDerslik(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/dersliks/', { body: { id: id } });
  }


}