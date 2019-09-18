import { Injectable, EventEmitter } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { map,catchError  } from 'rxjs/operators';
import { Paciente } from './paciente';
import { asTextData } from '@angular/core/src/view';
import { Observable, throwError, of  } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  showModal: boolean = false;
  // listadoPacientesService: Paciente[];

  private _notificarNuevoPaciente =  new EventEmitter<any>()

  constructor(private http: HttpClient) { 
 
  }

  get notificarNuevoPaciente():EventEmitter<any>{
    return this._notificarNuevoPaciente;
  }

  //http://localhost:50379/api/pacientes
   getPacientes():Observable<Paciente[]>{
    return this.http.get('http://localhost:50379/api/pacientes').pipe(
      map(response=> response as Paciente[])
    );
    // return this.http.get('http://localhost:50379/api/pacientes');
  }

savePaciente(pacientes:Paciente){        
  return this.http.post('http://localhost:50379/api/Pacientes', pacientes = pacientes, {
    headers: this.httpHeaders
  });
}

// updatePaciente(pacientes:Paciente){        
//   return this.http.put('http://localhost:50379/api/Pacientes', pacientes = pacientes, {
//     headers: this.httpHeaders
//   });
// }

updatePaciente(pacientes:Paciente):Observable<Paciente>{        
  return this.http.put<Paciente>('http://localhost:50379/api/Pacientes', pacientes = pacientes, {headers: this.httpHeaders}).pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      return throwError(e);
      })
    );
  }

  // http://localhost:50379/api/Pacientes/5
  deletePaciente(id:number):Observable<any>{    
    return this.http.delete('http://localhost:50379/api/pacientes/' + id, {headers:this.httpHeaders});            
  }

  // deletePaciente(id:number){    
  //   return this.http.delete('http://localhost:50379/api/pacientes/' + id);            
  // }

  funShowModal(){
    
    this.showModal = true;
  }
  funHideModal(){
    console.log('hideModal');
    this.showModal = false;
    console.log(this.showModal);
  }

}
