import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as cryptoJS from 'crypto-js';
import { SecurityService } from 'src/app/services/security.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fgValidation = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });


  constructor(private fb: FormBuilder,private securityService: SecurityService,
    private router: Router) { }

  ngOnInit(): void {
  }

  identifyUser(){
    let user = this.fgValidation.controls["email"].value as string;
        let password = this.fgValidation.controls["password"].value as string;
        let encryptPassword = cryptoJS.MD5(password).toString();
     
        this.securityService.login(user, encryptPassword).subscribe(
          (data: any) => {
            this.securityService.StoreSession(data)
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Welcome',
              showConfirmButton: false,
              timer: 1500
            }).then(() =>{
              this.router.navigate(['/index']);
            })
  
          },
          (error: any) => {
            console.log(error)
            Swal.fire({
              title: 'Error!',
              text: 'Invalid data',
              icon: 'error',
              confirmButtonText: 'OK'
            })
  
          }
          );
        }
    


}
