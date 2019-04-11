export interface Post {
    id?: string;
    title: string;
    draft: boolean;
    authorId?: string;
    author?: string;
    content?: string;
    image?: string;
    published?: Date;
    likes: number;
}
