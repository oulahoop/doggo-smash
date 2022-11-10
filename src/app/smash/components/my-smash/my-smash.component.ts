import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SmashModel } from '../../models/smash.model';
import { SmashService } from '../../services/smash.service';

@Component({
  selector: 'app-my-smash',
  templateUrl: './my-smash.component.html',
  styleUrls: ['./my-smash.component.scss']
})
export class MySmashComponent implements OnInit {

  mySmashs!: string[] | undefined;
  smashs$: Observable<SmashModel>[] = [];

  constructor(private smashService: SmashService, private router: Router) { }

  ngOnInit(): void {
    this.mySmashs = localStorage.getItem("smashs")?.split(";");
    this.mySmashs?.pop();
    this.mySmashs?.forEach(couple => {
      this.smashs$.push(this.getDoggoByString(couple));
    })
  }

  getDoggoByString(idName : string): Observable<SmashModel>{
    let split = idName.split(",");
    return this.smashService.getDoggoByIdAndName(split[0], split[1])
  }

  openChat(index: number) {
    this.router.navigateByUrl('chat/' + index);
  }  

  deleteChat(id: string, index: number) {  
    this.mySmashs = localStorage.getItem("smashs")?.split(";");
    this.mySmashs = this.mySmashs?.filter(s => !(s.includes(id)));
    
    let join = this.mySmashs?.join(';');

    if(join != null && join != ""){
      localStorage.setItem("smashs", join);
    }else {
      localStorage.removeItem("smashs");
      this.mySmashs = [];
    }
    
    localStorage.removeItem(id);

    delete this.smashs$[index];
    
  }
}
