import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../shared/components/posts.service';
import { Observable } from 'rxjs';
import { Post } from '../shared/components/interfaces';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {

  post$: Observable<Post>

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.post$ = this.route.params
    .pipe(switchMap((params: Params) => {
      return this.postsService.getById(params['id'])
    }))
  }

}
