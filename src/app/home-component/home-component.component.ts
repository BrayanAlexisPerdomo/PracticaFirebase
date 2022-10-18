import { Component, OnInit } from '@angular/core';

import { CrudService } from '../service/crud.service';

import { Personas } from '../interface/personas.interface'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {
  title = 'crud2';

  personas:Personas[]=[];


  rol:string="";
  name:string="";

  studentName:string="";
  studentAge:number=0;
  studentAddress:string="";

  students:any;

  constructor(private router:Router,private route:ActivatedRoute,private crudService:CrudService){}

  ngOnInit(){
    this.rol=this.route.snapshot.params['rol'];
    this.name=this.route.snapshot.params['nombre'];

    this.crudService.read_student().subscribe(data =>{
      this.students=data.map(e=>{
        return{
          id:e.payload.doc.id,
          data:e.payload.doc.data()
        };
      })
    })
  }

  salir(){
    this.router.navigate(['login']);
  }

  createRecord(){
    let record={
      Name:this.studentName,
      Age:this.studentAge,
      Address:this.studentAddress
    };
    this.crudService.create_new_student(record).then(resp=>{
        this.studentName="";
        this.studentAge=0;
        this.studentAddress="";
        console.log(resp);
    }).catch(error=>{
        console.log(error);
    });
  }

  removeRecord(id:string){
    this.crudService.delete_student(id);
  }

  updateRecord(id: any) {
    let record = {
      Name: this.studentName,
      Age: this.studentAge,
      Address: this.studentAddress
    };
    this.crudService.update_student(id, record).then(resp => {
      this.studentName = "";
      this.studentAge = 0;
      this.studentAddress = "";
      console.log(resp);
    }).catch(error => {
      console.log(error);
    });
  }
}
