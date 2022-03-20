import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavPeople } from '../models/people.interface';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  public api:string
  constructor(private http:HttpClient){
    this.api = 'https://swapi.dev/api/'
  }

  getAll(page?:string){
    return this.http.get<NavPeople>(!page ? `${this.api}people/` : page)
  }

}
