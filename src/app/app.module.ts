import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/auth/login/login.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { TokenInterceptor } from './token.interceptor';
import { PostComponent } from './components/post/post.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VoteButtonComponent } from './components/shared/vote-button/vote-button.component';
import { SideBarComponent } from './components/shared/side-bar/side-bar.component';
import { SubredditSideBarComponent } from './components/shared/subreddit-side-bar/subreddit-side-bar.component';
import { CreateSubredditComponent } from './components/create-subreddit/create-subreddit.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { ListSubredditsComponent } from './components/list-subreddits/list-subreddits.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TimeagoModule } from 'ngx-timeago';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { CommentComponent } from './components/comment/comment.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SubredditComponent } from './components/subreddit/subreddit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PostComponent,
    VoteButtonComponent,
    SideBarComponent,
    SubredditSideBarComponent,
    CreateSubredditComponent,
    CreatePostComponent,
    ListSubredditsComponent,
    ViewPostComponent,
    CommentComponent,
    AddCommentComponent,
    UserProfileComponent,
    SubredditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    EditorModule,
    TimeagoModule.forRoot(),
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
