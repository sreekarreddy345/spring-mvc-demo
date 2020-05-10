package com.sreekar.beans;

public class Books {

    int id;
    String bookName;
    String authorName;
    String subject;

    public Books(int id, String bookName, String authorName, String subject) {
        this.id = id;
        this.bookName = bookName;
        this.authorName = authorName;
        this.subject = subject;
    }

    public Books() {
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


}
