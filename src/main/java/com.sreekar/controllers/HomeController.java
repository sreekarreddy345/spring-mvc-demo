package com.sreekar.controllers;


import com.sreekar.beans.User;
import com.sreekar.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {

    @Autowired
    private UserService userService;

    public HomeController() {
        System.out.println("HomeController");
    }

 /*   //    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String helloWorld() {
        System.out.println("Books home page");
        return "redirect:/books";
    }*/

    @RequestMapping(value = "/pagelogin", method = RequestMethod.GET)
    public String home(@ModelAttribute("user") User u) {
        System.out.println("login() - " + u);
        return "home";
    }

    @RequestMapping(value = "/homelogin", method = RequestMethod.GET)
    public String homePage(@ModelAttribute("user") User u) {
        System.out.println("login() - " + u);
        return "redirect:/home";
    }
}
