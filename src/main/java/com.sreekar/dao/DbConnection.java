package com.sreekar.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DbConnection {

    public static Connection getConnection() {
        String DATABASE_URL = "jdbc:mysql://localhost:3306/sreekar";
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        Connection con = null;
        try {
            con = DriverManager.getConnection(DATABASE_URL, "Sreekar", "Sree@1234");

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return con;
    }

}
