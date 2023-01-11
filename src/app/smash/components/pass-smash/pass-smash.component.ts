import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  first: boolean = true;
  constructor(private smashService: SmashService, private mesSmashsStore: MesSmashsStore) { }

  ngOnInit(): void {
    this.switchDoggo();
  }

  enableButtons() {
    this.buttons = true;
  }

  switchDoggo() {
    this.doggo = null;
    this.smashService.getDoggo().subscribe(doggo => {
      this.doggo = doggo;
    });
    this.buttons = false;
  }

  smashDoggo() {
    this.mesSmashsStore.addSmash(this.doggo);
    this.switchDoggo();
  }

}
