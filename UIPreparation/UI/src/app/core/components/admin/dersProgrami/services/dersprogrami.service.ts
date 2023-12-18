import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DersProgrami } from '../models/DersProgrami';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DersProgramiService {

  constructor(private httpClient: HttpClient) { }


  getDersProgramiList(): Observable<DersProgrami[]> {

    return this.httpClient.get<DersProgrami[]>(environment.getApiUrl + '/dersProgramis/getall')
  }

  getDersProgramiById(id: number): Observable<DersProgrami> {
    return this.httpClient.get<DersProgrami>(environment.getApiUrl + '/dersProgramis/getbyid?id='+id)
  }

  addDersProgrami(dersProgrami: DersProgrami): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/dersProgramis/', dersProgrami, { responseType: 'text' });
  }

  updateDersProgrami(dersProgrami: DersProgrami): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/dersProgramis/', dersProgrami, { responseType: 'text' });

  }

  deleteDersProgrami(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/dersProgramis/', { body: { id: id } });
  }


}