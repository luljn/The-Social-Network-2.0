import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map, switchMap } from "rxjs";
import { User } from "../models/user.models";
import { LocalStorageService } from "./localstorage.services";
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient,
                private localstorageService: LocalStorageService
    ){}

    getConnectedUser(): User | null {

        const connectedUser = this.localstorageService.getItem('connectedUser');
    
        if (connectedUser) {
          
          const newuser = JSON.parse(connectedUser) as User;
          return newuser;
        }
    
        return null;
    }

    getAllUsers(): Observable<User[]>{

        return this.http.get<User[]>("http://localhost:3000/utilisateur");
    }

    getUserById(id: number): Observable<User>{

        return this.http.get<User>(`http://localhost:3000/utilisateur/${id}`);       
    }

    getAllUsersWithoutTheCurrent(id: number): Observable<User[]>{

        return this.http.get<User[]>(`http://localhost:3000/utilisateur?id_ne=${id}`);
    }

    getUserByEmail(email: string): Observable<User>{

        return this.http.get<User>(`http://localhost:3000/utilisateur?email=${email}`);
    }

    addUser(formValue: {nom: string, prenom: string, email: string, adresse: string, mdp: string, date_de_naissance: Date}): Observable<User>{

        return this.getAllUsers().pipe(
            map(users => [...users].sort((a,b) => a.id - b.id)),
            map(sortedUsers => sortedUsers[sortedUsers.length -1]),
            map(previousUser => ({
                ...formValue,
                mdp: CryptoJS.MD5(formValue.mdp).toString(),  // To hash the password before insert it in the database.
                admin: false,
                statut_bannissement: false,
                description: "Salut je suis un(e) utilisateur(trice) de TSN",
                profile_photo: "./assets/users/profile.png",
                id: (+previousUser.id + 1).toString(),
                followings: []
            })),
            switchMap(newUser => this.http.post<User>(`http://localhost:3000/utilisateur/`, newUser))
        );
    }
}