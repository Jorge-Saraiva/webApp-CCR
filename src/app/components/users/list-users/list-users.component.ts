import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HeaderService } from 'src/app/services/header.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces/users';
import { UserCreateEditComponent } from '../user-create-edit/user-create-edit.component';
import { UserService } from 'src/app/services/user.service';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'gender', 'birthDate', 'city', 'state', 'actions'];
  dataSource: MatTableDataSource<User>;
  loading: boolean = false;
  title = 'Usuários';
  userid: number | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _headerService: HeaderService,
    private _userService: UserService
  ) {
    _headerService.headerData = {
      title: 'Cadastro de Usuários',
      icon: 'person_add_alt',
      routeUrl: '/users'
    },
      this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.getUsers();
  }

  // Paginator and sort
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = "Itens por página";
    this.dataSource.sort = this.sort;
  }

  // Filtros
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Get Users
  getUsers() {
    this.loading = true;
    this._userService.getUsers().subscribe(data => {
      this.loading = false;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // Create and Edit user
  createEditUser(id?: number) {
    const dialogRef = this.dialog.open(UserCreateEditComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUsers();
      }
    });
  }

  // Delete User
  deleteUser(id: number) {
    const dialogRef = this.dialog.open(UserDeleteComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUsers();
      }
    });
  }
}
