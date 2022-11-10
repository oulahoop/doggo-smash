import { ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SmashModel } from '../../models/smash.model';
import { SmashService } from '../../services/smash.service';
import { ChatItemComponent } from '../chat-item/chat-item.component';

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
  doggo$!:Observable<SmashModel>;
  formMessage!: FormGroup;
  
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private smashService: SmashService,
  ) {  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if(id == null) {
      this.router.navigateByUrl('me');
      return;
    }
    this.indexDoggo = +id;
    this.getDoggoProfileByIndex();
    this.formMessage = new FormGroup({
      'content': new FormControl('')
    });
    this.scrollToBottom();
  }
  
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;        
    } catch(err) { console.log(err);
     }                 
  }


  getDoggoProfileByIndex(): void{
    let mySmashs = localStorage.getItem("smashs")?.split(";");
    if(mySmashs !== undefined && mySmashs.length >= this.indexDoggo){
      let split = mySmashs[this.indexDoggo].split(',');
      this.doggo$ = this.smashService.getDoggoByIdAndName(split[0], split[1]);
      this.idDoggo = split[0];
      let conv = localStorage.getItem(split[0]);
      if(conv == null) {
        return;
      }
      this.chats = JSON.parse(conv);
    }else{
      this.router.navigateByUrl('me');
    }
  }

  ok(event: any){    
    event.preventDefault();
    console.log(this.content.value);

    if(this.content.value == ""){
      return
    }

    this.chats.push({'content': this.content.value, 'owner': true});
    console.log(this.chats);
    this.formMessage.setValue({'content':''});

    this.addResponse();
    setTimeout(() => {
      this.scrollToBottom();
      localStorage.setItem(this.idDoggo, JSON.stringify(this.chats));
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
