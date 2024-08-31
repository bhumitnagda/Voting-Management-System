package com.PBL.Voting_management_system.votes;

import com.PBL.Voting_management_system.student.Student;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class VoteController {

    @Autowired
    private VoteService voteService;

    @PostMapping("/castVote")
    public ResponseEntity<String> castVote(@RequestParam int candidateId, @RequestParam int positionId, HttpSession session) {
        Student user = (Student) session.getAttribute("loggedInUser");
        if (user == null) {
            return ResponseEntity.status(401).body("User not logged in");
        }

        if (voteService.hasUserVoted(user.getId(), positionId)) {
            return ResponseEntity.badRequest().body("User has already voted for this position!");
        }

        Vote vote = new Vote();
        vote.setStudentId(user.getId());
        vote.setCandidateId(candidateId);
        vote.setPositionId(positionId);
        voteService.saveVote(vote);

        return ResponseEntity.ok("Vote cast successfully");
    }
}
