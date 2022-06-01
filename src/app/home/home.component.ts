import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['todosOsItensDasTarefas'];
  dataSource!: MatTableDataSource<any>;
  items: string[] = [];

  constructor(private dialog: MatDialog, private api: ApiService) { }

  ngOnInit(): void {
    this.getAllTarefas();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'

    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllTarefas();
      }
    });
  }

  getAllTarefas() {
    this.api.getTarefa()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
        },
        error: (err) => {
          alert("Erro ao buscar os dados")
        }
      })
  }
}
