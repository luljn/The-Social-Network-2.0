import { Component, Input } from '@angular/core';
import { Notification } from '../models/notification.models';
import { CommonModule, DatePipe } from '@angular/common';
import { NotificationService } from '../services/notification.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  @Input() notification!: Notification;

  constructor(private notificationService: NotificationService,
              private router: Router
  ){}

  onDeleteNotification(idNotif: number){

    this.notificationService.deleteNotification(idNotif).subscribe(
      () =>  { this.router.navigateByUrl('notifications'); 
               window.location.reload();
      }
    );
  }
}
