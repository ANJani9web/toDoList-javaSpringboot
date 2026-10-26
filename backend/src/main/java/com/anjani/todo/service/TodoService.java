package com.anjani.todo.service;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.anjani.todo.entity.Todo;
import com.anjani.todo.repository.TodoRepository;
import com.anjani.todo.dto.CreateTodoRequest;
import com.anjani.todo.dto.TodoResponse;

@Service 
public class TodoService {
    
    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Transactional 
    public TodoResponse createTodo(CreateTodoRequest request){

        if(request.getTitle() == null || request.getTitle().isBlank()) {
            throw new IllegalArgumentException("Title cannot be null or empty");
        }

        if(request.getPriority() == null) {
            throw new IllegalArgumentException("Priority cannot be null");
        }

        // if(request.getCreatedAt() == null) {
        //     request.setCreatedAt(OffsetDateTime.now());
        // }
        
        if(request.getTaskCategory() == null || request.getTaskCategory().isBlank()) {
            throw new IllegalArgumentException("TaskCategory cannot be null or empty");
        }

        if(request.getDueTime() == null) {
            throw new IllegalArgumentException("DueTime cannot be null");
        }

        Todo todo = new Todo();
        todo.setTitle(request.getTitle());
        todo.setDescription(request.getDescription());
        todo.setPriority(request.getPriority());
        todo.setCreatedAt(OffsetDateTime.now());
        todo.setTaskCategory(request.getTaskCategory());
        todo.setDueTime(request.getDueTime());

        Todo savedTodo = todoRepository.save(todo);

        return toResponse(savedTodo);
    }
    
    @Transactional(readOnly = true)
    public TodoResponse getTodoById(Long id) {
        // Implementation for retrieving a todo by its ID
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found"));
        return toResponse(todo);
    }

    @Transactional(readOnly = true)
    public List<TodoResponse> getAllTodos() {
        // Implementation for retrieving all todos
        List<Todo> todos = todoRepository.findAll();
        List<TodoResponse> responses = new ArrayList<>();
        for (Todo todo : todos) {
            responses.add(toResponse(todo));  
        }
        return responses;

    }


private TodoResponse toResponse(Todo todo) {
    TodoResponse response = new TodoResponse();
    response.setId(todo.getId());
    response.setTitle(todo.getTitle());
    response.setDescription(todo.getDescription());
    response.setProgress(todo.getProgress());
    response.setPriority(todo.getPriority());
    response.setIsActive(todo.getIsActive());
    response.setTaskCategory(todo.getTaskCategory());
    response.setCreatedAt(todo.getCreatedAt());
    response.setCompletedAt(todo.getCompletedAt());
    response.setDueTime(todo.getDueTime());

    return response;
}

}
