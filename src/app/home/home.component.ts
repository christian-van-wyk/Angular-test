import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name:any;
  errorMessage:any;
  users:any[] = [];
  page:any = 1;
  
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  search() {
    this.http.get<any>('https://api.github.com/search/users?q='+ this.name).subscribe({
      next: data => {
          this.users = data.items;
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
    });
  }
  
  pageSwitch(pageNumber:any) {
    if (pageNumber !== 1) {
      this.page = (((pageNumber + 1) * 10) - 10)
    } else {
      this.page = (pageNumber + 1);
    }
  }
}
