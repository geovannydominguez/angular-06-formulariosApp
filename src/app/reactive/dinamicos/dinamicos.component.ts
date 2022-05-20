import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({

    // key: ['valor', 'validadores sincronos', 'validadores asincronos' ]
    // validadores sincronos son las validaciones que se hacen en el lado de Javascript
    // validadores asincronos para validar contra la BD que se podría ejecutar a destiempo o en otro hilo
    
    // key: ['valor', 'validadores sincronos', 'validadores asincronos' ]

    nombre: ['iPhone 12', [Validators.required, Validators.minLength(3)]],

    // this.fb.array para crear un arreglo
    favoritos: this.fb.array( 
      // Lo que está dentro de estas [] es el arreglo
      [

      // Estos NO son arreglos, con colecciones de FormControl.
      // Se los puede definir utilizando FormBuilder.control o entre []
      this.fb.control('Metal Gear', Validators.required),
      ['Mortal Kombat', Validators.required],
      ['Need for Speed']

    ], Validators.required )
  });

  // Crear un control independiente del Formulario
  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  // getter para acceder a la propiedad favoritos de miFormulario
  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  // Inyectar el servicio FormBuilder
  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  campoNoValido( campo: string ) {
    return this.miFormulario.controls[campo].errors &&
           this.miFormulario.controls[campo].touched;
  }

  agregarFavorito() {
    if (this.nuevoFavorito.invalid) {
      return;
    }

    // Tomar el valor de nuevoFavorito e insertar el nuevo elemento en favoritosArr
    // this.favoritosArr.push( new FormControl( this.nuevoFavorito.value, Validators.required ) );    
    
    // La línea de código anterior es literalmente igual que la siguiente.
    this.favoritosArr.push( this.fb.control( this.nuevoFavorito.value, Validators.required ) );
    
  }

  borrar(index: number) {
    this.favoritosArr.removeAt(index);
  }

  guardar() {

    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
  }

}
