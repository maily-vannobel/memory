function ScoreBoard({ scores }) {
  // Utilisez des symboles Unicode pour les médailles
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="bestScore">
      <h2>Meilleurs scores</h2>
      <ul>
        {scores.slice(0, 3).map((score, index) => (
          <li key={index}>
            {medals[index]}: {score} secondes
          </li>
        ))}
      </ul>
    </div>
   
  );
}

export default ScoreBoard;