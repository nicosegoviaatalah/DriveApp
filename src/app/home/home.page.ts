import { AuthenticatorService } from './../Servicios/authenticator.service';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  /* JSON */
  user = {
    username: '',
    password: '',
  };
 
  mensaje = '';

  spinner = false;

  constructor(
    private router: Router,
    private animationController: AnimationController,
    private auth: AuthenticatorService
  ) {}
  ngAfterContentInit() {
    this.animarLogin();
  }
  animarLogin() {
    const loginIcon = document.querySelector('.login img') as HTMLElement;
  
    /* animación */
    const animacion = this.animationController
      .create()
      .addElement(loginIcon)
      .duration(2000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'translateX(0px)', opacity: '0' },
      ]);
  
    animacion.play();
  }
  

  cambiarSpinner() {
    this.spinner = !this.spinner;
  }
  validar() {
    this.auth
      .loginBDD(this.user.username, this.user.password)
      .then((res) => {
        this.mensaje = 'Conexion exitosa';
        let navigationExtras: NavigationExtras = {
          state: {
            username: this.user.username,
            password: this.user.password,
          },
        };
        this.cambiarSpinner();
        setTimeout(() => {
          this.router.navigate(['/perfil'], navigationExtras);
          this.cambiarSpinner();
          this.mensaje = '';
        }, 3000);
      })
      .catch((error) => {
        this.mensaje = 'Error en credencial';
      });
  }
}
