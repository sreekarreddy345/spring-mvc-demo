package com.sreekar.controllers;

import com.sreekar.beans.Students;
import com.sreekar.services.StudentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping(value = "/students")
public class StudentController {

    @Autowired
    private StudentsService studentsService;

    public StudentController() {
        System.out.println("This is Student Controller");
    }

    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView getStudents() {
        System.out.println("getStudents");
        ModelAndView modelAndView = new ModelAndView();
        List<Students> studentsList = studentsService.getStudents();
        modelAndView.addObject("slist", studentsList);
        modelAndView.setViewName("studentsHome");
        return modelAndView;
    }

    @RequestMapping(value = "/addStudents", method = RequestMethod.GET)
    public ModelAndView addStudents() {
        Students s = new Students();
        System.out.println("addStudents");
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("student", s);
        modelAndView.setViewName("addStudents");
        return modelAndView;
    }

    @RequestMapping(value = "/saveStudents", method = RequestMethod.POST)
    public String saveStudents(@ModelAttribute("student") Students st) {
        System.out.println("saveStudents()");

        studentsService.saveStudents(st);

        return "redirect:/students";
    }


}
