package com.PBL.Voting_management_system.student;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Student")
@Data
public class Student {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    @Column(name = "MOBILE", unique = true, nullable = false)
    private String mobile;

    @Column(name = "EMAIL", unique = true, nullable = false)
    private String email;

    @Column(name = "PASSWORD", nullable = false)
    private String password;
}
