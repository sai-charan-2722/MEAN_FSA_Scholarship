import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  status: boolean;

  userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getUserLoginStatus().subscribe({
      next: (loginStatus) => {
        this.status = loginStatus;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}