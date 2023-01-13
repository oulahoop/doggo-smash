import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SmashModel } from '../../models/smash.model';
import {ChatStore} from "../../store/chat.store";
import {ChatModel} from "../../models/chat.model";

@Component({
  selector: 'app-item-smash',
  templateUrl: './item-smash.component.html',
  styleUrls: ['./item-smash.component.scss']
})
export class ItemSmashComponent implements OnInit {

  @Input() doggo!:SmashModel;
  @Input() chatMode!: boolean;
  @Output() loaded = new EventEmitter<boolean>();
  doggoLastChat!: ChatModel | null;
  constructor(private chatStore: ChatStore) { }

  ngOnInit(): void {
    //Récupération du dernier chat avec le doggo
    this.doggoLastChat = this.chatStore.getLastChat(this.doggo.id);
  }

  /**
   * Emet une valeur true lorsque l'image est chargée
   */
  imageLoaded(): void {
    this.loaded.emit(true);
  }

}
