import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SmashModel } from '../../models/smash.model';
import { SmashService } from '../../services/smash.service';
import {MesSmashsStore} from "../../store/mes-smashs.store";

@Component({
  selector: 'app-my-smash',
  templateUrl: './my-smash.component.html',
  styleUrls: ['./my-smash.component.scss']
})
export class MySmashComponent implements OnInit {

  constructor(private smashService: SmashService, private router: Router, public mesSmashsStore: MesSmashsStore) { }

  ngOnInit(): void {}

  /**
   * Ouvre le chat avec un doggo par son index
   * @param index l'index du doggo
   */
  openChat(index: number) {
    this.router.navigateByUrl('chat/' + index);
  }

  /**
   * Supprime un doggo des doggo smashs
   * @param smash
   */
  deleteSmash(smash: SmashModel) {
    this.mesSmashsStore.deleteSmash(smash)
  }
}
