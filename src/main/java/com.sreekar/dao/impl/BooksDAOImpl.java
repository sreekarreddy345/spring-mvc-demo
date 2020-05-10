package com.sreekar.dao.impl;

import com.sreekar.beans.Books;
import com.sreekar.dao.BooksDAO;
import com.sreekar.entity.Book;
import com.sreekar.util.HibernateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * User: Ranga Reddy
 * Date: 8/30/2019
 * Time: 9:37 PM
 * Description:
 */
@Repository
public class BooksDAOImpl implements BooksDAO {

    @Autowired
    private HibernateUtil hibernateUtil;

    public BooksDAOImpl() {

    }

    @Override
    public List<Books> getBooks() {
        List<Book> list = hibernateUtil.getList(Book.class);
        List<Books> books = new ArrayList<>(list.size());
        for (Book b : list){
            books.add(convertToBean(b));
        }
        return books;
    }

    public Books convertToBean(Book book){
        Books b = new Books();
        b.setId(book.getId());
        b.setBookName(book.getBookName());
        b.setAuthorName(book.getAuthorName());
        b.setSubject(book.getSubject());

        return b;

    }

    public Book convertToEntity(Books book){
        Book b = new Book();
        b.setId(book.getId());
        b.setBookName(book.getBookName());
        b.setAuthorName(book.getAuthorName());
        b.setSubject(book.getSubject());

        return b;

    }

    @Override
    public void saveBooks(Books books) {
        Book b = convertToEntity(books);
        hibernateUtil.create(b);
    }
}