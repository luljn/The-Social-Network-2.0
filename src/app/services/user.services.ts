import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.models";
import { LocalStorageService } from "./localstorage.services";

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
}