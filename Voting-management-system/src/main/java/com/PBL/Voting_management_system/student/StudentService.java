package com.PBL.Voting_management_system.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public boolean isEmailTaken(String email) {
        return studentRepository.findByEmail(email) != null;
    }

    public boolean isMobileTaken(String mobile) {
        return studentRepository.findByMobile(mobile) != null;
    }

    public Student registerUser(Student user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return studentRepository.save(user);
    }

    public Student loginUser(String email, String password) {
        Student user = studentRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(password,user.getPassword())) {
            return user;
        }
        return null;
    }
}
