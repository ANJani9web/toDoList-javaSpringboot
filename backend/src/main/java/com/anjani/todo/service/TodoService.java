package com.anjani.todo.service;

import java.time.OffsetDateTime;

import org.springframework.stereotype.Service;

import com.anjani.todo.entity.Todo;
import com.anjani.todo.repository.TodoRepository;

@Service 
public class TodoService {
    
    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public Todo createTodo(Todo todo){

        if(todo.getTitle() == null || todo.getTitle().isBlank()) {
            throw new IllegalArgumentException("Title cannot be null or empty");
        }


        if(todo.getPriority() == null) {
            throw new IllegalArgumentException("Priority cannot be null");
        }

        if(todo.getCreatedAt() == null) {
            todo.setCreatedAt(OffsetDateTime.now());
        }
        
        if(todo.getTaskCategory() == null || todo.getTaskCategory().isBlank()) {
            throw new IllegalArgumentException("TaskCategory cannot be null or empty");
        }

        if(todo.getDueTime() == null) {
            throw new IllegalArgumentException("DueTime cannot be null");
        }

        return todoRepository.save(todo);
    }
}
