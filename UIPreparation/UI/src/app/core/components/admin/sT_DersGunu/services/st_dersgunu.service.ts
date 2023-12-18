import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ST_DersGunu } from '../models/ST_DersGunu';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ST_DersGunuService {

  constructor(private httpClient: HttpClient) { }


  getST_DersGunuList(): Observable<ST_DersGunu[]> {

    return this.httpClient.get<ST_DersGunu[]>(environment.getApiUrl + '/sT_DersGunus/getall')
  }

  getST_DersGunuById(id: number): Observable<ST_DersGunu> {
    return this.httpClient.get<ST_DersGunu>(environment.getApiUrl + '/sT_DersGunus/getbyid?id='+id)
  }

  addST_DersGunu(sT_DersGunu: ST_DersGunu): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/sT_DersGunus/', sT_DersGunu, { responseType: 'text' });
  }

  updateST_DersGunu(sT_DersGunu: ST_DersGunu): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/sT_DersGunus/', sT_DersGunu, { responseType: 'text' });

  }

  deleteST_DersGunu(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/sT_DersGunus/', { body: { id: id } });
  }


}