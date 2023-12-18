import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DersAcma } from '../models/DersAcma';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DersAcmaService {

  constructor(private httpClient: HttpClient) { }


  getDersAcmaList(): Observable<DersAcma[]> {

    return this.httpClient.get<DersAcma[]>(environment.getApiUrl + '/dersAcmas/getall')
  }

  getDersAcmaById(id: number): Observable<DersAcma> {
    return this.httpClient.get<DersAcma>(environment.getApiUrl + '/dersAcmas/getbyid?id='+id)
  }

  addDersAcma(dersAcma: DersAcma): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/dersAcmas/', dersAcma, { responseType: 'text' });
  }

  updateDersAcma(dersAcma: DersAcma): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/dersAcmas/', dersAcma, { responseType: 'text' });

  }

  deleteDersAcma(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/dersAcmas/', { body: { id: id } });
  }


}