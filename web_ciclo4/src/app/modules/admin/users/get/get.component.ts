import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private userService: UserService) { }

  list: UserModel[] = []

  delete(id?: any){
    console.log(id)
    Swal.fire({
      title: 'Are you sure to delete this record?',
      showCancelButton: true,
      confirmButtonText: 'Accept',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(id).subscribe((data: any) => {
          Swal.fire('Deleted successfully!', '', 'success')
          this.getAll();
        })
      }
    })
  }


  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.userService.getAll().subscribe((data: UserModel[]) => {
      this.list = data
      console.log(data)
    })
  }

}
