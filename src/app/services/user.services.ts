import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.models";

@Injectable({
    providedIn: 'root'
})
export class UserServices {

    constructor(private http: HttpClient){}

    getAllUsers(): Observable<User[]>{

        return this.http.get<User[]>("http://localhost:3000/utilisateur");
    }
}