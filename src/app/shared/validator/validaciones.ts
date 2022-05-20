import { FormControl } from "@angular/forms";

export const nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

export const noPuedeSerStrider = (control: FormControl) => {
    const valor: string = control.value?.trim().toLowerCase();
    if (valor === 'strider') {

      // Si retornamos algo o algún objeto, significa que hay un error.
      return {
        noStrider: true
      }
    }

    return null; // Cuando regresamos null, significa que todo está OK.
  }