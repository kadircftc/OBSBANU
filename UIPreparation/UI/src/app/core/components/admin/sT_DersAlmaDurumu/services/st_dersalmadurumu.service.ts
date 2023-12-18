import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ST_DersAlmaDurumu } from '../models/ST_DersAlmaDurumu';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ST_DersAlmaDurumuService {

  constructor(private httpClient: HttpClient) { }


  getST_DersAlmaDurumuList(): Observable<ST_DersAlmaDurumu[]> {

    return this.httpClient.get<ST_DersAlmaDurumu[]>(environment.getApiUrl + '/sT_DersAlmaDurumus/getall')
  }

  getST_DersAlmaDurumuById(id: number): Observable<ST_DersAlmaDurumu> {
    return this.httpClient.get<ST_DersAlmaDurumu>(environment.getApiUrl + '/sT_DersAlmaDurumus/getbyid?id='+id)
  }

  addST_DersAlmaDurumu(sT_DersAlmaDurumu: ST_DersAlmaDurumu): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/sT_DersAlmaDurumus/', sT_DersAlmaDurumu, { responseType: 'text' });
  }

  updateST_DersAlmaDurumu(sT_DersAlmaDurumu: ST_DersAlmaDurumu): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/sT_DersAlmaDurumus/', sT_DersAlmaDurumu, { responseType: 'text' });

  }

  deleteST_DersAlmaDurumu(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/sT_DersAlmaDurumus/', { body: { id: id } });
  }


}