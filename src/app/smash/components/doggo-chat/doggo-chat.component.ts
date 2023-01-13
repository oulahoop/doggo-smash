import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SmashModel } from '../../models/smash.model';
import { SmashService } from '../../services/smash.service';
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
    //récupération de l'index du doggo
    let index = this.route.snapshot.paramMap.get('id');
    if(index == null) {
      this.router.navigateByUrl('me');
      return;
    }
    this.indexDoggo = +index;

    //récupération du doggo et des chats
    this.getDoggoProfileByIndex();
    this.retrieveChats();

    //initialisation du formulaire et de la vue
    this.formMessage = new FormGroup({
      'content': new FormControl('')
    });

    this.scrollToBottom();
  }

  /**
   * Scroll en bas des chats pour afficher les derniers.
   */
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.error(err)
    }
  }

  /**
   * Récupère le doggo par son index
   */
  getDoggoProfileByIndex(): void{
    this.doggo = this.mesSmashStore.getDoggoByIndex(this.indexDoggo);
    if(this.doggo === null) {
      this.router.navigateByUrl('me');
    }
  }

  /**
   * Récupère les chats avec le doggo
   */
  retrieveChats() {
    this.chats = this.chatStore.retrieveAllChats(this.doggo.id);
  }

  /**
   * Envoie un message au doggo
   * @param event
   */
  sendMessage(event: any) {
    //on stop le fonctionnement par défaut du bonton de submit du formulaire (car ça reload la page)
    event.preventDefault();

    //On envoie pas de chat si contenu vide
    if(this.content.value == ""){
      return
    }

    //On envoie le chat
    let chatToSend = new ChatModel(this.doggo.id, this.content.value, true);
    this.chatStore.addChat(chatToSend);
    this.chats.push(chatToSend);

    //on reinitialise l'input d'envoie de message
    this.formMessage.setValue({'content':''});
    //on ajoute une réponse du doggo
    this.addResponse();

    //On scroll vers le bas
    //Le timeout est là pour que le scroll se fasse bien après l'update de la vue
    setTimeout(() => {
      this.scrollToBottom();
    }, 1);
  }

  /**
   * Ajoute une réponse aléatoire de la part du doggo parmis les potentialResp.
   */
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
