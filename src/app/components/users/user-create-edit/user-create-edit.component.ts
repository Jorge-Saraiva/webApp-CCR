import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/users';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.css']
})
export class UserCreateEditComponent implements OnInit {
  genders: string[] = ['Masculino', 'Feminino', 'Outro'];
  caracters: number = 20;
  form: FormGroup;
  maxDate: Date;
  loading: boolean = false;
  operation: string = 'Criar ';
  id: number | undefined;


  constructor(
    public dialogRef: MatDialogRef<UserCreateEditComponent>,
    private fb: FormBuilder,
    private _userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.maxDate = new Date(),
      this.form = this.fb.group({
        firstName: ['', [Validators.required, Validators.maxLength(this.caracters)]],
        lastName: ['', [Validators.required, Validators.maxLength(this.caracters)]],
        email: ['', [Validators.required, Validators.email]],
        gender: ['', Validators.required],
        birthDate: [null, Validators.required],
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
      this.getUser(id);
    }
  }

  // Get User Id
  getUser(id: number) {
    this._userService.getUser(id).subscribe(data => {
      this.form.setValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        gender: data.gender,
        birthDate: new Date(data.birthDate),
        city: data.city,
        state: data.state,
      })
    });
  }

  // Close Form
  cancelar() {
    this.dialogRef.close();
  }

  // Create And Edit User
  addEditUser() {
    if (this.form.invalid) {
      return;
    }

    const user: User = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      gender: this.form.value.gender,
      birthDate: this.form.value.birthDate,
      city: this.form.value.city,
      state: this.form.value.state
    }

    this.loading = true;

    if (this.id == undefined) {
      // Is Create
      this._userService.addUser(user).subscribe(() => {
        this._userService.showMessage("Usuário criado com sucesso!")
      });
    } else {
      // Is Edit
      this._userService.updateUser(this.id, user).subscribe(data => {
        this._userService.showMessage("Usuário atualizado com sucesso!")
      })
    }
    this.loading = false;
    this.dialogRef.close(true);
  }
}
