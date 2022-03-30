import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { ProfileService } from 'src/app/core/services/profile.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  account: User = {};
  submitted: Boolean = false;

  profileForm: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.getAccount();
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.profileForm.controls;
  }

  buildForm = () => {
    this.profileForm = this.formBuilder.group({
      first_name: [this.account.first_name, [Validators.required]],
      last_name: [this.account.last_name, [Validators.required]],
      email: [this.account.email, [Validators.required, Validators.email]]
    });
  };


  getAccount = () => {
    this.loaderService.displayLoader(true)

    const user = localStorage.getItem('account');
    if (user) {
      this.account = JSON.parse(user);
      this.buildForm()
      this.loaderService.displayLoader(false)
    } else {
      this.profileService.getAccount().subscribe((data: any) => {
        this.account = data.data;
        localStorage.setItem('account', JSON.stringify(this.account));
        this.loaderService.displayLoader(false)
        this.buildForm()
      });
    }
  };

  onSubmit = () => {
    this.submitted = true;
    let user = this.profileForm.value
    user.avatar = this.account.avatar;

    if (this.profileForm.invalid) {
      return;
    }
    this.profileService.editAccount(user)
  }
}
