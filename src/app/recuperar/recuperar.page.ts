import { Component } from '@angular/core';
import { APIControllerService } from '../Servicios/apicontroller.service'; // Verifica la ruta del servicio
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  email: string = '';
  mensaje: string = '';

  constructor(private apiService: APIControllerService, private toastController: ToastController) {}

  async sendRecovery() {
    if (!this.email) {
      const toast = await this.toastController.create({
        message: 'Por favor, ingresa tu correo electrónico',
        duration: 3000,
        position: 'bottom',
      });
      toast.present();
      return;
    }

    this.apiService.postPasswordRecovery(this.email).subscribe(
      async (res) => {
        this.mensaje = 'Revisa tu correo para restablecer tu contraseña';
        const toast = await this.toastController.create({
          message: this.mensaje,
          duration: 3000,
          position: 'bottom',
        });
        toast.present();
      },
      async (error) => {
        this.mensaje = 'Hubo un error, intenta nuevamente';
        const toast = await this.toastController.create({
          message: this.mensaje,
          duration: 3000,
          position: 'bottom',
        });
        toast.present();
      }
    );
  }
}
