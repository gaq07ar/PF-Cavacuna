import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


//Rutas
import { APP_ROUTING } from './app.routes';

//Servicios

//Componentes
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CavacunaComponent } from './components/shared/cavacuna/cavacuna.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginCardComponent } from './components/login/login-card/login-card.component';
import { LoginbarComponent } from './components/shared/loginbar/loginbar.component';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ReportesComponent,
    NavbarComponent,
    CavacunaComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
    LoginCardComponent,
    LoginbarComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
