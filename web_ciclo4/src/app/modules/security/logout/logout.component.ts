import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private securityService: SecurityService,
    private router: Router) { }

  ngOnInit(): void {
    this.securityService.deleteSession();
    this.router.navigate(['/security/login']);
  }

}
