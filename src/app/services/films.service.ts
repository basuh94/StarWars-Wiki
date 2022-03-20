import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Films } from '../models/films.interface';

@Injectable({
  providedIn: 'root'
})

export class FilmsService {

  constructor(private http:HttpClient) { }

  getAll(api:string){
    return this.http.get<Films>(api)
  }

}

