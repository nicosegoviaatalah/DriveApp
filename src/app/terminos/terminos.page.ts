import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.page.html',
  styleUrls: ['./terminos.page.scss'],
})
export class TerminosPage {
  acepto: boolean = false;

  constructor(private router: Router, private toastController: ToastController) {}

  // Función para manejar la aceptación de los términos
  async aceptarTerminos() {
    if (this.acepto) {
      const toast = await this.toastController.create({
        message: '¡Gracias por aceptar los términos y condiciones!',
        duration: 3000,
        position: 'bottom',
      });
      toast.present();
      this.router.navigate(['/home']);
    } else {
      const toast = await this.toastController.create({
        message: 'Debes aceptar los términos y condiciones para continuar.',
        duration: 3000,
        position: 'bottom',
      });
      toast.present();
    }
  }
}
