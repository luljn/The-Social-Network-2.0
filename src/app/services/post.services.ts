import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map, switchMap } from "rxjs";
import { Post } from "../models/post.models";
import { UserService } from "./user.services";

@Injectable({
    providedIn: 'root'
})
export class PostServices {

    constructor(private http: HttpClient,
                private userService: UserService
    ){}

    getAllPosts(): Observable<Post[]>{

        return this.http.get<Post[]>("http://localhost:3000/post").pipe(
            map((posts =>  [...posts].sort((a,b) => b.id - a.id)))
        );
    }

    getPostsByUser(idUser: number): Observable<Post[]>{

        return this.http.get<Post[]>(`http://localhost:3000/post?id_utilisateur=${idUser}`).pipe(
            map((posts =>  [...posts].sort((a,b) => b.id - a.id)))
        );
    }

    getPostById(idPost: number): Observable<Post>{

        return this.http.get<Post>(`http://localhost:3000/post/${idPost}`);
    }

    addPost(formValue: {contenu: string, image?: string}): Observable<Post>{

        return this.getAllPosts().pipe(
            map(posts => [...posts].sort((a,b) => a.id - b.id)),
            map(sortedPosts => sortedPosts[sortedPosts.length -1]),
            map(previousPost => ({
                ...formValue,
                id: (+previousPost.id + 1).toString(),
                id_utilisateur: this.userService.getConnectedUser()?.id,
                date_creation: new Date(),
                image: formValue.image,
                sensible: false,
                nom_utilisateur: this.userService.getConnectedUser()?.nom,
                prenom_utilisateur: this.userService.getConnectedUser()?.prenom,
                likes: 0,
                comments: []
            })),
            switchMap(newPost => this.http.post<Post>(`http://localhost:3000/post/`, newPost))
        );
    }

    likeOrUnlikePost(idPost: number, actionType: 'like' | 'unlike'): Observable<Post>{

        return this.getPostById(idPost).pipe(
            map(post =>({
                ...post,
                likes: post.likes + (actionType === 'like' ? 1 : -1)
            })),
            switchMap(updatedPost => this.http.put<Post>(`http://localhost:3000/post/${idPost}`, updatedPost))
        );
    }

    updateNumberOfLikes(numberOflikes: number, idPost: number): void{

        const body = {likes: numberOflikes};
        this.http.patch(`http://localhost:3000/post/${idPost}`, body).subscribe();
    }
}