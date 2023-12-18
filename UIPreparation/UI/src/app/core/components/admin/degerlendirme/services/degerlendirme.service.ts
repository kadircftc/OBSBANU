import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Degerlendirme } from '../models/Degerlendirme';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DegerlendirmeService {

  constructor(private httpClient: HttpClient) { }


  getDegerlendirmeList(): Observable<Degerlendirme[]> {

    return this.httpClient.get<Degerlendirme[]>(environment.getApiUrl + '/degerlendirmes/getall')
  }

  getDegerlendirmeById(id: number): Observable<Degerlendirme> {
    return this.httpClient.get<Degerlendirme>(environment.getApiUrl + '/degerlendirmes/getbyid?id='+id)
  }

  addDegerlendirme(degerlendirme: Degerlendirme): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/degerlendirmes/', degerlendirme, { responseType: 'text' });
  }

  updateDegerlendirme(degerlendirme: Degerlendirme): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/degerlendirmes/', degerlendirme, { responseType: 'text' });

  }

  deleteDegerlendirme(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/degerlendirmes/', { body: { id: id } });
  }


}