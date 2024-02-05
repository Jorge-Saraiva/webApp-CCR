import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Place } from 'src/app/interfaces/places';
import { HeaderService } from 'src/app/services/header.service';
import { PlaceCreateEditComponent } from '../place-create-edit/place-create-edit.component';
import { PlaceService } from 'src/app/services/place.service';
import { PlaceDeleteComponent } from '../place-delete/place-delete.component';

@Component({
  selector: 'app-list-places',
  templateUrl: './list-places.component.html',
  styleUrls: ['./list-places.component.css']
})
export class ListPlacesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'city', 'state', 'actions'];
  dataSource: MatTableDataSource<Place>;
  loading: boolean = false;
  title = 'Endereços';
  placeid: number | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _headerService: HeaderService,
    private _placeService: PlaceService
  ) {
    _headerService.headerData = {
      title: 'Cadastro de Endereços',
      icon: 'add_location_alt',
      routeUrl: '/places'
    },
      this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.getPlaces();
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

  // Get places
  getPlaces() {
    this.loading = true;
    this._placeService.getPlaces().subscribe(data => {
      this.loading = false;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // Create and Edit place
  createEditPlace(id?: number) {
    const dialogRef = this.dialog.open(PlaceCreateEditComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPlaces();
      }
    });
  }

  // Delete place
  deletePlace(id: number) {
    const dialogRef = this.dialog.open(PlaceDeleteComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPlaces();
      }
    });
  }
}
