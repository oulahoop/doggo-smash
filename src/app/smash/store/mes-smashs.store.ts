import {SmashModel} from "../models/smash.model";
import {Observable} from "rxjs";
import {SmashService} from "../services/smash.service";
import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class MesSmashsStore {
  public mesSmashs: SmashModel[] = [];

  constructor() {
  }

  setup() {
    let localSmash =localStorage.getItem("smashs");
    if(localSmash !== null) {
      this.mesSmashs = JSON.parse(localSmash);
    }
  }
  private writeMesSmashs() {
    localStorage.setItem("smashs", JSON.stringify(this.mesSmashs));
  }

  addSmash(doggo: SmashModel | null) {
    if(doggo !== null) {
      this.mesSmashs.push(doggo);
      this.writeMesSmashs()
    }

  }

  deleteSmash(smash: SmashModel) {
    this.mesSmashs = this.mesSmashs.filter((mySmash) => mySmash.id !== smash.id)
    this.writeMesSmashs()
  }

  getDoggoByIndex(index: number) {
    return this.mesSmashs[index] ?? null;
  }
}
