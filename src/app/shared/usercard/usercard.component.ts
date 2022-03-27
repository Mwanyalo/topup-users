import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { User } from 'src/app/core/models/user.model';

import { UsersService } from '../../core/services/users.service';
@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
})
export class UsercardComponent {
  @Input() user!: any;
  @Input() getAllUser!: any;
  closeResult: string = '';
  submitted: Boolean = false;

  editUserForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    job: new FormControl(''),
  });

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private userService: UsersService
  ) {}

  get f(): { [key: string]: AbstractControl } {
    return this.editUserForm.controls;
  }

  buildForm = () => {
    this.editUserForm = this.formBuilder.group({
      name: new FormControl(this.user.name, [Validators.required]),
      job: new FormControl(this.user.job, [Validators.required]),
    });
  };

  open = (content: any) => {
    this.buildForm();
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  };

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onEditUser = () => {
    const user = this.editUserForm.value;
    this.userService.editUser(this.user.id, user).subscribe((data: any) => {
      this.user.name = data.name;
      this.user.job = data.job;
      this.userService.editDummy('edit', this.user);
    });
  };

  deleteUser = (id: string) => {
    this.userService.deleteUser(id).subscribe((data) => {
      if(data.status === 204){
        this.userService.deleteDummy(id)
        this.getAllUser()
      }
    });
  };
}
