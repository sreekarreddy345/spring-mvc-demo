package com.sreekar.controllers;


import com.sreekar.beans.Books;
import com.sreekar.services.BooksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping(value = "/books")
public class BooksController {

    @Autowired
    private BooksService booksService;

    public BooksController() {
        System.out.println("This is Books Controller");
    }

    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView getBooks() {
        System.out.println("getBooks()");
        ModelAndView modelAndView = new ModelAndView();
        List<Books> booksList = booksService.getBooks();
        modelAndView.addObject("blist", booksList);
//        /WEB-INF/jsp/bookaHome.jsp
        modelAndView.setViewName("booksHome");
        return modelAndView;
    }

    @RequestMapping(value = "/addBooks", method = RequestMethod.GET)
    public ModelAndView addBooks() {
        System.out.println("addBooks()");
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("addBooks");
        return modelAndView;
    }

    @RequestMapping(value = "/saveBooks", method = RequestMethod.POST)
    public String saveBooks(HttpServletRequest request) {
        System.out.println("saveBooks()");
        Books books = new Books();
        books.setBookName(request.getParameter("bookname"));
        books.setAuthorName(request.getParameter("authname"));
        books.setSubject(request.getParameter("subjname"));
        booksService.saveBooks(books);
        return "redirect:/books";
    }
}
