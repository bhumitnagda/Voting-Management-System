package com.PBL.Voting_management_system.votes;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Votes")
@Data
public class Vote {
   @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "ID")
    private long id;

    @Column(name = "STUDENT_ID", unique = true, nullable = false)
    private long studentId;

    @Column(name = "CANDIDATE_ID", nullable = false)
    private int candidateId;

    @Column(name = "POSITION_ID", nullable = false)
    private int positionId;
}
