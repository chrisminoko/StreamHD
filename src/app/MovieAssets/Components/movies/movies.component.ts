import { Component, OnInit } from '@angular/core';
import {Movie} from '../Models/Movie';
import {MovieService} from '../Service/movie.service';
import { from } from 'rxjs';
import { Title, SafeUrl,DomSanitizer } from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {


  constructor(private movieService:MovieService,private sanitizer:DomSanitizer,private http:HttpClient) { }
  Searchterm:string;
  term = '';
  id:number;
  movies :string;
  Movies:Movie[];
  title:string;
  private key ='8qsByFloihIwl9FD';
  private secret_key='33b0zafz3f4m8km2tkpnpun7pxw0v1';
  urlStream='https://fsapi.xyz/tmdb-movie/';
  newUrl:any;
  url:string;
  ipAddress:string; 
  uniqueUrl:any;
  

  ngOnInit(): void {
    this.loadDefualtMovies();
    this.search(this.term);
    this.getUserIP();
  
    
  }
  
 
  loadDefualtMovies():void{
    this.movieService.getDeFaultMovies().subscribe((data:any)=>{
      this.Movies=data.results;
      console.log('Movies : ',this.Movies);
    })
  }

  search(term:string){
    return this.movieService.searchmovie(term).subscribe((data:any)=>{
    this.movies=data.results;
  
      
    })
  }


  getUserIP(){
    this.movieService.getUserIp().subscribe((res:any)=>{
      this.ipAddress=res.ip;
      console.log("IP address:",this.ipAddress)
    });
  }

  getMovieId(id:number){
    this.id=id;
    console.log("Movie ID",this.id);
    this.SanitizeURl(this.id);
    this.GetVideoUrl();
  }




  GetVideoUrl(){
    this.movieService.getMovieUrl(this.id,this.ipAddress).subscribe((data:any)=>{
    this.uniqueUrl=data

    console.log("Retrived URL :",this.uniqueUrl)
    })
  }

  SanitizeURl(id:number){
   this.newUrl= this.sanitizer.bypassSecurityTrustResourceUrl(this.urlStream+`${id}`);
    // console.log("New URL:",this.urlStream+`${id}`)
  }


}
