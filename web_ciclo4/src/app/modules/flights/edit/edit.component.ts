import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightModel } from 'src/app/models/flight.model';
import { FlightService } from 'src/app/services/flight.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  fgValidation = this.fb.group({
    id: ['', [Validators.required]],
    start_date: ['', [Validators.required]],
    start_time: ['', [Validators.required]],
    end_date: ['', [Validators.required]],
    end_time: ['', [Validators.required]],
    seats_sold: ['', [Validators.required]],
    pilot_name: ['', [Validators.required]],
    route: ['', [Validators.required]],
  });

  getWithId(id: string){
    this.flightService.getWithId(id).subscribe((data: FlightModel) => {
      console.log(data)
      this.fgValidation.controls["id"].setValue(id)
      this.fgValidation.controls["start_date"].setValue(data.start_date as string)
      this.fgValidation.controls["start_time"].setValue(data.start_time as string)
      this.fgValidation.controls["end_date"].setValue(data.end_date as string)
      this.fgValidation.controls["end_time"].setValue(data.end_time as string)
      this.fgValidation.controls["seats_sold"].setValue(data.seats_sold as any)
      this.fgValidation.controls["pilot_name"].setValue(data.pilot_name as string)
      this.fgValidation.controls["route"].setValue(data.route as string)
    })
  }

  edit(){
    let flight = new FlightModel();
    flight.id = this.fgValidation.controls["id"].value as string;
    flight.start_date = this.fgValidation.controls["start_date"].value as string;
    flight.start_time = this.fgValidation.controls["start_time"].value as string;
    flight.end_date = this.fgValidation.controls["end_date"].value as string;
    flight.end_time = this.fgValidation.controls["end_time"].value as string;
    flight.seats_sold = this.fgValidation.controls["seats_sold"].value as unknown as number;
    flight.pilot_name = this.fgValidation.controls["pilot_name"].value as string;
    flight.route = this.fgValidation.controls["route"].value as string;
 
 
    this.flightService.update(flight).subscribe((data: FlightModel)=> {
      Swal.fire('Correctly Edited!', '', 'success')
      this.router.navigate(['/flights/get']);
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
