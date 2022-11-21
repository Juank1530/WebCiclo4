import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightModel } from 'src/app/models/flight.model';
import { FlightService } from 'src/app/services/flight.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private router: Router
  ) { }

  fgValidation = this.fb.group({
    start_date: ['', [Validators.required]],
    start_time: ['', [Validators.required]],
    end_date: ['', [Validators.required]],
    end_time: ['', [Validators.required]],
    seats_sold: ['', [Validators.required]],
    pilot_name: ['', [Validators.required]],
    route: ['', [Validators.required]],
  });


  ngOnInit(): void {
  }

  store(){
    let flight = new FlightModel();
    flight.start_date = this.fgValidation.controls["start_date"].value as string;
    flight.start_time = this.fgValidation.controls["start_time"].value as string;
    flight.end_date = this.fgValidation.controls["end_date"].value as string;
    flight.end_time = this.fgValidation.controls["end_time"].value as string;
    flight.seats_sold = this.fgValidation.controls["seats_sold"].value as unknown as number;
    flight.pilot_name = this.fgValidation.controls["pilot_name"].value as string;
    flight.route = this.fgValidation.controls["route"].value as string;
 
    this.flightService.store(flight).subscribe((data: FlightModel)=> {
      Swal.fire('Created successfully!', '', 'success')
      this.router.navigate(['/flights/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Fail send :(");
    })
  }

}
