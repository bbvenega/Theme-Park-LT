//HomeController class is created to handle the home page request. It is mapped to the root URL of the application. The home() method returns the index.html page.

package com.brianvenegas.tp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    
 @GetMapping("/")
    public String home(){
        return "index";
    }
}