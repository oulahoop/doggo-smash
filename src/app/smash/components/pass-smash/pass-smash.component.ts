import { Component, OnInit } from '@angular/core';
import { SmashModel } from '../../models/smash.model';
import { SmashService } from '../../services/smash.service';
import {MesSmashsStore} from "../../store/mes-smashs.store";

@Component({
  selector: 'app-pass-smash',
  templateUrl: './pass-smash.component.html',
  styleUrls: ['./pass-smash.component.scss']
})
export class PassSmashComponent implements OnInit {

  doggo!: SmashModel | null;
  buttons: boolean = false;

  constructor(private smashService: SmashService, private mesSmashsStore: MesSmashsStore) { }

  ngOnInit(): void {
    this.switchDoggo();
  }

  /**
   * Active les boutons de SMASH et PASS
   */
  enableButtons() {
    this.buttons = true;
  }

  /**
   * Change le doggo à SMASH OR PASS.
   */
  switchDoggo() {
    this.doggo = null;
    this.smashService.getDoggo().subscribe(doggo => {
      this.doggo = doggo;
    });
    this.buttons = false;
  }

  /**
   * Ajoute le doggo aux doggo smashs
   */
  smashDoggo() {
    this.mesSmashsStore.addSmash(this.doggo);
    this.switchDoggo();
  }

}
