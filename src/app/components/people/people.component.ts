import { Component, OnInit } from "@angular/core";
import { People } from "src/app/models/people.interface";
import { Films } from "src/app/models/films.interface";
import { PeopleService } from "src/app/services/people.service";
import { FilmsService } from "src/app/services/films.service";
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: "app-people",
  templateUrl: "./people.component.html",
  styleUrls: ["./people.component.scss"],
})
export class PeopleComponent implements OnInit  {
  
  public people: People[] = [];
  public films: Films[] = [];
  public character: People;
  public spinner: boolean = true;
  public displayModal: boolean = false;
  public search: string = '';

  constructor(private peopleService: PeopleService, private filmsService:FilmsService, private primengConfig: PrimeNGConfig) {
    this.character = {} as People;
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getAllPeople();
    this.imgContructor("")
    
  }

  getAllPeople(page?: string) {
    this.peopleService.getAll(page).subscribe((people) => {
      this.people.push(...people.results);
      if (people.next) {
        this.getAllPeople(people.next);
      } else {
        this.spinner = false;
      }
    });
  }

  showModalDialog(people: People) {
    this.displayModal = true;
    this.character = people
    this.films = [];
    if(this.character.films){
      this.character.films.map(film =>{
        this.filmsService.getAll(film).subscribe((films) => {
          this.films.push(films);
        });
      })
    }
  }

  imgContructor(url:string){
    let idArr = url.split("/")
    let idImg = "../../../assets/img/characters/"+ idArr[5] + ".jpg"
    return  idImg
  }
}
