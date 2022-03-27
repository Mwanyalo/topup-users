import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import Validation from '../../utils/validation';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  formTitle: string = '';
  submitted: Boolean = false;

  authForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
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

  onSubmit = () => {
    this.submitted = true;
    if (this.authForm.invalid) {
      return;
    }
    if (this.formTitle === 'login') {
      const user = this.authForm.value
      this.authService.login(user).subscribe((data : any)=>{
        console.log(data)
        localStorage.setItem('sessionToken',data.token);
        this.router.navigate(['/users']);
      },)
    } else if (this.formTitle === 'register') {
      const user = this.authForm.value
      this.authService.register(user).subscribe((data : any)=>{
        console.log(data)
        localStorage.setItem('sessionToken',data.token);
        this.router.navigate(['/user']);
      },)
    } else {
    }
  };
}