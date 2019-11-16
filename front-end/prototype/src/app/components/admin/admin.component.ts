import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  public usuarios = ["Nico", "Gabi", "Dami", "Nacho"];
  
  altaUsuario() {
      let usuario= prompt("Enter a new item");
      this.usuarios.push(usuario);
  }

  bajaUsuario(nombre){
    for (var i = 0; i < this.usuarios.length; i++){
      if (this.usuarios[i]["nombre"] == nombre){
        this.usuarios.splice( i, 1 );
        // console.log(this.usuarios);
        let usuario= prompt("Escriba el nombre del usuario nuevo");
      }
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
