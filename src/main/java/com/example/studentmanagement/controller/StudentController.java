package com.example.studentmanagement.controller;

import com.example.studentmanagement.model.Student;
import com.example.studentmanagement.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // ---------- Web views ----------

    @GetMapping({"/", "/students"})
    public String listStudents(Model model) {
        model.addAttribute("students", studentService.findAll());
        model.addAttribute("student", new Student());
        return "students";
    }

    @PostMapping("/students")
    public String createStudent(@Valid @ModelAttribute("student") Student student,
                                BindingResult bindingResult,
                                Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("students", studentService.findAll());
            return "students";
        }
        try {
            studentService.create(student);
        } catch (IllegalArgumentException ex) {
            bindingResult.rejectValue("email", "duplicate", ex.getMessage());
            model.addAttribute("students", studentService.findAll());
            return "students";
        }
        return "redirect:/students";
    }

    // ---------- REST API ----------

    @GetMapping("/api/students")
    @ResponseBody
    public List<Student> apiList() {
        return studentService.findAll();
    }

    @GetMapping("/api/students/{id}")
    @ResponseBody
    public Student apiGet(@PathVariable Long id) {
        return studentService.findById(id);
    }

    @PostMapping("/api/students")
    @ResponseBody
    public ResponseEntity<Student> apiCreate(@Valid @RequestBody Student student) {
        Student created = studentService.create(student);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/api/students/{id}")
    @ResponseBody
    public Student apiUpdate(@PathVariable Long id, @Valid @RequestBody Student student) {
        return studentService.update(id, student);
    }

    @DeleteMapping("/api/students/{id}")
    @ResponseBody
    public ResponseEntity<Void> apiDelete(@PathVariable Long id) {
        studentService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseBody
    public ResponseEntity<String> handleBadRequest(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}

