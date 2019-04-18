import { Post } from '../shared/model/post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) {
    }

    getPosts() {
        this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
            .pipe(map((postData) => {
                return postData.posts.map(post => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id
                    };
                });
            }))
            .subscribe((transformeData) => {
                // console.log(transformeData);
                this.posts = transformeData;
                this.postsUpdated.next([...this.posts]);
            });
    }
    getPostUpdtedListener() {
        return this.postsUpdated.asObservable();
    }
    addPost(title: string, content: string) {
        const post: Post = { title, content };
        this.http.post<{ message: string }>('http://localhost:3000/api/posts', post).subscribe(
            (data) => {
                console.log(data.message);
            }
        );
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    }

    deletePost(postId: string) {
        this.http.delete('http://localhost:3000/api/posts/' + postId).subscribe(
            () => {
                const updatedPost = this.posts.filter(post => post.id !== postId);
                this.posts = updatedPost;
                this.postsUpdated.next([...this.posts]);
            }
        );
    }
}
