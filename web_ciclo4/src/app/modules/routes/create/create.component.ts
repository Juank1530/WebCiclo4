import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AirportModel } from 'src/app/models/airport.model';
import { RouteModel } from 'src/app/models/route.model';
import { AirportService } from 'src/app/services/airport.service';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private routeService: RouteService,
    private airportService: AirportService,
    private router: Router
  ) { }

  Airport_list: AirportModel [] = []

  fgValidation = this.fb.group({
    origin: ['', [Validators.required]],
    destiny: ['', [Validators.required]],
    estimated_time: ['', [Validators.required]],
  });


  ngOnInit(): void {
    this.getAirports();
  }

  getAirports(){
    this.airportService.getAll().subscribe((data: AirportModel[]) => {
      this.Airport_list = data
      console.log(data)
    })
  }

  store(){
    let route = new RouteModel();
    route.origin = this.fgValidation.controls["origin"].value as string;
    route.destiny = this.fgValidation.controls["destiny"].value as string;
    route.estimated_time = this.fgValidation.controls["estimated_time"].value as string;

    this.routeService.store(route).subscribe((data: RouteModel)=> {
      Swal.fire('Created successfully!', '', 'success')
      this.router.navigate(['/routes/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Fail send :(");
    })
  }

}

