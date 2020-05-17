import { Component, OnInit } from '@angular/core';
import {Movie} from '../Models/Movie';
import {MovieService} from '../Service/movie.service';
import { from } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private movieService:MovieService) { }
  Searchterm:string;
  term = '';
  id:number;
  movies :string;
  Movies:Movie[];
  title:string;
  key ='8qsByFloihIwl9FD';
  secret_key='33b0zafz3f4m8km2tkpnpun7pxw0v1';
  ipAddress:string; 
  uniqueUrl:string;
  

  ngOnInit(): void {
    this.loadDefualtMovies();
    this.search(this.term);
    this.getIP();
    this.getUniqueUrl();
   
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


  getId(id:number){
    this.id=id;
  }

  getIP(){
    this.movieService.getUserIp().subscribe((res:any)=>{
      this.ipAddress=res.ip;
   
    });
  }


  getUniqueUrl(){
    this.movieService.GetUniqueUrl().subscribe((res:any)=>{
      this.uniqueUrl=res;
      console.log("generated Url",this.uniqueUrl)
    })
  }

}
