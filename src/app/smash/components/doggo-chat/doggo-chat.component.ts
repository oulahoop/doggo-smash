import { ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SmashModel } from '../../models/smash.model';
import { SmashService } from '../../services/smash.service';
import { ChatItemComponent } from '../chat-item/chat-item.component';
import {MesSmashsStore} from "../../store/mes-smashs.store";

@Component({
  selector: 'app-doggo-chat',
  templateUrl: './doggo-chat.component.html',
  styleUrls: ['./doggo-chat.component.scss'],
})
export class DoggoChatComponent implements OnInit {

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  chats: {'content': string, 'owner': boolean}[] = []

  indexDoggo!:number;
  idDoggo!:string;
  doggo!:SmashModel;
  formMessage!: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private smashService: SmashService,
    private mesSmashStore: MesSmashsStore
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
    let chatsStorage= localStorage.getItem(this.doggo.id);
    if(chatsStorage !== null) {
      this.chats = JSON.parse(chatsStorage);
    }
  }

  ok(event: any){
    event.preventDefault();

    if(this.content.value == ""){
      return
    }

    this.chats.push({'content': this.content.value, 'owner': true});
    this.formMessage.setValue({'content':''});

    this.addResponse();
    setTimeout(() => {
      this.scrollToBottom();
      localStorage.setItem(this.doggo.id, JSON.stringify(this.chats));
    }, 1);
  }

  addResponse():void {
    let potentialResp = [
      "Wouf wouf",
      "Wouf !",
      "Wouf wouf wouf wouf... Wouf !",
      "Wouf xD",
      "WOOUUUUF MDR",
      "putain je fais quoi de ma vie",
      "ça va et toi ?",
      "salut wouf"
    ];

    this.chats.push({'content': potentialResp[Math.round(Math.random() * (potentialResp.length-1))], 'owner': false});
    this.formMessage.setValue({'content':''});
  }

  get content():FormControl {
    return this.formMessage.get('content') as FormControl;
  }


}
