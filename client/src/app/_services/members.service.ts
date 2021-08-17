import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';


const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'bearer ' + JSON.parse(localStorage.getItem('user'))?.token
  })
} 

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users', httpOptions);
  }

  getMember(username: string) {
    return this.http.get<Member>(this.baseUrl + 'users/' + username, httpOptions);
  }

  updateMember(member: Member){
    return this.http.put(this.baseUrl + 'users', member,httpOptions);
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {},httpOptions);
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId,httpOptions);
  }
}
