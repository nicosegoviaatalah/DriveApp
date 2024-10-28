import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticatorService } from 'src/app/Servicios/authenticator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = {
    username: '',
    email: '',
    password: '',
  };

  aceptaTerminos = false; // Variable para controlar el estado del checkbox

  constructor(
    private auth: AuthenticatorService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  // Método para validar el formato del email
  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Método para validar si los campos están llenos y correctos
  async registrar() {
    if (!this.user.username || !this.user.email || !this.user.password) {
      const toast = await this.toastController.create({
        message: 'Todos los campos son obligatorios',
        duration: 3000,
        position: 'bottom',
      });
      toast.present();
      return;
    }

    if (!this.validateEmail(this.user.email)) {
      const toast = await this.toastController.create({
        message: 'Por favor, ingresa un correo electrónico válido',
        duration: 3000,
        position: 'bottom',
      });
      toast.present();
      return;
    }

    // Verificar si se han aceptado los términos y condiciones
    if (!this.aceptaTerminos) {
      const toast = await this.toastController.create({
        message: 'Debes aceptar los términos y condiciones para continuar',
        duration: 3000,
        position: 'bottom',
      });
      toast.present();
      return;
    }

    this.auth
      .registrar(this.user)
      .then((res) => {
        this.router.navigate(['/home']);
        return this.toastController.create({
          message: 'Registro exitoso',
          duration: 5000,
          position: 'bottom',
        });
      })
      .then((toast) => toast.present())
      .catch((error) => {
        return this.toastController
          .create({
            message: 'Error al registrar',
            duration: 5000,
            position: 'bottom',
          })
          .then((toast) => toast.present());
      });
  }
}
