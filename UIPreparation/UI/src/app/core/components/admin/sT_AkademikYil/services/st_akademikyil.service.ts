import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ST_AkademikYil } from '../models/ST_AkademikYil';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ST_AkademikYilService {

  constructor(private httpClient: HttpClient) { }


  getST_AkademikYilList(): Observable<ST_AkademikYil[]> {

    return this.httpClient.get<ST_AkademikYil[]>(environment.getApiUrl + '/sT_AkademikYils/getall')
  }

  getST_AkademikYilById(id: number): Observable<ST_AkademikYil> {
    return this.httpClient.get<ST_AkademikYil>(environment.getApiUrl + '/sT_AkademikYils/getbyid?id='+id)
  }

  addST_AkademikYil(sT_AkademikYil: ST_AkademikYil): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/sT_AkademikYils/', sT_AkademikYil, { responseType: 'text' });
  }

  updateST_AkademikYil(sT_AkademikYil: ST_AkademikYil): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/sT_AkademikYils/', sT_AkademikYil, { responseType: 'text' });

  }

  deleteST_AkademikYil(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/sT_AkademikYils/', { body: { id: id } });
  }


}