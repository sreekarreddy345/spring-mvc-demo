package com.sreekar.services;

import com.sreekar.beans.User;

import java.util.List;

public interface UserService {

    List<User> getUsers();

    User getUser(String username);

    User getUser(int id);

    void saveUser(User user);
}
