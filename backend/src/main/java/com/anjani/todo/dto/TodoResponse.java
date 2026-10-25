
package com.anjani.todo.dto;

import java.time.OffsetDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TodoResponse {

    private Long id;
    private String title;
    private String description;
    private Integer progress;
    private Integer priority;
    private Boolean isActive;
    private String taskCategory;
    private OffsetDateTime createdAt;
    private OffsetDateTime completedAt;
    private OffsetDateTime dueTime;
}
