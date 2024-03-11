import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
interface TodoResponse {
    todos:String[],
}
@Injectable({
    providedIn:'root',
})
export class TodoService {
    
    constructor(private http:HttpClient) {}

    createATodo(data:any) {
        return this.http.post("http://localhost:8001/api/create-todo",data);
    }
    
    getAllTodos(): Observable<TodoResponse> {
        return this.http.get<TodoResponse>("http://localhost:8001/api/todos");
    }

    getATodo(searchText:any) {
        return this.http.get(`http://localhost:8001/api/todo?searchText=${searchText}`);
    }

    updateATodo(todoId:any,data:any) {
        return this.http.put(`http://localhost:8001/api/todo/${todoId}`,data);
        // http://localhost:8001/api/todo/65eaeb1c2d4efc91fdbbbf0e
    }

    deleteATodo(todoId:any) {
        return this.http.delete(`http://localhost:8001/api/delete-todo/${todoId}`);
    }
}