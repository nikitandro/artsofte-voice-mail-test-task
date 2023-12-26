import { Component, Input } from '@angular/core';

const dateTimeFormat = new Intl.DateTimeFormat('RU');

@Component({
  selector: 'message-item',
  templateUrl: './message-item.component.html',
})
export class MessageItem {
  @Input()
  public datetime: string = '';

  @Input()
  public phone: string = '';

  @Input()
  public duration: number = 0;
}
