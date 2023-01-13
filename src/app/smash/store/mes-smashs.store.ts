import {SmashModel} from "../models/smash.model";
import {Injectable} from "@angular/core";
import {ChatStore} from "./chat.store";

@Injectable({providedIn: "root"})
export class MesSmashsStore {
  public mesSmashs: SmashModel[] = [];

  constructor(private chatStore: ChatStore) {
  }

  /**
   * Initialise le store contenant tous les doggos smashs
   */
  setup() {
    let localSmash =localStorage.getItem("smashs");
    if(localSmash !== null) {
      this.mesSmashs = JSON.parse(localSmash);
    }
  }

  /**
   * Ajoute un doggo au sein des doggo smashs
   * @param doggo le doggo à smash
   */
  addSmash(doggo: SmashModel | null) {
    if(doggo !== null) {
      this.mesSmashs.push(doggo);
      this.writeMesSmashs()
    }

  }

  /**
   * Supprime un doggo au sein des doggo smashs
   * @param smash le doggo à supprimer
   */
  deleteSmash(smash: SmashModel) {
    this.mesSmashs = this.mesSmashs.filter((mySmash) => mySmash.id !== smash.id)
    this.chatStore.deleteChats(smash.id);
    this.writeMesSmashs()
  }

  /**
   * Retrouve un doggo par son index
   * @param index l'index du doggo
   */
  getDoggoByIndex(index: number) {
    return this.mesSmashs[index] ?? null;
  }

  /**
   * Réécris les smashs au sein du localStorage
   * @private
   */
  private writeMesSmashs() {
    localStorage.setItem("smashs", JSON.stringify(this.mesSmashs));
  }
}
