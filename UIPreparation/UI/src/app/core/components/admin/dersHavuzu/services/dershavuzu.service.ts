import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DersHavuzu } from '../models/DersHavuzu';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DersHavuzuService {

  constructor(private httpClient: HttpClient) { }


  getDersHavuzuList(): Observable<DersHavuzu[]> {

    return this.httpClient.get<DersHavuzu[]>(environment.getApiUrl + '/dersHavuzus/getall')
  }

  getDersHavuzuById(id: number): Observable<DersHavuzu> {
    return this.httpClient.get<DersHavuzu>(environment.getApiUrl + '/dersHavuzus/getbyid?id='+id)
  }

  addDersHavuzu(dersHavuzu: DersHavuzu): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/dersHavuzus/', dersHavuzu, { responseType: 'text' });
  }

  updateDersHavuzu(dersHavuzu: DersHavuzu): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/dersHavuzus/', dersHavuzu, { responseType: 'text' });

  }

  deleteDersHavuzu(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/dersHavuzus/', { body: { id: id } });
  }


}