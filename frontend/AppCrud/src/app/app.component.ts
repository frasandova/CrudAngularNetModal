import { Component, OnInit } from '@angular/core';
import { PacientesService } from './services/pacientes.service';
// import {ModalModule} from "ngx-modal";
// import { NgForm } from '@angular/forms';
import {Paciente} from './services/paciente';

import swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AppCrud';

  // paciente: Paciente = {
  //  id: 100,
  //  nombre: null,
  //  apellido: null,
  //  fecha_nacimiento: null,
  //  peso: 70,
  //  estatura: 1.71

  // };

  listadoPacientes: Paciente[];
  public pacienteSeleccionado: Paciente;  
  nuevoPaciente: Paciente = {
    id: 0,
    nombre: null,
    apellido: null,
    fecha_nacimiento: new Date(),
    peso: null,
    estatura: null
 
   };


  constructor(private servicePacientes: PacientesService){}

  ngOnInit(){

    this.getPacientes();
  
    this.servicePacientes.notificarNuevoPaciente.subscribe(nuevoPaciente =>{

       this.getPacientes();
      // console.log('nuevoPaciente recibido');
      // console.log(nuevoPaciente);

      // this.listadoPacientes.push(nuevoPaciente);

      // console.log('listadoPacientes');
      // console.log(this.listadoPacientes);


      
    })
  }

  eliminar(paciente: Paciente):void{
    
    swal({
      title: 'Está Seguro?',
      text: `¿Seguro que desea eliminar el paciente ${paciente.nombre} ${paciente.apellido} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling:false,
      reverseButtons:true
    }).then((result) =>{
      if (result.value) {

        this.servicePacientes.deletePaciente(paciente.id).subscribe(
          (data:any)=>{   
            this.listadoPacientes= this.listadoPacientes.filter(pac => pac!== paciente);
            swal(
              'Cliente Eliminado!',
              `Cliente ${paciente.nombre} ${paciente.apellido} eliminado con éxito!`,
              'success'
            )
            this.getPacientes();
            return data;
          }
        );


      }
    })

    // this.servicePacientes.deletePaciente(paciente.id).subscribe(
    //   (data:any)=>{
        
    //     this.getPacientes();
    //     return data;
    //   }
    // );
  }

  editar(){
    swal(  'Mensaje swal alert',  'Yes yes si si si',  'success');
  }


  getPacientes(){
    this.servicePacientes.getPacientes().subscribe(
      (data: Paciente[])=>{
       console.log('ListadoPacientes', data);
       this.listadoPacientes = data;
      //  this.servicePacientes.listadoPacientesService= data;
      },
      err=>{
        console.log('Error:', err);
      });
  }

  // savePaciente(forma: NgForm){


  //     console.log('this.paciente');
  //     console.log(this.paciente);

  //    this.servicePacientes.savePaciente(this.paciente).subscribe(
  //      (data:any)=>{
  //       console.log('dataResponse');
  //       console.log(data);
  //      })

  // }

  ShowModal(paciente:Paciente){
    console.log('pacienteSeleccionado', paciente);
    console.log( paciente.fecha_nacimiento);
    this.pacienteSeleccionado= paciente;
    this.servicePacientes.funShowModal();
  }

}


