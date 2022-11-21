import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AirportModel } from 'src/app/models/airport.model';
import { RouteModel } from 'src/app/models/route.model';
import { AirportService } from 'src/app/services/airport.service';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private routeService: RouteService,
    private airportService: AirportService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  Airport_list: AirportModel [] = []

  fgValidation = this.fb.group({
    id: ['', [Validators.required]],
    origin: ['', [Validators.required]],
    destiny: ['', [Validators.required]],
    estimated_time: ['', [Validators.required]],
  });

  getWithId(id: string){
    this.routeService.getWithId(id).subscribe((data: RouteModel) => {
      console.log(data)
      this.fgValidation.controls["id"].setValue(id)
      this.fgValidation.controls["origin"].setValue(data.origin as string)
      this.fgValidation.controls["destiny"].setValue(data.destiny as string)
      this.fgValidation.controls["estimated_time"].setValue(data.estimated_time as string)
    })
  }

  edit(){
    let route = new RouteModel();
    route.id = this.fgValidation.controls["id"].value as string;
    route.origin = this.fgValidation.controls["origin"].value as string;
    route.destiny = this.fgValidation.controls["destiny"].value as string;
    route.estimated_time = this.fgValidation.controls["estimated_time"].value as string;
 
 
    this.routeService.update(route).subscribe((data: RouteModel)=> {
      Swal.fire('Correctly Edited!', '', 'success')
      this.router.navigate(['/routes/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Fail send");
    })
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params["id"]
    this.getWithId(id);
    this.getAirports();
  }

  getAirports(){
    this.airportService.getAll().subscribe((data: AirportModel[]) => {
      this.Airport_list = data
      console.log(data)
    })
  }


}
