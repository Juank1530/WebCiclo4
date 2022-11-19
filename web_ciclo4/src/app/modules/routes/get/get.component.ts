import { Component, OnInit } from '@angular/core';
import { RouteModel } from 'src/app/models/route.model';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(
    private routeService: RouteService
  ) { }

  list: RouteModel[] = []
  getAll(){
    this.routeService.getAll().subscribe((data: RouteModel[]) => {
      this.list = data
      console.log(data)
    })
  }
 
  delete(id?: any){
    console.log(id)
    Swal.fire({
      title: 'Are you sure to delete this record?',
      showCancelButton: true,
      confirmButtonText: 'Accept',
    }).then((result) => {
      if (result.isConfirmed) {
        this.routeService.delete(id).subscribe((data: any) => {
          Swal.fire('Deleted successfully!', '', 'success')
          this.getAll();
        })
      }
    })
  }


  ngOnInit(): void {
    this.getAll()
  }

}
