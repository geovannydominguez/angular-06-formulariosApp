import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  // Sin utilizar FormBuilder
  // miFormulario: FormGroup = new FormGroup({
  //   nombre: new FormControl('iPhone 12'), // Es un control del formulario. En este caso el nombre de un producto.
  //   precio: new FormControl(1200),
  //   existencias: new FormControl(5)
  // });

  
  // Con FormBuilder
  miFormulario: FormGroup = this.fb.group({
    
    // key: ['valor', 'validadores sincronos', 'validadores asincronos' ]
    // validadores sincronos son las validaciones que se hacen en el lado de Javascript
    // validadores asincronos para validar contra la BD que se podría ejecutar a destiempo o en otro hilo
    
    // key: ['valor', 'validadores sincronos', 'validadores asincronos' ]

    nombre: [ '', [Validators.required, Validators.minLength(3)] ],
    precio: [ , [Validators.required, Validators.minLength(0)] ],
    existencias: [ , [Validators.required, Validators.minLength(0)] ]
  });

  // Inyectar el servicio FormBuilder
  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {

    // Establecer un valor inicial al formulario
    // IMPORTANTE: se deben setear valores para TODOS los campos del formulario, caso contrario genera error.
    // De preferencia utilizar reset()

    // this.miFormulario.setValue({
    //   nombre: 'iPhone 12',
    //   precio: 1200,
    //   existencias: 10
    // });

    this.miFormulario.reset({
      nombre: 'iPhone 12',
      precio: 1200
    });

  }

  campoNoValido( campo: string ) {
    return this.miFormulario.controls[campo].errors && 
           this.miFormulario.controls[campo].touched;
  }

  guardar() {

    if ( this.miFormulario.invalid ) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);

    // Para limpiar el formulario correctamente y luego resetear valores
    this.miFormulario.reset();
  }

}
