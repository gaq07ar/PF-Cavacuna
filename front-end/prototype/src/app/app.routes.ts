import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { InicioComponent } from "./components/inicio/inicio.component";
import { ReportesComponent } from "./components/reportes/reportes.component";
import { LandingComponent } from "./components/landing/landing.component";
import { SignupComponent } from "./components/signup/signup.component";

const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "inicio", component: InicioComponent },
  { path: "reportes", component: ReportesComponent },
  { path: "**", pathMatch: "full", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
