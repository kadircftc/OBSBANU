import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ST_AkademikDonem } from '../models/ST_AkademikDonem';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ST_AkademikDonemService {

  constructor(private httpClient: HttpClient) { }


  getST_AkademikDonemList(): Observable<ST_AkademikDonem[]> {

    return this.httpClient.get<ST_AkademikDonem[]>(environment.getApiUrl + '/sT_AkademikDonems/getall')
  }

  getST_AkademikDonemById(id: number): Observable<ST_AkademikDonem> {
    return this.httpClient.get<ST_AkademikDonem>(environment.getApiUrl + '/sT_AkademikDonems/getbyid?id='+id)
  }

  addST_AkademikDonem(sT_AkademikDonem: ST_AkademikDonem): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/sT_AkademikDonems/', sT_AkademikDonem, { responseType: 'text' });
  }

  updateST_AkademikDonem(sT_AkademikDonem: ST_AkademikDonem): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/sT_AkademikDonems/', sT_AkademikDonem, { responseType: 'text' });

  }

  deleteST_AkademikDonem(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/sT_AkademikDonems/', { body: { id: id } });
  }


}