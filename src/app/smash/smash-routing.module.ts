import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoggoChatComponent } from './components/doggo-chat/doggo-chat.component';
import { MySmashComponent } from './components/my-smash/my-smash.component';
import { PassSmashComponent } from './components/pass-smash/pass-smash.component';

const routes: Routes = [
  {path: "chat/:id", component: DoggoChatComponent},
  {path: "me", component: MySmashComponent},
  {path: "", component: PassSmashComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmashRoutingModule { }
