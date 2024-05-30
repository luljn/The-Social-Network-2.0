import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Post } from "../models/post.models";

@Injectable({
    providedIn: 'root'
})
export class PostServices {

    constructor(private http: HttpClient){}

    getAllPosts(): Observable<Post[]>{

        return this.http.get<Post[]>("http://localhost:3000/post");
    }
}