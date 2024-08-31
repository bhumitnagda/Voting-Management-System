package com.PBL.Voting_management_system.votes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    public boolean hasUserVoted(long studentId, int positionId) {
        return voteRepository.existsByStudentIdAndPositionId(studentId, positionId);
    }

    public void saveVote(Vote vote) {
        voteRepository.save(vote);
    }
}