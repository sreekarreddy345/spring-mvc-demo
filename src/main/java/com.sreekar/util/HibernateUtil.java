package com.sreekar.util;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;

@Repository
public class HibernateUtil {

    @Autowired
    private SessionFactory sessionFactory;

    public <T> Serializable create(final T entity) {
        return sessionFactory.getCurrentSession().save(entity);
    }

    public <S> S get(Serializable id, Class<S> entityClass) {
        return sessionFactory.getCurrentSession().get(entityClass, id);
    }

    public <T> T update(final T entity) {
        sessionFactory.getCurrentSession().update(entity);
        return entity;
    }

    public <T> void delete(final T entity) {
        sessionFactory.getCurrentSession().delete(entity);
    }

    public <S> List<S> getList(Class<S> entityClass) {
        return sessionFactory.getCurrentSession().createCriteria(entityClass).list();
    }

//    public <T> void delete(Serializable id,Class<T> entityClass){
//        T entity = fetchById(id,entityClass)
//        sessionFactory.getCurrentSession().delete(entity);
//    }

}
