import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  isLoggedIn: boolean;
  username: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }
  logout() {

  }
}