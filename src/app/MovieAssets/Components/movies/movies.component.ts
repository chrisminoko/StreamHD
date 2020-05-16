import { Component, OnInit } from '@angular/core';
import {Movie} from '../Models/Movie';
import {MovieService} from '../Service/movie.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private movieService:MovieService) { }
  Movies:Movie[];
  ngOnInit(): void {
    this.loadDefualtMovies();
  }

  loadDefualtMovies():void{
    this.movieService.getDeFaultMovies().subscribe((data:any)=>{
      this.Movies=data.results;
      console.log('Movies : ',this.Movies);
    })
  }


}
