import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/authService.service';

@Component({
  selector: 'app-callbackLogin',
  templateUrl: './callbackLogin.component.html',

})
export class CallbackLoginComponent implements OnInit {


  constructor(private _route: ActivatedRoute,
    private authService: AuthServiceService,
    private router: Router) { }

  ngOnInit() { 
  }

}
