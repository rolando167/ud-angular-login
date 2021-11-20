import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor( private auth: AuthService,
                private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();

    // this.usuario.email = 'rolando167@hotmail.com';
  }

  onSubmit( form: NgForm){
    if(form.invalid){
      console.warn('Formulario Invalido!!');
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

    this.auth.nuevoUsuario(this.usuario)
      .subscribe( resp=>{
        console.log(resp);
        Swal.close();

        this.router.navigateByUrl('/home');

    }, (err) =>{
      console.log(err.error.error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error!',// add html attribute if you want or remove
        allowOutsideClick: true,
      });
    });
    // console.log(this.usuario);
    // console.log(form);
  }

}
