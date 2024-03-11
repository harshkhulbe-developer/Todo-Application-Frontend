import { Component, ElementRef, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{
  
  constructor(private service: TodoService) {}
  newTodo:String = '';
  todos:any[] = [];
  searchText:String = '';
  editClicked:boolean[] = [];
  editedValues: string[] = [];
  updatedValue:String = '';

  ngOnInit(): void {
    this.loadTodos();
  }

  onEditClicked(i:number) {
    this.editClicked[i] = !this.editClicked[i];
    this.editedValues[i] = this.todos[i].todoInput;
  }

  onSaveClicked(i:number,todoId:any) {
    this.editClicked[i] = false;
    this.updateTodo(todoId,this.editedValues[i]);
  }

  onCancelClicked(i:number) {
    this.editClicked[i] = false;
    this.editedValues[i] = this.todos[i].todoInput;
  }

  loadTodos() {
    this.service.getAllTodos().subscribe(
      (response) => {
        this.todos = response.todos;
        this.editClicked = Array<boolean>(this.todos.length).fill(false);
        this.editedValues = Array<string>(this.todos.length).fill('');
      },
      (error) => {
        console.log("Error while getting all the todos",error);
      }
    )
  }

  addTodo() {
    const todoData = {
      todoInput:this.newTodo,
    }
    this.service.createATodo(todoData).subscribe(
      (response:any) => {
      if(response.message=="Todo created successfully"){
        this.loadTodos();
        this.newTodo = '';
      }
    },
    (error) => {
      console.log("Error while creating a todo ",error);
    })
    
  }

  searchTodo(searchText:any) {
    this.searchText = this.searchText.trim().toLowerCase();

    this.service.getATodo(searchText).subscribe((response:any) => {
      console.log(response);
      this.todos = response.todo;
      if(searchText === '') {
        this.loadTodos();
      }
    },(error) => {  
      console.log("Error while searching a todo: ",error);
    })
  }

  updateTodo(todoId:any,updatedValue:any) {
    const data = {
      todoInput:updatedValue,
    }
    this.service.updateATodo(todoId,data).subscribe((response:any) => {
      this.loadTodos();
    },(error) => {
      console.log(error);
    })
  }



  deleteTodo(todoId:any) {
    this.service.deleteATodo(todoId).subscribe((response) => {
      console.log(response);
      this.loadTodos();

    },(error) => {
      console.log("Error whiel deleting a todo: ",error);
    })
  }
}


