package com.sreekar.services.impl;

import com.sreekar.beans.User;
import com.sreekar.dao.UsersDao;
import com.sreekar.entity.Users;
import com.sreekar.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UsersDao usersDao;

    @Override
    public List<User> getUsers() {
        // List of Entities
        List<Users> daoUsers = usersDao.getUsers();
        // List of Beans
        List<User> users = new ArrayList<>(daoUsers.size());
        for (Users users1 : daoUsers) {
            users.add(convertEntityToBean(users1));
        }

        return users;
    }

    @Override
    public User getUser(int id) {
        return convertEntityToBean(usersDao.getUser(id));
    }

    @Override
    public User getUser(String username) {
        Users userEntityObject = usersDao.getUser(username);
        return convertEntityToBean(userEntityObject);
    }

    @Override
    public void saveUser(User user) {
        Users userEntityObject = convertBeanToEntity(user);
        usersDao.saveUser(userEntityObject);
    }

    public User convertEntityToBean(Users users) {
        User userBean = new User(users.getId(), users.getUsername(), users.getPassword(), users.getRole());
        return userBean;
    }

    public Users convertBeanToEntity(User users) {
        Users userEntity = new Users(users.getId(), users.getUserName(), users.getPassword(), users.getRole());
        return userEntity;
    }

}
