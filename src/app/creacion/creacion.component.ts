import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../services/rest-api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-creacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './creacion.component.html',
  styleUrl: './creacion.component.css'
})
export class CreacionComponent implements OnInit {
  serieTVForm: FormGroup;
  constructor(
    public restApi: RestApiService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {
    this.serieTVForm = this.formBuilder.group({
      nombre: [''],
      anio_emision: [''],
      anios_al_aire: [''],
      clasificacion: [''],
      genero: [''],
      creador: ['']
    });
  } ngOnInit(): void {
  }
  createSerieTV() {
    this.restApi.createSerieTV(this.serieTVForm.value).subscribe((data: {}) => {
      this.router.navigate(['/consulta'])
    })
  }
}