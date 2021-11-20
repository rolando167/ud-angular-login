import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8000/api/usuarios';

  private apiKey = 'AIzPOLDSI-5457DS72vs78tyopZZ';

  userToken: string;

  // 127.0.0.1:8000/api/usuarios/register
  // 127.0.0.1:8000/api/usuarios/login

  constructor(private http: HttpClient) {
    this.leerToken();
   }

  logout(){

  }

  login( usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }/login?key=[${this.apiKey}]`,
      authData
    ).pipe(
      map(resp => {
        this.guardarToken( resp['access_token']);
        return resp;
      })
    );

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
    ).pipe(
      map(resp => {
        this.guardarToken( resp['access_token']);
        return resp;
      })
    );

  }

  private guardarToken( idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean{

    return this.userToken.length > 2;
  }

}
