import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { nombreApellidoPattern, emailPattern, noPuedeSerStrider } from '../../shared/validator/validaciones';
import { ValidatorService } from '../../shared/validator.service';
import { EmailValidatorService } from '../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({

    // key: ['valor', 'validadores sincronos', 'validadores asincronos' ]
    // validadores sincronos son las validaciones que se hacen en el lado de Javascript
    // validadores asincronos para validar contra la BD que se podría ejecutar a destiempo o en otro hilo
    
    // key: ['valor', 'validadores sincronos', 'validadores asincronos' ]

    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)] ],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidatorService] ],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider] ],
    password: ['', [Validators.required, Validators.minLength(6)] ],
    password2: ['', [Validators.required] ]

  }, {
    validators: [ this.validatorService.camposIguales('password', 'password2') ]
  });

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;

    if (errors?.['required']) {
      return 'Email es obligatorio';
    } else if (errors?.['pattern']) {
      return 'Formato no valido';
    } if (errors?.['emailTomado']) {
      return 'Email ya fue tomado';
    }

    return '';

  }

  // Inyectar FormBuilder y el Servicio
  constructor(private fb: FormBuilder, private validatorService: ValidatorService,
    private emailValidatorService: EmailValidatorService) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Geovanny Dominguez',
      email: 'test1@test.com',
      username: 'geovannyadq',
      password: '123456',
      password2: '123456'
    });
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid &&
          this.miFormulario.get(campo)?.touched;

  }

  submitFormulario() {
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }

  emailRequired() {
    return this.miFormulario.get('email')?.errors?.['required'] &&
          this.miFormulario.get('email')?.touched;
  }

}
