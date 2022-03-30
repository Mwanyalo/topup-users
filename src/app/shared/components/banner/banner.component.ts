import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import {UsersService} from '../../../core/services/users.service'

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
})
export class BannerComponent implements OnInit {
  @Input() getAllUser!: any;
  pageTitle: string = '';
  closeResult: string = '';
  submitted: Boolean = false;

  addUserForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    job: new FormControl(''),
  });

  constructor( private route: ActivatedRoute,    private modalService: NgbModal,    private formBuilder: FormBuilder,
    private userService: UsersService) { }

  ngOnInit(): void {
    this.getPageTitle()
  }

  buildForm = () => {
    this.addUserForm = this.formBuilder.group({
      name: new FormControl("",[Validators.required] ),
      job: new FormControl("", [Validators.required]),
    });
  };
  get f(): { [key: string]: AbstractControl } {
    return this.addUserForm.controls;
  }

  getPageTitle = () => {
    this.route.url.subscribe((data) => {
      this.pageTitle = data[data.length - 1].path;
    });
  };

  addUserModal = (content: any) => {
    this.buildForm() 
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
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onAddUser = () => {
    let user = this.addUserForm.value
    this.userService.addUser(user).subscribe((data: any) => {
      user.id = data.id;
      this.userService.editDummy("new", user);
      this.getAllUser()
    })
  };

}
