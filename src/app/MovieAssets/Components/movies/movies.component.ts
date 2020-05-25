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
  Movies:Movie[];
  title:string;
  urlStream='https://fsapi.xyz/tmdb-movie/';
  newUrl:any;

  ipAddress:string; 
 
  

  ngOnInit(): void {
    this.loadDefualtMovies();
    this.getUserIP();
  
   
  }
  
  ngAfterContentChecked():void{
    if(this.movieService.serachB){
      this.search();
      this.movieService.serachB=false;
    }
  }
  loadDefualtMovies():void{
    this.movieService.getDeFaultMovies().subscribe((data:any)=>{
      this.Movies=data.results;
  
    })
  }

  search(){
    return this.movieService.searchmovie(this.term).subscribe((data:any)=>{
      this.Movies=data.results;
   
  
      
    })
  }

  getUserIP(){
    this.movieService.getUserIp().subscribe((res:any)=>{
      this.ipAddress=res.ip;
    
    });
  }

  getMovieId(id:number){
    this.id=id;
  
    this.SanitizeURl(this.id);
  
  }

  SanitizeURl(id:number){
   this.newUrl= this.sanitizer.bypassSecurityTrustResourceUrl(this.urlStream+`${id}`);
    
  }

  checkSearch():void{
    this.movieService.serachB=true;
  
  }
}
