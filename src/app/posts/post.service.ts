import { Injectable } from '@angular/core';
import { Post } from'./post'
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postCollection: AngularFirestoreCollection<Post>;
  postDoc: AngularFirestoreDocument<Post>;

  constructor(private db: AngularFirestore) {
    this.postCollection = this.db.collection('posts', ref => 
    ref.orderBy('published', 'desc'))
   }

   getPosts() {
     return this.postCollection.snapshotChanges().map(actions => {
       return actions.map(result => {
         const data = result.payload.doc.data() as Post; 
         const id = result.payload.doc.id;
         return { id, ...data }
       })
     })
   }

   getPostData(id: string) {
    this.postDoc = this.db.doc<Post>(`posts/${id}`);
    return this.postDoc.valueChanges();
   }

   createPost(value: Post) {
     this.postCollection.add(value)
   }

   getPost(id: string) {
    return this.db.doc<Post>(`posts/${id}`)
   }

   deletePost(id: string) {
    return this.getPost(id).delete();
   }

   updatePost(id: string, formdata) {
     return this.getPost(id).update(formdata);
   }
}
