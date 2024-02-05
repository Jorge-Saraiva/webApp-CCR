import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Place } from 'src/app/interfaces/places';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-place-delete',
  templateUrl: './place-delete.component.html',
  styleUrls: ['./place-delete.component.css']
})
export class PlaceDeleteComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  operation: string = 'Criar ';
  id: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<PlaceDeleteComponent>,
    private fb: FormBuilder,
    private _placeService: PlaceService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.fb.group({
      city: [''],
      state: [''],
    })
    this.id = data.id;
  }

  ngOnInit(): void {
  }

  deletePlace() {
    this.loading = true;

    if (this.id !== undefined) {
      // Is Edit
      this._placeService.deletePlace(this.id).subscribe(data => {
        this._placeService.showMessage('Endereço excluído com sucesso!')
      })
    }
    this.loading = false;
    this.dialogRef.close(true);
  }

  cancelar() {
    this.dialogRef.close(false);
  }

}
