export interface BlogPost {
    id: number;
    title: string;
    content: string;
    author: string;
    publishedAt: Date;
    category?: string;
}