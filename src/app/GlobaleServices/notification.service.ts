import { Injectable } from '@angular/core';
import {NotifierService} from "angular-notifier";
import {NotificationType} from "../Enumerations/notification-type.enum";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifier: NotifierService) { }

  public notifyShow(type: NotificationType, message:string): void{
    this.notifier.notify(type,message)
  }
}
