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
  doggoLastConv!: ChatModel | null;
  constructor(private chatStore: ChatStore) { }

  ngOnInit(): void {
    this.doggoLastConv = this.chatStore.getLastConv(this.doggo.id);
  }

  emit(): void {
    this.loaded.emit(true);
  }

}
