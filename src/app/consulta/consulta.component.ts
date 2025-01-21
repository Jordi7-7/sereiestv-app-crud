import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../services/rest-api.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent implements OnInit {
  seriesTV: any = [];
  constructor(
    public restApi: RestApiService
  ) { }
  ngOnInit(): void {
    this.getSeriesTV()
  }
  //Obtener la lista de series de TV:
  getSeriesTV() {
    return this.restApi.getSeriesTV().subscribe((data: {}) => {
      this.seriesTV = data;
    })
  }

  // Borrar una sere de TV
  deleteSerieTV(id: any) {
    if (window.confirm('Está seguro que desea eliminar el dato?')) {
      this.restApi.deleteSerieTV(id).subscribe(data => {
        this.getSeriesTV()
      })
    }
  }
} 