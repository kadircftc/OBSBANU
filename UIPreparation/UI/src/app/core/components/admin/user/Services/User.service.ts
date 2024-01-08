import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LookUp } from 'app/core/models/lookUp';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { PasswordDto } from '../models/passwordDto';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserList(): Observable<User[]> {

    return this.httpClient.get<User[]>(environment.getApiUrl + "/users/");

  }

  getUserById(id: number): Observable<User> {

    return this.httpClient.get<User>(environment.getApiUrl + `/users/${id}`);
  }


  addUser(user: User): Observable<any> {

    var result = this.httpClient.post(environment.getApiUrl + "/users/", user, { responseType: 'text' });
    return result;
  }

  updateUser(user:User):Observable<any> {
    var result = this.httpClient.put(environment.getApiUrl + "/users/", user, { responseType: 'text' });
    return result;
  }

  deleteUser(id: number) {
    return this.httpClient.request('delete', environment.getApiUrl + `/users/${id}`);
  }

  getUserGroupPermissions(userId:number):Observable<LookUp[]>{
    return this.httpClient.get<LookUp[]>(environment.getApiUrl + `/user-groups/users/${userId}/groups`);
  }

  getUserClaims(userId:number){
     return this.httpClient.get<LookUp[]>(environment.getApiUrl + `/user-claims/users/${userId}`);
  }

  saveUserClaims(userId:number,claims:number[] ):Observable<any> {
    var result = this.httpClient.put(environment.getApiUrl + "/user-claims/", {UserId:userId, ClaimIds:claims }, { responseType: 'text' });
    return result;
  }

  saveUserGroupPermissions(userId:number, groups:number[]):Observable<any> {
    var result = this.httpClient.put(environment.getApiUrl + "/user-groups/", {UserId:userId, GroupId:groups }, { responseType: 'text' });
    return result;

  }

  saveUserPassword(command:PasswordDto):Observable<any>{
    var result = this.httpClient.put(environment.getApiUrl + "/Auth/user-password", command, { responseType: 'text' });
    return result;
  }

}
