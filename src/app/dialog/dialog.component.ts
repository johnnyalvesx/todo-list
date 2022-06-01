import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input() tarefasForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.tarefasForm = this.formBuilder.group({
      tituloTarefa: ['', Validators.required],
      dataRegistro: ['', Validators.required],
      descricaoTarefa: ['', Validators.required]
    })
  }

  addTarefa() {
    if (this.tarefasForm.valid) {
      this.api.postTarefa(this.tarefasForm.value)
        .subscribe({
          next: () => {
            alert("Tarefa adicionada com sucesso!");
            this.tarefasForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert("Erro ao adicionar produto à lista")
          }
        })
    }
  }
}
