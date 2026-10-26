
package com.anjani.todo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.anjani.todo.dto.CreateTodoRequest;
import com.anjani.todo.dto.TodoResponse;
import com.anjani.todo.service.TodoService;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TodoResponse createTodo(
            @Valid @RequestBody CreateTodoRequest request) {
        return todoService.createTodo(request);
    }

    @GetMapping 
    @ResponseStatus (HttpStatus.OK)
    public List<TodoResponse> getAllTodos() {
        return todoService.getAllTodos();
    }

    @GetMapping("/{id}")
    @ResponseStatus (HttpStatus.OK)
    public TodoResponse getTodoById(@PathVariable Long id) {
        return todoService.getTodoById(id);
    }

}
