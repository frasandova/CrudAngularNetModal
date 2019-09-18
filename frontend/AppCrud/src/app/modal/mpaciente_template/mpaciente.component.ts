import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms'; // Validación por template
import { FormGroup, FormControl, Validator } from '@angular/forms'; // Validación por data
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from 'src/app/services/paciente';
import swal from 'sweetalert2';

@Component({
  selector: 'app-mpaciente',
  templateUrl: './mpaciente.component.html',
  styleUrls: ['./mpaciente.component.css']
})
export class MpacienteComponent implements OnInit {

  forma:FormGroup;

  // paciente: Paciente = {
  //   id: 0,
  //   nombre: null,
  //   apellido: null,
  //   fecha_nacimiento: null,
  //   peso: null,
  //   estatura: null
 
  //  };

  // nuevoPaciente: Paciente;
  @Input() paciente: Paciente;

  constructor(private servicePacientes:PacientesService) { }

  ngOnInit() {
    // console.log('ngOnInit');
    // if(!this.paciente){
    //   console.log('hola');
    //     this.paciente= this.nuevoPaciente;
    // }else{
    //   console.log('chao ');
    // }
  }


  savePaciente(forma: NgForm){

   if(this.paciente.id==0){  
   this.servicePacientes.savePaciente(this.paciente).subscribe(
     (data:any)=>{
       this.servicePacientes.notificarNuevoPaciente.emit(this.paciente);  
       swal(
        'Cliente Guardado!',
        `Cliente ${this.paciente.nombre} ${this.paciente.apellido} guardado con éxito!`,
        'success'
      );
      this.HideModal();
     })

    }
    else{
      this.servicePacientes.updatePaciente(this.paciente).subscribe(
        (data:any)=>{

          this.servicePacientes.notificarNuevoPaciente.emit(this.paciente);     
          swal(
            'Cliente Actualizado!',
            `Cliente ${this.paciente.nombre} ${this.paciente.apellido} actualizado con éxito!`,
            'success'
          );
          this.HideModal();
        
        })
    }

}

// getPacientes(){
//   this.servicePacientes.getPacientes().subscribe(
//     (data: Paciente[])=>{     
    
//      this.servicePacientes.listadoPacientesService= data;
//     },
//     err=>{
//       console.log('Error:', err);
//     });
// }

HideModal(){
  console.log('hide');
  this.servicePacientes.funHideModal();
  // this.paciente.id = 0;
  // this.paciente.nombre = null;
  // this.paciente.apellido = null;
  // this.paciente.estatura = null;
  // this.paciente.peso=null;
  // this.paciente.fecha_nacimiento = null;
}

}
