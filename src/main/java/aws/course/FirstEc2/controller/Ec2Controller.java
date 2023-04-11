package aws.course.FirstEc2.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Ec2Controller {

    @GetMapping("/health")
    public String healthCheck(){
        return "Hello from EC2";
    }
}
