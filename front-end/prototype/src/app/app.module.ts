import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Rutas
import { APP_ROUTING } from './app.routes';

//Servicios

//Componentes
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CavacunaComponent } from './components/shared/cavacuna/cavacuna.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ReportesComponent,
    NavbarComponent,
    CavacunaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
