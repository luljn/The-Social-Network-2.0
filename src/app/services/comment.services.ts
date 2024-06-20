import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map, switchMap } from "rxjs";
import { Comment } from "../models/comment.models";
import { User } from "../models/user.models";
import { UserService } from "./user.services";


@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpClient,
                private userService: UserService
    ){}

    getAllComments(): Observable<Comment[]>{

        return this.http.get<Comment[]>(`http://localhost:3000/commentaire`);
    }

    getCommentsByPost(idPost: number): Observable<Comment[]>{

        return this.http.get<Comment[]>(`http://localhost:3000/commentaire?id_post=${idPost}`).pipe(
            map((comments =>  [...comments].sort((a,b) => b.id - a.id)))
        );
    }

    getCommentsCount(idPost: number): Observable<number>{

        return this.getCommentsByPost(idPost).pipe(
            map(comments => comments.length)
        );
    }

    addComment(idPost: number, formValue: {contenu: string, image?: string}): Observable<Comment>{

        return this.getAllComments().pipe(
            map(comments => [...comments].sort((a,b) => a.id - b.id)),
            map(sortedComments => sortedComments[sortedComments.length -1]),
            map(previousComment => ({
                ...formValue,
                id: (+previousComment.id + 1).toString(),
                id_utilisateur: this.userService.getConnectedUser()?.id,
                id_post: idPost,
                date_creation: new Date(),
                image: formValue.image,
                nom_utilisateur: this.userService.getConnectedUser()?.nom,
                prenom_utilisateur: this.userService.getConnectedUser()?.prenom,
            })),
            switchMap(newComment => this.http.post<Comment>(`http://localhost:3000/commentaire/`, newComment))
        );
    }
}