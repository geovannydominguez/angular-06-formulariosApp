import { Directive, Input } from "@angular/core";
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    // Utilizar la directiva de HTML con el nombre 'customMin' y que tenga 'ngModel'
    selector: '[customMin][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CustomMinDirective,
        multi: true
    }]
})
export class CustomMinDirective implements Validator {

    // Validator es un objeto que ya viene con Angular para realizar validaciones en los elementos
    // del DOM, como por ejemplo el 'requiered', 'minlength'

    @Input() minimo!: number;

    constructor() {
        console.log('Directiva: ', this.minimo);
    }

    // Para implementar la interfaz Validator
    validate( control: FormControl) {
        const inputValue = control.value;
        console.log(inputValue);
        return ( (inputValue < this.minimo || inputValue === '-') ? { 'customMin': true } : null );
    }

}