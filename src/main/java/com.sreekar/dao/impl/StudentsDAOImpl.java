package com.sreekar.dao.impl;

import com.sreekar.beans.Students;
import com.sreekar.dao.StudentsDAO;
import com.sreekar.entity.Student;
import com.sreekar.util.HibernateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class StudentsDAOImpl implements StudentsDAO {

    @Autowired
    private HibernateUtil hibernateUtil;

    public StudentsDAOImpl() {

    }

    @Override
    public List<Students> getStudents() {
        List<Student> list = hibernateUtil.getList(Student.class);
        List<Students> students = new ArrayList<>(list.size());
        for (Student b : list) {
            students.add(convertToBean(b));
        }
        return students;
    }

    public Students convertToBean(Student student) {
        Students b = new Students();
        b.setId(student.getId());
        b.setFirstName(student.getFirstName());
        b.setLastName(student.getLastName());
        b.setAddress(student.getAddress());

        return b;

    }

    public Student convertToEntity(Students student) {
        Student b = new Student();
        b.setId(student.getId());
        b.setFirstName(student.getFirstName());
        b.setLastName(student.getLastName());
        b.setAddress(student.getAddress());

        return b;
    }

    @Override
    public void saveStudents(Students students) {
        Student b = convertToEntity(students);
        hibernateUtil.create(b);
    }
}
