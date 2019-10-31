import { NgModule } from "@angular/core";
import { AuthGuard } from "./services/auth.guard";
import { RouterModule, Routes } from "@angular/router";

import { CallbackComponent } from "./components/callback/callback.component";
import { ReportesComponent } from "./components/reportes/reportes.component";
import { LandingComponent } from "./components/landing/landing.component";
import { InicioComponent } from "./components/inicio/inicio.component";
import { SignupComponent } from "./components/signup/signup.component";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "callback", component: CallbackComponent },
  {
    path: "inicio",
    component: InicioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "reportes",
    component: ReportesComponent,
    canActivate: [AuthGuard]
  },
  { path: "**", pathMatch: "full", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
