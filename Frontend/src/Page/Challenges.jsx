import React, { useState } from "react";
import "../pageStyle/challenges.css";
import { toast } from "react-toastify";

const Challenges = () => {
  const [codingChallenges, setCodingChallenges] = useState([
    {
      title: "Two Sum Problem",
      description:
        "Find two numbers in an array that add up to a specific target.",
      difficulty: "Easy",
      link: "https://leetcode.com/problems/two-sum/",
      solution: "",
    },
    {
      title: "Longest Substring Without Repeating Characters",
      description:
        "Find the length of the longest substring without repeating characters.",
      difficulty: "Medium",
      link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      solution: "",
    },
    {
      title: "Merge K Sorted Lists",
      description:
        "Merge k sorted linked lists into one sorted list and return it.",
      difficulty: "Hard",
      link: "https://leetcode.com/problems/merge-k-sorted-lists/",
      solution: "",
    },
  ]);

  const handleSolutionChange = (index, value) => {
    const updatedChallenges = [...codingChallenges];
    updatedChallenges[index].solution = value;
    setCodingChallenges(updatedChallenges);
  };

  const handleSolutionSubmit = (index) => {
    if (codingChallenges[index].solution.trim()) {
      toast(`Solution link for "${codingChallenges[index].title}" submitted!`);
    } else {
      toast("Please enter a solution link before submitting.");
    }
  };

  return (
    <div className="challenges-container">
      <h1 className="challenges-header">Coding Challenges</h1>
      <div className="challenges-list">
        {codingChallenges.map((challenge, index) => (
          <div className="challenges-card" key={index}>
            <div className={`challenges-difficulty-tag ${challenge.difficulty.toLowerCase()}`}>
              {challenge.difficulty}
            </div>
            <h2 className="challenges-title">{challenge.title}</h2>
            <p className="challenges-description">{challenge.description}</p>
            <a
              href={challenge.link}
              target="_blank"
              rel="noopener noreferrer"
              className="challenges-solve-link"
            >
              Solve Now
            </a>
            <div className="challenges-solution-container">
              <input
                type="text"
                placeholder="Enter your solution link"
                value={challenge.solution}
                onChange={(e) => handleSolutionChange(index, e.target.value)}
                className="challenges-solution-input"
              />
              <button
                onClick={() => handleSolutionSubmit(index)}
                className="challenges-submit-button"
              >
                Submit
              </button>
              {challenge.solution && (
                <p className="challenges-submitted-solution">
                  <strong>Submitted solution:</strong>{" "}
                  <a
                    href={challenge.solution}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="challenges-solution-link"
                  >
                    View Solution
                  </a>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
