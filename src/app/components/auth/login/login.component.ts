import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LoginRequestPayload } from './login.request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequest: LoginRequestPayload;
  loginForm: FormGroup;
  isError: boolean;
  registeredSuccess: String;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
    private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.isError = false;
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.toastr.success("Signup successfully!!");
        this.registeredSuccess = 'Please check your inbox for activation email ' +
          'activate your account before login';
      }
    });
  }

  login() {
    this.loginRequest = {
      username: '',
      password: ''
    }
    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequest).subscribe(
      (data) => {
        if (!data) {
          this.isError = true;
          this.toastr.error('Login Failed');
        } else {
          this.isError = false;
          this.router.navigateByUrl('/');
          this.toastr.success('Login Successful');
        }
      }
    );
  }

}
