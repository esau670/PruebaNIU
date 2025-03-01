import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { UsuarioServices } from './services/usuarios-services';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit{
  title = 'project';
  public showForm : boolean = false;
  public showTable : boolean = false;
  public usuarios : any[];
  public accion : string='Agregar'

  public idcolaborador: number=0;
  public nombre : string='';
  public apellido : string='';
  public direccion : string='';
  public edad : number=1;
  public profesion : string='';
  public estado_civil : string=''

      constructor(
          private _uServices: UsuarioServices

      ){
        this.usuarios = []
      }

  ngOnInit(): void {
  }

  obtener(){
    this._uServices.todos().subscribe(res => {
      console.log(res)
      this.usuarios=res.body;
      console.log(this.usuarios)
      },error=>{
        console.log('Error',error);
        alert('No se pudo obtener los usuarios')
      })
  }


  eliminar(id:string){
    this._uServices.eliminar(id).subscribe(res => {
      console.log(res)
      alert('Se elimino correctamente el usuario con id: '+id)
      this.usuarios=this.usuarios.filter((usuario: any) => usuario.IDCOLABORADOR != id)
      },error=>{
        console.log('Error',error);
        alert('Id no existe')
      })
    }


  editar(id: string) {
    this.accion = 'Editar'
    this.showTable = false;
    const usuario = this.usuarios.find((u) => u.IDCOLABORADOR === id);
    console.log(usuario);
    if (usuario) {
      this.idcolaborador = usuario.IDCOLABORADOR;
      this.nombre = usuario.NOMBRE;
      this.apellido = usuario.APELLIDO;
      this.direccion = usuario.DIRECCION;
      this.edad = usuario.EDAD;
      this.profesion = usuario.PROFESION;
      this.estado_civil = usuario.ESTADOCIVIL;
      this.showForm = true; 
    } else {
      alert('Usuario no encontrado');
    }
  }

  // Actualizar un usuario
  actualizar() {
    const data = {
      IDCOLABORADOR: this.idcolaborador,
      NOMBRE: this.nombre,
      APELLIDO: this.apellido,
      DIRECCION: this.direccion,
      EDAD: this.edad,
      PROFESION: this.profesion,
      ESTADOCIVIL: this.estado_civil,
    };

    this._uServices.actualizar(data).subscribe(
      (res) => {
        console.log(res);
        alert('Usuario actualizado correctamente');
        this.obtener(); 
        this.limpiarFormulario(); 
      },
      (error) => {
        console.log('Error', error);
        alert('Error al actualizar el usuario');
      }
    );
  }

  // Mostrar y ocultar el formulario
  mostrarFormulario() {
    this.showForm = !this.showForm;
    this.limpiarFormulario(); 
    this.showTable = false;
    this.accion = 'Agregar';
  }

  mostrar_tabla() {
    this.showTable = !this.showTable;
    this.obtener()    
  }


  agregar(data:any){

    this._uServices.agregar(data).subscribe(res => {
      console.log(res)
      alert('Se agrego correctamente el usuario')
      this.obtener();
      },error=>{
        console.log('Error',error);
        alert('Error al agregar')
      })
  }

    // Limpiar el formulario
    limpiarFormulario() {
      this.idcolaborador = 0; 
      this.nombre = '';
      this.apellido = '';
      this.direccion = '';
      this.edad = 1;
      this.profesion = '';
      this.estado_civil = '';
    }



    onSubmit(event: any) {
      event.preventDefault();
    
      const data = {
        IDCOLABORADOR: this.idcolaborador, 
        NOMBRE: this.nombre,
        APELLIDO: this.apellido,
        DIRECCION: this.direccion,
        EDAD: this.edad,
        PROFESION: this.profesion,
        ESTADOCIVIL: this.estado_civil,
      };
    
      if (this.idcolaborador) {
        this.actualizar();
      } else {
        this.agregar(data);
      }

    }

    mostrarNivelDeRiesgo(edad: number) {
      if (edad >= 18 && edad <= 25) {
        alert('Fuera de peligro!') ;
      } else if (edad >= 26 && edad <= 50) {
        alert('Tenga cuidado, tome todas las medidas de prevencion!');
      } else if (edad >= 51) {
        alert('Por favor quedese en casa!');
      } else {
        alert('Edad no válida');
      }
    }
  
  

}


