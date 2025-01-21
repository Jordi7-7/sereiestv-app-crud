import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../services/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-edicion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edicion.component.html',
  styleUrl: './edicion.component.css'
})
export class EdicionComponent implements OnInit {
  id: any;
  serieTVForm: FormGroup;
  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router,
    public formBuilder: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.params['id'];
    this.serieTVForm = this.formBuilder.group({
      nombre: [''],
      anio_emision: [''],
      anios_al_aire: [''],
      clasificacion: [''],
      genero: [''],
      creador: ['']
    });
  }
  ngOnInit(): void {
    this.restApi.getSerieTV(this.id).subscribe((data: any) => {
      this.serieTVForm.setValue({
        nombre: data.nombre,
        anio_emision: data.anio_emision,
        anios_al_aire: data.anios_al_aire,
        clasificacion: data.clasificacion,
        genero: data.genero,
        creador: data.creador
      });
    })
  }
  // Actualiza los datos de la SerieTV:
  updateSerieTV() {
    if (window.confirm('Esta seguro que desea actualizar?')) {
      this.restApi.updateSerieTV(this.id, this.serieTVForm.value).subscribe(data => {
        this.router.navigate(['/consulta'])
      })
    }
  }
}