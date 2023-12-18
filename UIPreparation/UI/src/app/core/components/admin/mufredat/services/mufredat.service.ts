import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mufredat } from '../models/Mufredat';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MufredatService {

  constructor(private httpClient: HttpClient) { }


  getMufredatList(): Observable<Mufredat[]> {

    return this.httpClient.get<Mufredat[]>(environment.getApiUrl + '/mufredats/getall')
  }

  getMufredatById(id: number): Observable<Mufredat> {
    return this.httpClient.get<Mufredat>(environment.getApiUrl + '/mufredats/getbyid?id='+id)
  }

  addMufredat(mufredat: Mufredat): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/mufredats/', mufredat, { responseType: 'text' });
  }

  updateMufredat(mufredat: Mufredat): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/mufredats/', mufredat, { responseType: 'text' });

  }

  deleteMufredat(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/mufredats/', { body: { id: id } });
  }


}