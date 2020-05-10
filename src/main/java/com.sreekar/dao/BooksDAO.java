package com.sreekar.dao;

import com.sreekar.beans.Books;

import java.util.List;

public interface BooksDAO {
    List<Books> getBooks();
    void saveBooks(Books books);
}
