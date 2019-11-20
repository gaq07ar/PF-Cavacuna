import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { Device } from "../shared/device.model";
import { DevicesService } from "src/app/services/devices.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  isFetching = false;
  users: [[string, number]];
  adminId: string;
  devices: Device[] = [];
  isUserVerified = false;

  constructor(
    public auth: AuthService,
    private userService: UserService,
    private devicesService: DevicesService
  ) {}

  ngOnInit() {
    this.isFetching = true;
    this.processInitialData();
    this.getUsuariosForAdmin();
    this.isFetching = false;
  }

  getUsuariosForAdmin() {
    this.auth.userProfile$.subscribe(userInfo => {
      this.adminId = userInfo.email;
      this.userService
        .fetchRegisteredUsersForAdmin(this.adminId)
        .subscribe(users => {
          this.users = users;
        });
    });
  }

  createUser() {
    let isValid: boolean = false;
    while (!isValid) {
      let newUserAndDeviceId: string = prompt(
        "Escriba el nombre del usuario nuevo y el id de la heladera separada por espacio"
      );
      const splitted = newUserAndDeviceId.split(" ");
      let userId = splitted[0];
      let deviceId = Number(splitted[1]);
      if (userId.length >= 6 && !isNaN(deviceId)) {
        this.auth.userProfile$.subscribe(userInfo => {
          this.userService
            .addUserToAdmin(userInfo.email, userId, deviceId)
            .subscribe(
              newUser => {
                this.users.push([userId, deviceId]);
                alert("Usuario añadido correctamente");
              },
              error => {
                alert(
                  "El usuario debe estar registrado y el id de la heladera tiene que ser uno de los disponibles"
                );
              }
            );
        });
        isValid = true;
      } else {
        alert(
          "El nombre del usuario debe ser mayor que 6 y el código de heladera debe ser un valor numérico"
        );
      }
    }
  }

  deleteUser(userId: string, deviceId: number) {
    this.userService
      .removeUserForAdmin(this.adminId, userId, deviceId)
      .subscribe(
        deletedUser => {
          alert(
            "Usuario: " +
              userId +
              " con heladera asignada: " +
              deviceId +
              " eliminado correctamente"
          );
          for (var i = 0; i < this.users.length; i++) {
            if (this.users[i][0] == userId && this.users[i][1] == deviceId) {
              this.users.splice(i, 1);
            }
          }
        },
        error => {
          alert(
            "Ha ocurrido un error, por favor contactarse a cavacuna.project@gmail.com"
          );
        }
      );
  }

  private processInitialData() {
    this.auth.userProfile$.subscribe(userInfo => {
      if (userInfo.hasOwnProperty("email_verified")) {
        this.isUserVerified = userInfo.email_verified;
      }
      if (this.isUserVerified) {
        this.devicesService.fetchDevices(userInfo.email).subscribe(
          devices => {
            console.log(devices);
            this.isFetching = false;
            this.devices = devices;
          },
          error => {
            this.isFetching = false;
          }
        );
      } else {
        this.isFetching = false;
        document.getElementById("modalVerification").click();
      }
    });
  }
}
