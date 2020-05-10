package com.sreekar.dao;

import com.sreekar.entity.Users;

import java.util.List;

public interface UsersDao {
    List<Users> getUsers();

    Users getUser(String username);

    Users getUser(int id);

    void saveUser(Users user);

}
