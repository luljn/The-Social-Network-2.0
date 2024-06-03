import { Injectable } from "@angular/core";
import { UserServices } from "./user.services";
import * as CryptoJS from 'crypto-js';
import { User } from "../models/user.models";
import { Observable, of } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { LocalStorageService } from "./localstorage.services";



@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private user$!: Observable<User>;
    private loggedIn = false;

    constructor(private http: HttpClient,
                private userService: UserServices,
                private localstorageService: LocalStorageService
    ){}

    verifyUserEmail(email: string): boolean{

        if (this.userService.getUserByEmail(email) !== null){

            return true;
        }

        return false;
    }
    
    login(formValue: {email: string, password: string}): Observable<boolean> {

        const hashPassword = CryptoJS.MD5(formValue.password).toString();

        return this.http.get<User[]>(`http://localhost:3000/utilisateur?email=${formValue.email}&mdp=${hashPassword}`).pipe(
            map(users => {
            if (users.length > 0) {
                this.loggedIn = true;
                this.localstorageService.setItem('connectedUser', JSON.stringify(users[0]));
                return true;
            } else {
                return false;
            }
            }),
            catchError(() => of(false))
        );
    }

    logout(): void{

        this.localstorageService.removeItem('connectedUser');
    }
}