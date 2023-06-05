package com.awscourse.service;

import com.amazonaws.services.sqs.AmazonSQSAsync;
import com.awscourse.domain.Order;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.aws.messaging.core.QueueMessageChannel;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

@Service
public class MessageSender {
    private static final Logger logger
            = LoggerFactory.getLogger(MessageSender.class);

    @Value("${sqs.queue.name}")
    private String queueName;
    private final AmazonSQSAsync amazonSqs;

    @Autowired
    public MessageSender(final AmazonSQSAsync amazonSQSAsync) {
        this.amazonSqs = amazonSQSAsync;
    }

    public boolean send(final Order order) throws JsonProcessingException {
        MessageChannel messageChannel
                = new QueueMessageChannel(amazonSqs, queueName);

        String orderJson =  new ObjectMapper().writer().withDefaultPrettyPrinter().writeValueAsString(order);

        Message<String> msg = MessageBuilder.withPayload(orderJson)
                .setHeader("sender", "order-service")
                .build();

        long waitTimeoutMillis = 5000;
        boolean sentStatus = messageChannel.send(msg,waitTimeoutMillis);

        logger.info("Order placed into the queue.");
        return sentStatus;
    }
}
