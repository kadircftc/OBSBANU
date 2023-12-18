import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ST_OgrenciDurum } from '../models/ST_OgrenciDurum';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ST_OgrenciDurumService {

  constructor(private httpClient: HttpClient) { }


  getST_OgrenciDurumList(): Observable<ST_OgrenciDurum[]> {

    return this.httpClient.get<ST_OgrenciDurum[]>(environment.getApiUrl + '/sT_OgrenciDurums/getall')
  }

  getST_OgrenciDurumById(id: number): Observable<ST_OgrenciDurum> {
    return this.httpClient.get<ST_OgrenciDurum>(environment.getApiUrl + '/sT_OgrenciDurums/getbyid?id='+id)
  }

  addST_OgrenciDurum(sT_OgrenciDurum: ST_OgrenciDurum): Observable<any> {

    return this.httpClient.post(environment.getApiUrl + '/sT_OgrenciDurums/', sT_OgrenciDurum, { responseType: 'text' });
  }

  updateST_OgrenciDurum(sT_OgrenciDurum: ST_OgrenciDurum): Observable<any> {
    return this.httpClient.put(environment.getApiUrl + '/sT_OgrenciDurums/', sT_OgrenciDurum, { responseType: 'text' });

  }

  deleteST_OgrenciDurum(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + '/sT_OgrenciDurums/', { body: { id: id } });
  }


}