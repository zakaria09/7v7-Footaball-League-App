export interface Post {
    id?: string;
    title: string;
    authorPic?: string;
    author?: string;
    content?: string;
    image: string;
    published?: Date;
    likes: number;
}
