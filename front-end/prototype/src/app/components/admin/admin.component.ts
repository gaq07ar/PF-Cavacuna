import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  isFetching = false;
  users: [[string, string]];

  constructor(public auth: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.isFetching = true;
    this.getUsuariosForAdmin();
    this.isFetching = false;
  }

  createUser() {
    let isValid: boolean = false;
    while (!isValid) {
      let newUserAndDeviceId: string = prompt(
        "Escriba el nombre del usuario nuevo y el id de la vacuna separada por espacio"
      );
      if (newUserAndDeviceId.length >= 6) {
        let splitted = newUserAndDeviceId.split(" ");
        let userId = splitted[0];
        let deviceId = splitted[1];
        this.auth.userProfile$.subscribe(userInfo => {
          this.userService
            .addUserToAdmin(userInfo.email, userId, deviceId)
            .subscribe(newUser => {
              this.users.push([userId, deviceId]);
              alert("Usuario añadido correctamente");
            });
        });
        isValid = true;
      } else {
        alert(
          "El nombre del usuario debe ser mayor que 6 y cumplir condiciones"
        );
      }
    }
  }

  deleteUser(userId) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i] == userId) {
        this.users.splice(i, 1);
      }
    }
  }

  getUsuariosForAdmin() {
    this.auth.userProfile$.subscribe(userInfo => {
      this.userService
        .fetchRegisteredUsersForAdmin(userInfo.email)
        .subscribe(users => {
          this.users = users;
        });
    });
  }
}
