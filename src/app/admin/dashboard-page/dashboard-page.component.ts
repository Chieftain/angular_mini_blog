import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from 'src/app/shared/components/posts.service';
import { Post } from 'src/app/shared/components/interfaces';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post [] = []
  pSub: Subscription
  dSub: Subscription
  searchStr = ''

  constructor(
    private postService: PostsService,
    private alert: AlertService) { }

  ngOnInit() {
    this.pSub = this.postService.getAll().subscribe( posts => {
      this.posts = posts
    })

  }
  
  remove(id: string){
    this.dSub = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
      this.alert.warning('Your post is deleted')
    })
  }

  ngOnDestroy(){
    if(this.pSub){
      this.pSub.unsubscribe()
    }
    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }
}