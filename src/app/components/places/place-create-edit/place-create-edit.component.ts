import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Place } from 'src/app/interfaces/places';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-place-create-edit',
  templateUrl: './place-create-edit.component.html',
  styleUrls: ['./place-create-edit.component.css']
})
export class PlaceCreateEditComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  operation: string = 'Criar ';
  id: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<PlaceCreateEditComponent>,
    private fb: FormBuilder,
    private _placeService: PlaceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.fb.group({
      city: ['', Validators.required],
      state: ['', Validators.required],
    })
    this.id = data.id;
  }

  ngOnInit(): void {
    this.isEdit(this.id)
  }

  isEdit(id: number | undefined) {
    if (id !== undefined) {
      this.operation = "Editar";
      this.getPlace(id);
    }
  }

  // Get User Id
  getPlace(id: number) {
    this._placeService.getPlace(id).subscribe(data => {
      this.form.setValue({
        city: data.city,
        state: data.state,
      })
    });
  }

  // Fechar Formulário
  cancelar() {
    this.dialogRef.close();
  }

  addEditPlace() {
    if (this.form.invalid) {
      return;
    }

    const place: Place = {
      city: this.form.value.city,
      state: this.form.value.state
    }

    this.loading = true;

    if (this.id == undefined) {
      // Is Create
      this._placeService.addPlace(place).subscribe(() => {
        this._placeService.showMessage("Endereço criado com sucesso!")
      });
    } else {
      // Is Edit
      this._placeService.updatePlace(this.id, place).subscribe(data => {
        this._placeService.showMessage("Endereço atualizado com sucesso!")
      })
    }
    this.loading = false;
    this.dialogRef.close(true);
  }
}
