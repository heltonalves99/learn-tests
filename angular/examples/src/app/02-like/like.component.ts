import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent {
  @Input() totalLikes = 0;
  @Input() iLike = false;
  
  click(){
    this.iLike = !this.iLike;
    this.totalLikes += this.iLike ? 1 : -1;
  }

}