import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmashRoutingModule } from './smash-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ItemSmashComponent } from './components/item-smash/item-smash.component';
import { PassSmashComponent } from './components/pass-smash/pass-smash.component';
import { MySmashComponent } from './components/my-smash/my-smash.component';
import { DoggoChatComponent } from './components/doggo-chat/doggo-chat.component';
import { ChatItemComponent } from './components/chat-item/chat-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MesSmashsStore} from "./store/mes-smashs.store";

@NgModule({
  declarations: [
    ItemSmashComponent,
    PassSmashComponent,
    MySmashComponent,
    DoggoChatComponent,
    ChatItemComponent,
  ],
  imports: [
    CommonModule,
    SmashRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    ProgressSpinnerModule
  ],
})
export class SmashModule {
  constructor(mesSmashStore: MesSmashsStore) {
    mesSmashStore.setup();
  }
}
