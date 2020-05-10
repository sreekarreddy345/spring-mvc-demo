package com.sreekar.services;

import com.sreekar.beans.Books;

import java.util.List;

public interface BooksService {
    List<Books> getBooks();
    void saveBooks(Books books);
}
