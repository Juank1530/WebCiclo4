import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AirportService } from 'src/app/services/airport.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AirportModel } from 'src/app/models/airport.model';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private airportService: AirportService,
    private router: Router
  ) { }

  fgValidation = this.fb.group({
    name: ['', [Validators.required]],
    city: ['', [Validators.required]],
    country: ['', [Validators.required]],
    coor_x: ['', [Validators.required]],
    coor_y: ['', [Validators.required]],
    acronym: ['', [Validators.required]],
    type: ['', [Validators.required]],
  });


  ngOnInit(): void {
  }

  store(){
    let airport = new AirportModel();
    airport.name = this.fgValidation.controls["name"].value as string;
    airport.city = this.fgValidation.controls["city"].value as string;
    airport.country = this.fgValidation.controls["country"].value as string;
    airport.coor_x = this.fgValidation.controls["coor_x"].value as string;
    airport.coor_y = this.fgValidation.controls["coor_y"].value as string;
    airport.acronym = this.fgValidation.controls["acronym"].value as string;
    airport.type = this.fgValidation.controls["type"].value as string;
 
    this.airportService.store(airport).subscribe((data: AirportModel)=> {
      Swal.fire('Created successfully!', '', 'success')
      this.router.navigate(['/airports/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Fail send :(");
    })
  }

}
