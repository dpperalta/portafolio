import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interface/producto.interface';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productoFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) { 
    this.cargarProductos();
  }

  private cargarProductos(){

    return new Promise( ( resolve, reject ) => {
        this.http.get('https://angular-html-7caf1.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
      });
  }

  getProducto( id: string ){
    return this.http.get(`https://angular-html-7caf1.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string){

    if(this.productos.length === 0){
      //Cargar Productos
      this.cargarProductos().then( () => {
        //Ejecutar después de Obtener Productos
        //Aplicar filtro
        this.filtrarProductos( termino );
      });
    }else{
      //Aplicar filtro
      this.filtrarProductos( termino );
    }

    // this.productoFiltrado = this.productos.filter( producto => {
    //   return true;
    // });
    // console.log(this.productoFiltrado);
  }

  private filtrarProductos( termino: string ){
    //console.log( this.productos );
    this.productoFiltrado = [];
    
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {
      
      const tituloLower = prod.titulo.toLocaleLowerCase();

      if( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ){
        this.productoFiltrado.push( prod );
      }
    });
  }
}
