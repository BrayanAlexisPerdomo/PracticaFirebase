import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Personas } from './../interface/personas.interface';
import { Usuarios } from '../interface/usuarios';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { collection, query, where, getDocs } from "firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http:HttpClient, private fireStore:AngularFirestore) { }

  create_new_student(record:{}){
    return this.fireStore.collection('Student').add(record);
  }

  read_student(){
    return this.fireStore.collection('Student').snapshotChanges();
  }

  delete_student(id:String){
    return this.fireStore.doc('Student/'+id).delete();
  }

  update_student(id:String,record:{}){
    return this.fireStore.doc('Student/'+id).update(record);
  }

  async validate_user(correo:string,contra:string){
    
    let user_data={'name':'','rol':''};

    const users = collection(this.fireStore.firestore,"Users");
    const user = query(users, where("Correo", "==", correo),where("Contra", "==", contra));

    const querySnapshot = await getDocs(user);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      user_data.name=doc.data()['Name'];
      user_data.rol=doc.data()['Rol'];
    });
    return user_data;
  }
}
