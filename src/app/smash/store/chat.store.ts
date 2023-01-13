import {Injectable} from "@angular/core";
import {ChatModel} from "../models/chat.model";

@Injectable({providedIn: "root"})
export class ChatStore {
  public chats: ChatModel[] = [];

  constructor() {
  }


  /**
   * Initialise le store contenant tous les chats avec les doggos
   */
  setup() {
    let localChat = localStorage.getItem("chats");
    if(localChat !== null) {
      this.chats = JSON.parse(localChat);
    }
  }

  /**
   * Ajoute un nouveau chat
   * @param chatToSend le chat à ajouter
   */
  addChat(chatToSend: ChatModel) {
    this.chats.push(chatToSend);
    this.writeChats();
  }

  /**
   * Retrouve tous les chats avec un doggo
   * @param doggoId l'id du doggo
   */
  retrieveAllChats(doggoId: string) {
    return this.chats.filter((chat) => chat.doggoId === doggoId);
  }

  /**
   * Retrouve la dernière conversation avec un doggo
   * @param doggoId l'id du doggo
   */
  getLastChat(doggoId: string) {
    let allChats = this.chats.filter((chat) => chat.doggoId === doggoId);
    if(allChats.length > 0) {
      return allChats[allChats.length-1];
    }
    return null;
  }

  /**
   * Supprime tous les chats avec un doggo.
   * @param doggoId l'id du doggo
   */
  deleteChats(doggoId: string) {
    this.chats.filter((chat) => chat.doggoId !== doggoId);
    this.writeChats();
  }


  /**
   * Réécris tous les chats au sein du localStorage (afin de les garder en cas de relance de la page)
   * @private
   */
  private writeChats() {
    localStorage.setItem('chats', JSON.stringify(this.chats));
  }
}
