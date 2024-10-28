import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticatorService } from './../../Servicios/authenticator.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  username = '';
  userProfile = {
    nombre: '',
    apellidos: '',
    edad: null,
    nivelEducacional: '',
    fechaNacimiento: ''
  };

  constructor(
    private router: Router,
    private auth: AuthenticatorService,
    private toastController: ToastController
  ) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      username: string;
    };
    this.username = state?.username || '';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }

  async guardarDatos() {
    // Validar que todos los campos estén completos
    if (
      this.userProfile.nombre &&
      this.userProfile.apellidos &&
      this.userProfile.edad &&
      this.userProfile.nivelEducacional &&
      this.userProfile.fechaNacimiento
    ) {
      const toast = await this.toastController.create({
        message: 'Datos guardados correctamente.',
        duration: 3000,
        position: 'bottom',
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: 'Por favor, complete todos los campos antes de guardar.',
        duration: 3000,
        position: 'bottom',
        color: 'danger', // Color de alerta para indicar un error
      });
      toast.present();
    }
  }

  ngOnInit() {}
}
