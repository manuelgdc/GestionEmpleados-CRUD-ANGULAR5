import { Injectable } from '@angular/core';

import{AngularFireDatabase,AngularFireList} from 'angularfire2/database';

import{Producto} from '../modelos/producto';

@Injectable()
export class ProductoService {

  ListaProductos: AngularFireList<any>;
  selectProductos: Producto=new Producto();

  constructor(private firebase: AngularFireDatabase) { }

  getProductos(){
    return this.ListaProductos=this.firebase.list('productos');
  }

  insertProductos(producto: Producto){
    this.ListaProductos.push({
      nombre: producto.nombre,
      categoria: producto.categoria,
      localizacion: producto.categoria,
      precio: producto.precio,

    });
  }
  updateProductos(producto: Producto){
    this.ListaProductos.update(producto.$key, {
      nombre: producto.nombre,
      categoria: producto.categoria,
      localizacion: producto.categoria,
      precio: producto.precio
    });
  }

  deleteProductos($key:string){
    this.ListaProductos.remove($key);
  }


}
