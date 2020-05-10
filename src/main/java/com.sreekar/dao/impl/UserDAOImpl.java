package com.sreekar.dao.impl;

import com.sreekar.dao.UsersDao;
import com.sreekar.entity.Users;
import com.sreekar.util.HibernateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDAOImpl implements UsersDao {

    @Autowired
    private HibernateUtil hibernateUtil;

    public UserDAOImpl() {
    }

    //todo-----------------------------------
    @Override
    public List<Users> getUsers() {
        List<Users> user = hibernateUtil.getList(Users.class);
        return user;
    }

    @Override
    public Users getUser(String username) {
        List<Users> listOfUsers = getUsers();
        System.out.println("users - " + listOfUsers + "username - " + username);
        for (Users userEntityObject : listOfUsers) {
            if (userEntityObject.getUsername().equals(username)) {
                return userEntityObject;
            }
        }
        return null;
    }

    @Override
    public Users getUser(int id) {
        return hibernateUtil.get(id, Users.class);

    }

    @Override
    public void saveUser(Users user) {
        Users user1 = new Users();
//        user1.setUsername(user.getId());
        user1.setPassword(user.getUsername());
        user1.setUsername(user.getPassword());

    }
}
