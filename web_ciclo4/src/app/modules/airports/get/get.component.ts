import { Component, OnInit } from '@angular/core';
import { AirportModel } from 'src/app/models/airport.model';
import { AirportService } from 'src/app/services/airport.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private airportService: AirportService) { }
  list: AirportModel[] = []

  getAll(){
    this.airportService.getAll().subscribe((data: AirportModel[]) => {
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
        this.airportService.delete(id).subscribe((data: any) => {
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
