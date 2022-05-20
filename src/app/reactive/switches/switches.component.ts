import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, Validators.requiredTrue]
  });

  persona = {
    genero: 'F',
    notificaciones: true
  };

  // Inyectar el servicio FormBuilder
  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
    // Considerando que el objeto persona no tiene la propiedad condiciones.
    //
    // Inicializar miFormulario con los valores de persona y
    // a parte con un valor en condiciones para que no sea null
    this.miFormulario.reset({
      ...this.persona,
      condiciones: false
    });

    // OJO Este es un CASO NO COMÚN
    // El CASO NO COMÚN es que desee tener los valores del fomulario y del objeto persona sincronizados,
    // es decir, poder mirar al mismo tiempo los cambios.
    this.miFormulario.valueChanges
      .subscribe( 
        
        // Utilizando des-estructuración de objetos:
        // extraigo las condiciones que no necesito y con el operador spread ... agrego el resto a la variable resto

        ({ condiciones, ...resto }) => {

        // Con la des-estructuración de objetos ya no necesito elmiminar
        //delete form.condiciones;

        this.persona = resto;

      });
    
    
  }

  guardar() {
    // El CASO COMÚN es que una vez que tengo los valores en el formulario, 
    // hago submit y proceda a cambiar el valor del objeto persona.

    // Tomar el valor del miFormulario y establecer en persona
    // Utilizo el operador spread ... para crear un copia del valor del formulario y evitar posibles errores de referencia.
    const formValue = {...this.miFormulario.value};
    delete formValue.condiciones;
    
    console.log(formValue);
    this.persona = formValue;
  }

}
