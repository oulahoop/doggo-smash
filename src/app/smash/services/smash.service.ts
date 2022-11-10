import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { SmashModel } from "../models/smash.model";
import { HttpClient } from "@angular/common/http"

@Injectable({
    providedIn: 'root'
})
export class SmashService{
    constructor(private httpClient : HttpClient){}

    getDoggo(): Observable<SmashModel>{
      return this.httpClient
          .get<Array<{id : string, url: string}>>("https://api.TheDogAPI.com/v1/images/search?api_key=live_35ElbSsEjou2IriE2APccptW6L1UwoqdDI0dcdHFWQX1542TmSsaXBoEEuHD4Ll0")
          .pipe(
              map(arr => new SmashModel(arr[0].id, arr[0].url, this.generateName()))
          );
    }

    private generateName(): string{
      let tabPrenom = [ 
        "Nala",
        "Maya",
        "Lucky",
        "Luna",
        "Joy",
        "Naya",
        "Max",
        "Jack",
        "Jazz",
        "Marley",
        "Newton",
        "Lola",
        "Oslo",
        "Charlie",
        "Happy",
        "Oscar",
        "Bella",
        "Néo",
        "Rocky",
        "Laika"
      ];

      return tabPrenom[Math.round(Math.random()*(tabPrenom.length-1))];
    }

    public getDoggoByIdAndName(id : string, name : string): Observable<SmashModel>{
      return this.httpClient
        .get<{id: string, url: string}>("https://api.TheDogAPI.com/v1/images/" + id + "?api_key=live_35ElbSsEjou2IriE2APccptW6L1UwoqdDI0dcdHFWQX1542TmSsaXBoEEuHD4Ll0")
        .pipe(
          map(obj => new SmashModel(obj.id, obj.url, name))
        )
    }
}