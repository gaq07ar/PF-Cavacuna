import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  public usuarios = ["Nico", "Gabi", "Dami", "Nacho"];

  altaUsuario() {
    let isValid: boolean = false;
    while (!isValid) {
      let usuario: string = prompt("Escriba el nombre del usuario nuevo");
      if (usuario.length >= 6) {
        this.usuarios.push(usuario);
        isValid = true;
      } else {
        alert(
          "El nombre del usuario debe ser mayor que 6 y cumplir condiciones"
        );
      }
    }
  }

  bajaUsuario(nombre) {
    for (var i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i] == nombre) {
        this.usuarios.splice(i, 1);
      }
    }
  }

  constructor() {}

  ngOnInit() {}
}
