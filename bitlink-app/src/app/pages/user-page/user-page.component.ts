import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { FollowingButtonComponent } from '../../components/following-button/following-button.component';
import { ForYouButtonComponent } from '../../components/for-you-button/for-you-button.component';
import { PostComponentComponent } from '../../components/post-component/post-component.component';
import { ReplyComponent } from '../../components/reply/reply.component';
import { CommentComponent } from '../../components/comment/comment.component';
import { AccountManagementService } from '../../services/account-management/account-management.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    SidebarComponent,
    SearchBarComponent,
    FollowingButtonComponent,
    ForYouButtonComponent,
    PostComponentComponent,
    ReplyComponent,
    CommentComponent,
    CommonModule,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UserPageComponent {
  profileImagePath: string = 'assets/profile_picture.png';
  id: string = '6647cf24ebe437ca2de4e30d';
  name: string | undefined;
  username: string | undefined;
  posts: any[] = [];
  followercount: string = '0';
  postnumber: any;
  constructor(
    private accountManagementService: AccountManagementService,
    private http: HttpClient
  ) {
    // this.nameInit();
    this.usernameInit();
  }
  usernameInit() {
    this.accountManagementService.getCurrentUser().subscribe({
      next: (res) => {
        console.log(res);
        this.id = JSON.parse(res)._id;
        this.username = JSON.parse(res).username;
        this.name = JSON.parse(res).name;
        this.fetchPosts();
      },
    });
  }
  fetchPosts(): void {
    this.http
      .get(`https://bitlinkbackend.catenarymaps.org/api/userposts/${this.username}`)
      .subscribe((data: any) => {
        this.posts = data;
        this.postnumber = this.posts.length;
      });
  }
  // profile_picture: string = 'assets/profile_picture.png';
  // profile_picture2: string = 'assets/remy.jpg';
  // profile_picture4: string = 'assets/bw-female.jpg';
  // like: string = '87K';
  // repost: string = '12K';
  // comment_number: string = '8,402';
  // save: string = '62K';
  // like2: string = '523K';
  // repost2: string = '44.2K';
  // comment_number2: string = '121K';
  // save2: string = '12K';
  // like3: string = '7.2M';
  // repost3: string = '1.2M';
  // comment_number3: string = '6.1M';
  // save3: string = '921K';
  // username: string = 'Jonny Boy';
  // username4: string = 'Looking for Love';
  // usertag4: string = '@LookingForBoyfriend';
  // usertag: string = '@John BitLink';
  // usertag2: string = '@RustyRustacean';
  // username2: string = 'Ferris the Crab';
  // profile_picture3: string = 'assets/ferris-on-pattern.jpg';
  // date: string = '9:19 AM Apr 13, 2024';
  // date2: string = '3:12 AM Apr 10, 2024';
  // date4: string = '5:21 PM Apr 9, 2024';
  // message: string =
  //   "I didn't know they were making murals of me??? I mean guess thats what happens when u are a C++ god.";
  // message2: string =
  //   'Too many backend devs in the kitchen rn. Where my frontend devs at?';
  // message4: string =
  //   'Welcome to BitLink!!!! Send me questions about features you want on this app.';
  // comment: string =
  //   'I really like this post! I think it is very informative and helpful for people looking to learn Rust. However, I feel like people should look towards C++ instead. C++ is a much more practical language than R or Rust.';
  // image: string = 'assets/jesus.jpg';
}
