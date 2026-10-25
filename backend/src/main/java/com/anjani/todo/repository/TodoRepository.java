package com.anjani.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.anjani.todo.entity.Todo;


public interface TodoRepository extends JpaRepository<Todo, Long> {
    
}
