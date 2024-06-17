import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.services';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.models';
import { NotificationComponent } from '../notification/notification.component';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications-page',
  standalone: true,
  imports: [
    NotificationComponent,
    CommonModule,
    AsyncPipe
  ],
  templateUrl: './notifications-page.component.html',
  styleUrl: './notifications-page.component.css'
})
export class NotificationsPageComponent implements OnInit {

  notifications$!: Observable<Notification[]>;

  constructor(private notificationService: NotificationService){}

  ngOnInit(): void {
      
    this.notifications$ = this.notificationService.getNotificationsByUser();
  }
}
