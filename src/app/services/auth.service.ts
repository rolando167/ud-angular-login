import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8000/api/usuarios';

  private apiKey = 'AIzPOLDSI-5457DS72vs78tyopZZ';

  // 127.0.0.1:8000/api/usuarios/register
  // 127.0.0.1:8000/api/usuarios/login

  constructor(private http: HttpClient) { }

  logout(){

  }

  login( usuario: UsuarioModel){

  }

  nuevoUsuario( usuario: UsuarioModel){
    const authData = { // ...usuario,
      name: usuario.nombre,
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }/register?key=[${this.apiKey}]`,
      authData
    );

  }

}
