import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Comment } from "../models/comment.models";


@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpClient){}

    getCommentsByPost(idPost: number): Observable<Comment[]>{

        return this.http.get<Comment[]>(`http://localhost:3000/commentaire?id_post=${idPost}`);
    }

    getCommentsCount(idPost: number): Observable<number>{

        return this.getCommentsByPost(idPost).pipe(
            map(comments => comments.length)
        );
    }
}