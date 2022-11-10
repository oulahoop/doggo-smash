import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss']
})
export class ChatItemComponent implements OnInit {

  @Input() owner!: boolean;
  @Input() content!: string;
  
  constructor() { }

  ngOnInit(): void {

  }

}
