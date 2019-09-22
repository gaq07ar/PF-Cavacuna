import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component'
import { ReportesComponent } from './components/reportes/reportes.component';

const APP_ROUTES: Routes = [
    { path: '', component: InicioComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'reportes', component: ReportesComponent },    
    { path: '**', pathMatch: 'full', redirectTo: '' },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true})
