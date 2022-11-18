import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  fgValidation = this.fb.group({
    name: ['', [Validators.required]],
    Lastnames: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(6)]],
    mail: ['', [Validators.required, Validators.email]],
  });


  ngOnInit(): void {
  }

  store(){
    let user = new UserModel();
    user.name = this.fgValidation.controls["name"].value as string;
    user.Lastnames = this.fgValidation.controls["Lastnames"].value as string;
    user.email = this.fgValidation.controls["mail"].value as string;
    user.phone = this.fgValidation.controls["phone"].value as string;
 
    this.userService.store(user).subscribe((data: UserModel)=> {
      Swal.fire('Created successfully!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Fail send :(");
    })
  }


}
