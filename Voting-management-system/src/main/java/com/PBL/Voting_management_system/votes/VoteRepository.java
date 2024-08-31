package com.PBL.Voting_management_system.votes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    boolean existsByStudentIdAndPositionId(long studentId, int positionId);
}
