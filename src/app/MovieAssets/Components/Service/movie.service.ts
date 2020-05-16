import { Injectable } from '@angular/core';
import {Movie} from '../Models/Movie';
import {HttpClient} from '@angular/common/http'
import { Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }

  private defaultEnpoint='https://api.themoviedb.org/3/movie/now_playing?api_key=1a4c92c1e6d12e202327dea1fbeb4edd&language=en-US&page=1';
  private key='';
  private endpoint='';

  getDeFaultMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.defaultEnpoint);
  }
}
