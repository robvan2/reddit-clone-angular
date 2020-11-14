import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CreateSubredditComponent } from './components/create-subreddit/create-subreddit.component';
import { ListSubredditsComponent } from './components/list-subreddits/list-subreddits.component';
import { SubredditComponent } from './components/subreddit/subreddit.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: 'posts/create', component: CreatePostComponent },
  { path: "posts/:id", component: ViewPostComponent },
  { path: 'subreddits/create', component: CreateSubredditComponent },
  { path: 'subreddits', component: ListSubredditsComponent },
  { path: 'user-profile/:name', component: UserProfileComponent },
  { path: 'subreddits/:id', component: SubredditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
