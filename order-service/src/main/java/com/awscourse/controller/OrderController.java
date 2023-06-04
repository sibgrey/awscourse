package com.awscourse.controller;

import com.awscourse.domain.Order;
import com.awscourse.service.MessageSender;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/orders")
@RestController
public class OrderController {

    private final MessageSender messageSender;

    public OrderController(MessageSender messageSender) {
        this.messageSender = messageSender;
    }

    @PostMapping
    public String createOrder(@RequestBody Order order) throws JsonProcessingException {
        messageSender.send(order);
        System.out.println(order);
        return "Your order is processing please wait.";
    }
}
