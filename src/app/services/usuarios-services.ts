import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable ({
    providedIn: 'root'
})
export class UsuarioServices{
    private url: string;

    constructor(
        private _http: HttpClient

    ){
        this.url = "http://localhost:3307/colaboradores"
    }

    // Obtener todos los usuarios
    todos():Observable<any>{
        const headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url,{headers: headers})
    }

    // eliminar usuario
    eliminar(id:string):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'/'+id,{headers: headers})
    }

    // Actualizar un usuario
    actualizar(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url, data, { headers: headers }); 
  }
    //agregar usuario
    agregar(data:any):Observable<any>{
        const headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'/',JSON.stringify(data),{headers: headers});
        
    }


}
