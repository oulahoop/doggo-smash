import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appChatViewRef]'
})
export class ChatViewRefDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }
}
