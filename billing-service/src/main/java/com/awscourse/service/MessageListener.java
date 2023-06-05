package com.awscourse.service;

import com.awscourse.domain.Order;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.aws.messaging.listener.SqsMessageDeletionPolicy;
import org.springframework.cloud.aws.messaging.listener.annotation.SqsListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Service;

@Slf4j
//@Service
public class MessageListener {

    private static final String QUEUE_URL
            = "SQS-Stack-SQSQueue-1bIgfVAjRzpg";

    @SqsListener( value = QUEUE_URL, deletionPolicy = SqsMessageDeletionPolicy.ON_SUCCESS)
    public void receiveMessage(Order order,
                               @Header("SenderId") String senderId) {
        System.out.println("Received: " + order);
        log.info("message received {} {}",senderId,order);
    }
}
