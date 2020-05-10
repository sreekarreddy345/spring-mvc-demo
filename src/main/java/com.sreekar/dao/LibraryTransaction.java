package com.sreekar.dao;

import com.sreekar.beans.Books;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class LibraryTransaction {

    private Connection connection;

    public LibraryTransaction() {
        this.connection = DbConnection.getConnection();
    }

    public int insert(Books l) {
        int a = 0;
        try {
            PreparedStatement statement = connection.prepareStatement("Insert into librarybooks(bookname,authorname,subject) VALUES(?,?,?) ");
            statement.setString(1, l.getBookName());
            statement.setString(2, l.getAuthorName());
            statement.setString(3, l.getSubject());
            statement.executeUpdate();
            a = 1;

        } catch (SQLException e) {
            e.printStackTrace();
            return a;
        }

        return a;
    }

    public List<Books> displayAllBooks() {

        List<Books> s = new ArrayList<>();
        PreparedStatement st = null;
        try {

            st = connection.prepareStatement("SELECT * FROM librarybooks");
            ResultSet resultSet = st.executeQuery();
            s = listGenerator(resultSet);

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return s;
    }

    public List<Books> listGenerator(ResultSet rs1) {
        List<Books> ls = new ArrayList<>();
        try {
            while (rs1.next()) {
                Books temp = new Books();
                //System.out.println(rs.getInt("id"));
                temp.setId((rs1.getInt(1)));
                temp.setBookName(rs1.getString(2));
                temp.setAuthorName(rs1.getString(3));
                temp.setSubject(rs1.getString(4));
                ls.add(temp);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return ls;
    }
}
