import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {
  genders: string[] = ['Masculino', 'Feminino', 'Outro'];
  caracters: number = 20;
  form: FormGroup;
  loading: boolean = false;
  id: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<UserDeleteComponent>,
    private fb: FormBuilder,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      gender: [''],
      birthDate: [null],
      city: [''],
      state: [''],
    })
    // console.log("Estou em um modal", data['id']);
    this.id = data.id;
  }

  ngOnInit(): void {}

  deleteUser() {
    this.loading = true;

    if (this.id !== undefined) {
      // Is Edit
      this._userService.deleteUser(this.id).subscribe(data => {
        this.showMessage('Usuário excluído com sucesso!')
      })
    }
    this.loading = false;
    this.dialogRef.close(true);
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  showMessage(msg: string, isError: boolean = false): void {
    this._snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }
}
