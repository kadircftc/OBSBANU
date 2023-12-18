import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DersAlma } from '../models/DersAlma';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DersAlmaService {

  constructor(private httpClient: HttpClient) { }


  getDersAlmaList(): Observable<DersAlma[]> {

    return this.httpClient.get<DersAlma[]>(environment.getApiUrl + '/dersAlmas/getall')
  }

  getDersAlmaById(id: number): Observable<DersAlma> {
    return this.httpClient.get<DersAlma>(environment.getApiUrl + '/dersAlmas/getbyid?id='+id)
  }

  addDersAlma(dersAlma: DersAlma): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/dersAlmas/', dersAlma, { responseType: 'text' });
  }

  updateDersAlma(dersAlma: DersAlma): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/dersAlmas/', dersAlma, { responseType: 'text' });

  }

  deleteDersAlma(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/dersAlmas/', { body: { id: id } });
  }


}