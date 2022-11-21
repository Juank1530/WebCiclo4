import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AirportModel } from 'src/app/models/airport.model';
import { AirportService } from 'src/app/services/airport.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private airportService: AirportService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  fgValidation = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    city: ['', [Validators.required]],
    country: ['', [Validators.required]],
    coor_x: ['', [Validators.required]],
    coor_y: ['', [Validators.required]],
    acronym: ['', [Validators.required]],
    type: ['', [Validators.required]],
  });

  getWithId(id: string){
    this.airportService.getWithId(id).subscribe((data: AirportModel) => {
      console.log(data)
      this.fgValidation.controls["id"].setValue(id)
      this.fgValidation.controls["name"].setValue(data.name as string)
      this.fgValidation.controls["city"].setValue(data.city as string)
      this.fgValidation.controls["country"].setValue(data.country as string)
      this.fgValidation.controls["coor_x"].setValue(data.coor_x as string)
      this.fgValidation.controls["coor_y"].setValue(data.coor_y as string)
      this.fgValidation.controls["acronym"].setValue(data.acronym as string)
      this.fgValidation.controls["type"].setValue(data.type as string)
    })
  }

  edit(){
    let airport = new AirportModel();
    airport.id = this.fgValidation.controls["id"].value as string;
    airport.name = this.fgValidation.controls["name"].value as string;
    airport.city = this.fgValidation.controls["city"].value as string;
    airport.country = this.fgValidation.controls["country"].value as string;
    airport.coor_x = this.fgValidation.controls["coor_x"].value as string;
    airport.coor_y = this.fgValidation.controls["coor_y"].value as string;
    airport.acronym = this.fgValidation.controls["acronym"].value as string;
    airport.type = this.fgValidation.controls["type"].value as string;
 
 
    this.airportService.update(airport).subscribe((data: AirportModel)=> {
      Swal.fire('Correctly Edited!', '', 'success')
      this.router.navigate(['/airports/get']);
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
