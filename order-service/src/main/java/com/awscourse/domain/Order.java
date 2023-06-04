package com.awscourse.domain;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class Order {

    @NotNull
    private String name;

    private String description;

    @NotNull
    private int amount;
}
