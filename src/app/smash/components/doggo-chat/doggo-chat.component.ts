import { ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SmashModel } from '../../models/smash.model';
import { SmashService } from '../../services/smash.service';
import { ChatItemComponent } from '../chat-item/chat-item.component';
import {MesSmashsStore} from "../../store/mes-smashs.store";
import {ChatModel} from "../../models/chat.model";
import {ChatStore} from "../../store/chat.store";

@Component({
  selector: 'app-doggo-chat',
  templateUrl: './doggo-chat.component.html',
  styleUrls: ['./doggo-chat.component.scss'],
})
export class DoggoChatComponent implements OnInit {

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  chats: ChatModel[] = []

  indexDoggo!:number;

  doggo!:SmashModel;
  formMessage!: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private smashService: SmashService,
    private mesSmashStore: MesSmashsStore,
    private chatStore: ChatStore
  ) {  }

  ngOnInit(): void {
    let index = this.route.snapshot.paramMap.get('id');

    if(index == null) {
      this.router.navigateByUrl('me');
      return;
    }

    this.indexDoggo = +index;

    this.getDoggoProfileByIndex();
    this.retrieveChats();
    this.formMessage = new FormGroup({
      'content': new FormControl('')
    });
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) {
    }
  }

  getDoggoProfileByIndex(): void{
    this.doggo = this.mesSmashStore.getDoggoByIndex(this.indexDoggo);
    if(this.doggo === null) {
      this.router.navigateByUrl('me');
    }
  }

  retrieveChats() {
    this.chats = this.chatStore.retrieveAllChats(this.doggo.id);
  }

  sendMessage(event: any) {
    event.preventDefault();

    if(this.content.value == ""){
      return
    }

    let chatToSend = new ChatModel(this.doggo.id, this.content.value, true);
    this.chatStore.addChat(chatToSend);
    this.chats.push(chatToSend);
    this.formMessage.setValue({'content':''});

    this.addResponse();
    setTimeout(() => {
      this.scrollToBottom();
    }, 1);
  }

  addResponse():void {
    let potentialResp = [
      "Wouf wouf",
      "Wouf !",
      "Wouf wouf wouf wouf... Wouf !",
      "Wouf xD",
      "WOOUUUUF MDR",
      "ça va et toi ?",
      "salut wouf"
    ];
    let chatFromDoggo = new ChatModel(this.doggo.id, potentialResp[Math.round(Math.random() * (potentialResp.length-1))], false);
    this.chatStore.addChat(chatFromDoggo);
    this.chats.push(chatFromDoggo);
  }

  get content():FormControl {
    return this.formMessage.get('content') as FormControl;
  }

}
