import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  fgValidation = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    phone: [{value: '', disabled: true}, [Validators.required, Validators.minLength(6)]],
    mail: [{value: '', disabled: true}, [Validators.required, Validators.email]],
  });

  getWithId(id: string){
    this.userService.getWithId(id).subscribe((data: UserModel) => {
      console.log(data)
      this.fgValidation.controls["id"].setValue(id)
      this.fgValidation.controls["name"].setValue(data.name as string)
      this.fgValidation.controls["last_name"].setValue(data.Lastnames as string)
      this.fgValidation.controls["mail"].setValue(data.email as string)
      this.fgValidation.controls["phone"].setValue(data.phone as string)
    })
  }

  edit(){
    let user = new UserModel();
    user.id = this.fgValidation.controls["id"].value as string;
    user.name = this.fgValidation.controls["name"].value as string;
    user.Lastnames = this.fgValidation.controls["last_name"].value as string;
    user.email = this.fgValidation.controls["mail"].value as string;
    user.phone = this.fgValidation.controls["phone"].value as string;
 
    this.userService.update(user).subscribe((data: UserModel)=> {
      Swal.fire('Correctly Edited!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Fail send");
    })
  }






  ngOnInit(): void {
    let id = this.route.snapshot.params["id"]
    this.getWithId(id);
  }

}
