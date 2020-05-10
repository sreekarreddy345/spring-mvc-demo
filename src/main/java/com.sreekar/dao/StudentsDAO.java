package com.sreekar.dao;

import com.sreekar.beans.Students;

import java.util.List;

public interface StudentsDAO {
    List<Students> getStudents();
    void saveStudents(Students students);

}
