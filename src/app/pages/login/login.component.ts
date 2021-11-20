import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from '../../models/usuario.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario : UsuarioModel = new UsuarioModel();

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  login( form: NgForm){

    if(form.invalid){
      return;
    }

    Swal.fire({
      title: 'Por favor Espere !',
      html: 'Cargando ...',// add html attribute if you want or remove
      allowOutsideClick: false,
      onBeforeOpen: () => {
          Swal.showLoading()
      },
    });

    // Swal.fire('Saved!', '', 'success')

    this.auth.login( this.usuario )
      .subscribe(resp =>{

        console.log(resp);
        Swal.close();
        this.router.navigateByUrl('/home');

      }, (err) =>{
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error!',// add html attribute if you want or remove
          allowOutsideClick: true,
        });
      })

    console.log(this.usuario);

  }
}
