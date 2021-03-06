import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ActivatedRoute, Router } from '@angular/router';

import Validation from '../../utils/validation';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  formTitle: string = '';
  submitted: Boolean = false;
  showPassword: Boolean = false;
  errorMessage: string = '';

  authForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.authService.logout();
    this.getForm();
    this.buildForm();
  }

  getForm = () => {
    this.route.url.subscribe((data) => {
      this.formTitle = data[data.length - 1].path;
    });
  };

  buildForm = () => {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  };

  get f(): { [key: string]: AbstractControl } {
    return this.authForm.controls;
  }

  passwordShow() {
    this.showPassword = !this.showPassword;
  }

  onSubmit = () => {
    this.errorMessage = ""
    this.submitted = true;
    if (this.authForm.invalid) {
      return;
    }
    this.loaderService.displayLoader(true);
    if (this.formTitle === 'login') {
      const user = this.authForm.value;
      this.authService.login(user).subscribe(
        (data: any) => {
          localStorage.setItem('sessionToken', data.token);
          this.loaderService.displayLoader(false);
          this.router.navigate(['/users']);
        },
        (error) => {
          this.loaderService.displayLoader(false);
          this.errorMessage = error.error.error
        }
      );
    } else if (this.formTitle === 'register') {
      const user = this.authForm.value;
      this.authService.register(user).subscribe(
        (data: any) => {
          console.log(data);
          localStorage.setItem('sessionToken', data.token);
          this.loaderService.displayLoader(false);
          this.router.navigate(['/user']);
        },
        (error) => {
          this.loaderService.displayLoader(false);
          if (
            error.error.error ===
            'Note: Only defined users succeed registration'
          ) {
            this.errorMessage = 'Kindly use "eve.holt@reqres.in" to register';
          } else {
            this.errorMessage = error.error.error;
          }
        }
      );
    } else {
      this.loaderService.displayLoader(false);
    }
  };
}
