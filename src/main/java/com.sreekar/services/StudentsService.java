package com.sreekar.services;

import com.sreekar.beans.Students;

import java.util.List;

public interface StudentsService {

    List<Students> getStudents();
    void saveStudents(Students students);
}
