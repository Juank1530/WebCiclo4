import { Component, OnInit } from '@angular/core';
import { FlightModel } from 'src/app/models/flight.model';
import { FlightService } from 'src/app/services/flight.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(
    private flightService: FlightService
  ) { }

  list: FlightModel[] = []
  getAll(){
    this.flightService.getAll().subscribe((data: FlightModel[]) => {
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
        this.flightService.delete(id).subscribe((data: any) => {
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
