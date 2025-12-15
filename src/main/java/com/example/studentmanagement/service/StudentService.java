package com.example.studentmanagement.service;

import com.example.studentmanagement.model.Student;
import com.example.studentmanagement.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    public Student findById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Student not found with id: " + id));
    }

    @Transactional
    public Student create(Student student) {
        studentRepository.findByEmail(student.getEmail()).ifPresent(existing -> {
            throw new IllegalArgumentException("Email already exists: " + existing.getEmail());
        });
        return studentRepository.save(student);
    }

    @Transactional
    public Student update(Long id, Student updated) {
        Student existing = findById(id);
        studentRepository.findByEmail(updated.getEmail())
                .filter(other -> !other.getId().equals(id))
                .ifPresent(other -> {
                    throw new IllegalArgumentException("Email already exists: " + other.getEmail());
                });

        existing.setFirstName(updated.getFirstName());
        existing.setLastName(updated.getLastName());
        existing.setEmail(updated.getEmail());
        existing.setPhone(updated.getPhone());
        existing.setAddress(updated.getAddress());
        existing.setDateOfBirth(updated.getDateOfBirth());
        existing.setMajor(updated.getMajor());
        existing.setGpa(updated.getGpa());
        existing.setEnrollmentYear(updated.getEnrollmentYear());
        return studentRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        Student existing = findById(id);
        studentRepository.delete(existing);
    }
}

