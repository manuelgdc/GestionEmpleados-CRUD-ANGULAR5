import { Component, OnInit } from '@angular/core';
import{ ProductoService } from '../../../servicios/producto.service';
import { NgForm } from '@angular/forms';
import { Producto } from '../../../modelos/producto';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(
    private productoService: ProductoService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.productoService.getProductos();
    this.resetForm();

  }

  onSubmit(productoForm:NgForm){
    if(productoForm.value.$key==null)
    this.productoService.insertProductos(productoForm.value);
    else
    this.productoService.updateProductos(productoForm.value);

   
    this.resetForm(productoForm);
    this.toastrService.success('Sucessful ', 'Producto registrado');
  }

  resetForm(productoForm?:NgForm){
    if(productoForm != null){
      productoForm.reset();
      this.productoService.selectProductos=new Producto();
    }
  }
}
