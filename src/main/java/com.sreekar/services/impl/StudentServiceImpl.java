package com.sreekar.services.impl;

import com.sreekar.beans.Students;
import com.sreekar.dao.StudentsDAO;
import com.sreekar.services.StudentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
@Service
@Transactional
public class StudentServiceImpl implements StudentsService {

    @Autowired
    private StudentsDAO studentsDAO;

    @Override
    public List<Students> getStudents() {
        return studentsDAO.getStudents();
    }

    @Override
    public void saveStudents(Students students) {
        studentsDAO.saveStudents(students);
    }
}
