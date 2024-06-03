import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.models";

@Injectable({
    providedIn: 'root'
})
export class UserServices {

    constructor(private http: HttpClient){}

    // getConnectedUser(): User | null {

    //     const connnectedUser = localStorage.getItem('connectedUser');
    
    //     if (connnectedUser) {
          
    //       const newuser = JSON.parse(connnectedUser) as User;
    //       return newuser;
    //     }
    
    //     return null;
    // }

    getAllUsers(): Observable<User[]>{

        return this.http.get<User[]>("http://localhost:3000/utilisateur");
    }

    getAllUsersWithoutTheCurrent(id: number): Observable<User[]>{

        return this.http.get<User[]>(`http://localhost:3000/utilisateur?id_ne=${id}`);
    }

    getUserByEmail(email: string): Observable<User>{

        return this.http.get<User>(`http://localhost:3000/utilisateur?email=${email}`);
    }
}