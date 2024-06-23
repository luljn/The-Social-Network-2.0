import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.models";
import { UserService } from "./user.services";
import { Observable, switchMap, of, map } from "rxjs";
import { Notification } from "../models/notification.models";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    user!: User | null;

    constructor(private http: HttpClient,
                private userService: UserService
    ){}

    getNotificationsByUser(): Observable<Notification[]>{

        this.user = this.userService.getConnectedUser();
        return this.http.get<Notification[]>(`http://localhost:3000/notification?id_utilisateur=${this.user?.id}`).pipe(
            map((notifs =>  [...notifs].sort((a,b) => b.id - a.id)))
        );
    }

    deleteNotification(idNotif: number): Observable<void>{

        return this.http.delete<void>(`http://localhost:3000/notification/${idNotif}`);
    }

    checkIfNotificationsEmpty(): Observable<boolean>{

        return this.getNotificationsByUser().pipe(
            switchMap(notifications => of(notifications.length === 0))
        );
    }
}