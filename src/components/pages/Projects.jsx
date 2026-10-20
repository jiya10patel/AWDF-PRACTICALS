import { useState, useEffect } from 'react';

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRepos = () => {
    setLoading(true);
    setError(null);
    fetch('https://api.github.com/users/jiya10patel/repos')
      .then((res) => {
        if (!res.ok) {
          throw new Error('User not found or API request failed');
        }
        return res.json();
      })
      .then((data) => setRepos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  if (loading) return <p className="status-msg">Loading repositories...</p>;

  if (error) {
    return (
      <div className="status-msg error-msg">
        <p>Error: {error}</p>
        <button className="submit-btn" onClick={fetchRepos}>Retry</button>
      </div>
    );
  }

  return (
    <section>
      <h2>My GitHub Projects</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <strong>{repo.name}</strong>
            <p>
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                View on GitHub
              </a>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Projects;