package com.sreekar.services.impl;

import com.sreekar.beans.Books;
import com.sreekar.dao.BooksDAO;
import com.sreekar.services.BooksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * User: Ranga Reddy
 * Date: 8/30/2019
 * Time: 9:31 PM
 * Description:
 */
@Service
@Transactional
public class BooksServiceImpl implements BooksService {

    @Autowired
    private BooksDAO booksDAO;

    @Override
    public List<Books> getBooks() {
        return booksDAO.getBooks();
    }

    @Override
    public void saveBooks(Books books) {
        booksDAO.saveBooks(books);
    }
}
