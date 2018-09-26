import { Component, OnInit, ViewChild } from '@angular/core';
import { first, tap } from 'rxjs/operators';

import { UserService } from '../providers/user.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  search: any;
  users: any;
  loading = false;
  displayedColumns = ["id", "name", "username"];

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loadAllUsers(1, '').then(()=>{
      this.paginator.page
          .pipe(
              tap(() => {
                this.loadAllUsers(this.paginator.pageIndex + 1, this.search)
              })
          )
          .subscribe();
    });
  }  

  public loadAllUsers(page = 1, search) {
    this.search = search;
    this.users ? this.loading = true : '';
    return new Promise((resolve)=>{
      this.userService.getAll(page, search).pipe(first()).subscribe(users => {
        this.loading = false;
        this.users = users;
        resolve();
      });
    });
  }

  logout(){
    this.router.navigate(['/login']);
  }
}
