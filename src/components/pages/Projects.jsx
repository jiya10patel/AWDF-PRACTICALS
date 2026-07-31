function Projects() {
  const projectList = [
    {
      title: 'Student Portfolio using React',
      desc: 'A personal portfolio site built with reusable React components and React Router.',
    },
    {
      title: 'ThreatShield AI',
      desc: 'An AI-powered unified threat detection and analysis platform built as a team SGP project.',
    },
    {
      title: 'Cybersecurity Internship Tasks',
      desc: 'Hands-on practicals covering Nmap scanning, firewall configuration, and traffic analysis using Wireshark.',
    },
  ];

  return (
    <section>
      <h2>Projects</h2>
      <ul>
        {projectList.map((project) => (
          <li key={project.title}>
            <strong>{project.title}</strong>
            <p>{project.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Projects;