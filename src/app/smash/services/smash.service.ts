import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { SmashModel } from "../models/smash.model";
import { HttpClient } from "@angular/common/http"

@Injectable({
    providedIn: 'root'
})
export class SmashService {

  API_URL: string = "https://api.TheDogAPI.com/";
  API_KEY: string = "live_35ElbSsEjou2IriE2APccptW6L1UwoqdDI0dcdHFWQX1542TmSsaXBoEEuHD4Ll0"
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Récupère un doggo dans l'API TheDogAPI.
   */
  getDoggo(): Observable<SmashModel> {
    return this.httpClient
      .get<Array<{ id: string, url: string }>>(this.API_URL + "v1/images/search?api_key=" + this.API_KEY)
      .pipe(
        map(arr => new SmashModel(arr[0].id, arr[0].url, this.generateName()))
      );
  }

  /**
   * Génère un nom aléatoire pour un doggo
   * @private
   */
  private generateName(): string {
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

    return tabPrenom[Math.round(Math.random() * (tabPrenom.length - 1))];
  }
}
