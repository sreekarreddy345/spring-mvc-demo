package com.sreekar.entity;


import javax.persistence.*;

@Entity
@Table(name = "librarybooks")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    @Column
    String bookName;
    @Column
    String authorName;
    @Column
    String subject;

    public Book(int id, String bookName, String authorName, String subject) {
        this.id = id;
        this.bookName = bookName;
        this.authorName = authorName;
        this.subject = subject;
    }

    public Book() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }


    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", bookName='" + bookName + '\'' +
                ", authorName='" + authorName + '\'' +
                ", subject='" + subject + '\'' +
                '}';
    }
}
