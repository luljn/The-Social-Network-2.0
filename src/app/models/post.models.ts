export class Post {

    id!: number;
    id_utilisateur!: number;
    contenu!: string;
    date_creation!: Date;
    image?: string;
    sensible!: boolean;
    nom_utilisateur!: string;
    prenom_utilisateur!: string;
    likes!: number;
    comments!: any[];
}