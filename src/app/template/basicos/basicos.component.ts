import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  // Para acceder a una directiva, un componente secundario o un elemento DOM.
  // En este caso para acceder a un elemento del DOM
  @ViewChild('miFormulario') miFormulario!: NgForm;

  // Para inicializar el formularios con ciertos valores
  initForm = {
    producto: 'Test Product',
    precio: 10,
    existencias: 10
  }

  constructor() { }

  ngOnInit(): void {
  }

  nombreInvalido(): Boolean {
    // Utilizar '.?' para validar valores null. Sólo si existe this.miFormulario? entonces continuar.

    return this.miFormulario?.controls['producto']?.invalid &&
           this.miFormulario?.controls['producto']?.touched;
  }

  precioInvalido(): Boolean {
    return this.miFormulario?.controls['precio']?.value < 0 ||
           (this.miFormulario?.controls['precio']?.invalid && 
           this.miFormulario?.controls['precio']?.touched);
  }

  guardar() {
    //console.log( this.miFormulario.value );
    console.log('Posteo correcto');

    // Para limpiar el formulario correctamente y luego setear valores
    this.miFormulario.resetForm({
      producto: 'Algo',
      precio: 0,
      existencias: 0
    });
  }

}
