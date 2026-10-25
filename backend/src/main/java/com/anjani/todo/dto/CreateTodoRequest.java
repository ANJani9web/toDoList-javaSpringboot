package com.anjani.todo.dto;

import java.time.OffsetDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTodoRequest {

    @NotBlank(message = "Title cannot be blank")
    private String title;

    private String description;

    @NotNull(message = "Priority cannot be null")
    private Integer priority;

    @NotBlank(message = "TaskCategory cannot be blank")
    private String taskCategory;

    @NotNull(message = "DueTime cannot be null")
    private OffsetDateTime dueTime;

}
