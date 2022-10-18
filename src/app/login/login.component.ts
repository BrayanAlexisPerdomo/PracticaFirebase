import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from '../interface/usuarios';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  usuarios:Usuarios[]=[];

  correo:string="";
  contra:string="";
  
  
  

  constructor(private router:Router,private crudService:CrudService) { }

  ngOnInit(): void {
    
  }

  validate(){
      this.crudService.validate_user(this.correo,this.contra).then(usuarios=>{
      console.log(usuarios);
      if(usuarios['rol'] != ''){
        this.redirigir(usuarios['name'],usuarios['rol']);
      }else{
        window.alert('Las credenciales son incorrectas, intente nuevamente.');
      }
    });
  }
  
  redirigir(nombre:string,rol:string){
    this.router.navigate(['home',nombre,rol]);
  }
}
