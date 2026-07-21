import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemestreService } from '../../core/services/semestre.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-semestre',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './semestre.component.html',
  styleUrls: ['./semestre.component.css']
})
export class SemestreComponent implements OnInit {

  semestres: number[] = [];

  constructor(private semestreService: SemestreService) {}

  ngOnInit(): void {
    // 🟢 Obtén el idUsuario dinámicamente
    const idUsuarioString = localStorage.getItem('id_usuario');

    if (idUsuarioString) {
      const idUsuario = Number(idUsuarioString);

      this.semestreService.obtenerSemestresPorUsuario(idUsuario)
        .subscribe(
          (data) => {
            this.semestres = data.map(s => s.numero_semestre);
            console.log('Semestres obtenidos:', this.semestres);
          },
          error => {
            console.error('Error al obtener los semestres', error);
          }
        );

    } else {
      console.error('No se encontró el idUsuario en el localStorage. El usuario no está logueado.');
    }
  }

  onSemestreClick(numeroSemestre: number): void {
    console.log('Clicked en semestre:', numeroSemestre);
  }
}






// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-semestre',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './semestre.component.html',
//   styleUrls: ['./semestre.component.css']
// })
// export class SemestreComponent implements OnInit {
  
//   // En lugar de array fijo
//   // semestres = [1, 2, 3, 4, 5, 6]; ← QUITAR ESTO
  
//   // Usar propiedades dinámicas
//   semestres: number[] = [];
//   carrera: any = {};
  
//   constructor() {}

//   ngOnInit() {
//     // Aquí llamarás al backend
//     this.loadCarreraData();
//   }

//   // Método para cargar datos del backend
//   loadCarreraData() {
//     // EJEMPLO: cuando tengas el backend
//     // this.carreraService.getCarreraById(carreraId).subscribe(data => {
//     //   this.carrera = data;
//     //   this.generateSemestres(data.numeroSemestres);
//     // });

//     // MIENTRAS TANTO, simula diferentes carreras:
//     this.simulateCarrera();
//   }

//   // Simular diferentes carreras (temporal)
//   simulateCarrera() {
//     // Simula diferentes números de semestres
//     const ejemplos = [
//       { nombre: 'Medicina', semestres: 12 },
//       { nombre: 'Ingeniería', semestres: 10 },
//       { nombre: 'Derecho', semestres: 8 },
//       { nombre: 'Técnico', semestres: 4 }
//     ];
    
//     // Toma uno aleatorio para prueba
//     const carreraEjemplo = ejemplos[Math.floor(Math.random() * ejemplos.length)];
    
//     this.carrera = carreraEjemplo;
//     this.generateSemestres(carreraEjemplo.semestres);
//   }

//   // Generar array de semestres dinámicamente
//   generateSemestres(numeroSemestres: number) {
//     this.semestres = Array.from({length: numeroSemestres}, (_, i) => i + 1);
//     console.log(`Carrera: ${this.carrera.nombre} - Semestres:`, this.semestres);
//   }

//   onSemestreClick(numeroSemestre: number) {
//     console.log(`Clicked semestre ${numeroSemestre} de ${this.carrera.nombre}`);
//   }
// }