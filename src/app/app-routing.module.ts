import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    // Lazy - Load
    // Cuando alguien entra al path 'template' entonces cargar sus hijos y estos hijos
    // vienen de template.module y cuando la Promesa se cargue esto va a regresar TemplateModule 
    path: 'template',
    loadChildren: () => import('./template/template.module').then( m => m.TemplateModule )
  },
  { 
    path: 'reactive',
    loadChildren: () => import('./reactive/reactive.module').then( m => m.ReactiveModule )
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: '**',
    redirectTo: 'template'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
