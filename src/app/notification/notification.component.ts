import { Component, Input } from '@angular/core';
import { Notification } from '../models/notification.models';
import { CommonModule, DatePipe } from '@angular/common';

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
}
