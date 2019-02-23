import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InforPagina } from '../interface/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  
  info: InforPagina = {};
  cargada = false;
  equipo: any[] = [];

  constructor( private http: HttpClient ) { 
    console.log('Servicio de infoPagina CARGADO');
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    //Leer el archivo JSON
    this.http.get('assets/data/data-pagina.json').
      subscribe( (resp: InforPagina) => {
        this.cargada = true;
        this.info = resp;
        //console.log(resp);
      });
  }

  private cargarEquipo(){
    //Leer JSON del servicio de FIREBASE
    this.http.get('https://angular-html-7caf1.firebaseio.com/equipo.json')
      .subscribe((resp: any) => {
        this.equipo = resp;
        //console.log(resp);
      });
  }
}
