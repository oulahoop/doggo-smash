import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SmashModel } from '../../models/smash.model';

@Component({
  selector: 'app-item-smash',
  templateUrl: './item-smash.component.html',
  styleUrls: ['./item-smash.component.scss']
})
export class ItemSmashComponent implements OnInit {

  @Input() doggo!:SmashModel;
  @Input() chatMode!: boolean;
  @Output() loaded = new EventEmitter<boolean>();
  doggoLastConv!: string;
  constructor() { }

  ngOnInit(): void {
    let conv = localStorage.getItem(this.doggo.id);
    if(conv != null){
      let arr = JSON.parse(conv);
      this.doggoLastConv = arr[arr.length-1]['content'];
    }
  }

  emit(): void {
    this.loaded.emit(true);
  }

}
