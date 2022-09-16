import { Component } from '@angular/core';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  persona: Persona = {
    nombre: 'Geovanny',
    favoritos: [
      {id: 1, nombre: 'Metal Gear'},
      {id: 2, nombre: 'Mortal Kombat'}
    ]
  };

  nuevoJuego: string = '';


  guardar() {
    console.log('formulario posteado');
  }

  eliminar(index: number) {
    this.persona.favoritos.splice(index, 1);
  }

  agregarJuego() {
    const nuevoFavorito: Favorito = { 
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    };

    // ... spread operator para asegurar que no se va a enviar ninguna referencia al objeto
    this.persona.favoritos.push( { ...nuevoFavorito } );
    this.nuevoJuego = '';
  }

}
