package com.sreekar.controllers;


import com.sreekar.beans.User;
import com.sreekar.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class LoginController {

    @Autowired
    private UserService userService;


    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView loginPage() {
        System.out.println("LoginPage");
        ModelAndView modelAndView = new ModelAndView();
        User user = new User();
//        user.setUsername("sreekar");
        modelAndView.addObject("user", user);
        modelAndView.setViewName("login");
        return modelAndView;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(@ModelAttribute("user") User user, HttpServletRequest request) {

        System.out.println("login() - " + user);
        String userName = user.getUserName();
        User userDetails = null;

        try {
            userDetails = userService.getUser(userName);
        } catch (Exception e) {
            System.out.println("Incorrect username");
        }
        System.out.println("user - " + userDetails + ", userDetails - " + user);

        if (userDetails != null && userDetails.getPassword().equals(user.getPassword())) {
            System.out.println("Going to Students page");
            HttpSession session = request.getSession();
            session.setAttribute("user", userDetails);
//            return "redirect:/students";
            return "home";
        } else {
            System.out.println("Username/password wrong, Going back to Login page");
            return "login";
        }
    }

}
