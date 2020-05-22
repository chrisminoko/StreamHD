import { Injectable } from '@angular/core';
import {Movie} from '../Models/Movie';
import{url} from '../Models/url';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable,of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }

  private defaultEnpoint='https://api.themoviedb.org/3/movie/now_playing?api_key=1a4c92c1e6d12e202327dea1fbeb4edd&language=en-US&page=1';
  private key='8qsByFloihIwl9FD';
  private secret_key='33b0zafz3f4m8km2tkpnpun7pxw0v1';
  private movieUrl="https://api.themoviedb.org/3/search/movie?api_key=1a4c92c1e6d12e202327dea1fbeb4edd&";
  private endpoint='';

  getDeFaultMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.defaultEnpoint);
  }
  searchmovie(term:string):Observable<any[]>{
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<any[]>(`${this.movieUrl}&query=${term}`);
  }

  getUserIp(){
    return this.http.get("http://api.ipify.org/?format=json");
  }
  GetUniqueUrl(){
    return this.http.get("https://vsrequest.video/request.php?key=8qsByFloihIwl9FD&secret_key=33b0zafz3f4m8km2tkpnpun7pxw0v1&video_id=tt2316204&ip=197.185.109.53");
  }

  getMovieUrl(id:number, ipaddress:string){
    const headers = new HttpHeaders().set('Content-Type','text/plain; charset=utf-81');
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://vsrequest.video/request.php?key=${this.key}&secret_key=${this.secret_key}&video_id=${id}&ip=${ipaddress}`,{headers, responseType:'text' as 'json'});

  }
}
