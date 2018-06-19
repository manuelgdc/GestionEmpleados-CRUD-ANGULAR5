import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../servicios/producto.service';
import { Producto } from '../../../modelos/producto';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listaproductos',
  templateUrl: './listaproductos.component.html',
  styleUrls: ['./listaproductos.component.css']
})
export class ListaproductosComponent implements OnInit {

  productLista: Producto[];

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.productoService.getProductos()
        .snapshotChanges()
        .subscribe(item => {
        this.productLista=[];
        item.forEach(element => {
          let x=element.payload.toJSON();
          x["$key"]=element.key;
          this.productLista.push(x as Producto);
        });
    });
  }

  onEdit(producto: Producto){
    this.productoService.selectProductos=Object.assign({},producto);
  }

  onDelete($key: string){
    if(confirm('Are you sure you want to delete it?')) {
    this.productoService.deleteProductos($key);
    this.toastr.warning('Deleted Successfully', 'Product Removed');
    }
  }

}
