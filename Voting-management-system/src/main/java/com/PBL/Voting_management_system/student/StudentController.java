package com.PBL.Voting_management_system.student;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Student user) {
        if (!user.getEmail().endsWith("@somaiya.edu")) {
            return ResponseEntity.badRequest().body("Only somaiya.edu emails are allowed.");
        }
        if (studentService.isEmailTaken(user.getEmail())) {
            return ResponseEntity.badRequest().body("An account with this email already exists.");
        }

        if (studentService.isMobileTaken(user.getMobile())) {
            return ResponseEntity.badRequest().body("An account with this mobile number already exists.");
        }
        studentService.registerUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password, HttpSession session) {
        Student user = studentService.loginUser(email, password);
        if (user == null) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        session.setAttribute("loggedInUser", user);
        return ResponseEntity.ok("Login successful");
    }

}
