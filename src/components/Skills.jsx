import React from 'react';

function Skills() {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <div id="skill">
        <ul id="first">
          <li>Python</li>
          <li>JavaScript</li>
        </ul>
        <ul id="sec">
          <li>SQL</li>
          <li>HTML</li>
        </ul>
        <ul id="third">
          <li>HTMX</li>
          <li>CSS</li>
        </ul>
        <ul id="four">
          <li>Version Control - Git</li>
          <li>BUN library</li>
        </ul>
        <ul id="fift">
          <li>Google Colab</li>
          <li>HuggingFace</li>
          <li>Cursor</li>
        </ul>
      </div>
      <div id="descriptions">
        <div id="backend">
          <h4>Backend Development</h4>
          <ul>
            <li>Python</li>
            <p>Experience: Intermediate </p>
          </ul>
          <ul>
            <li>JavaScript</li>
            <p>Experience: Basic</p>
          </ul>
          <ul>
            <li>SQL</li>
            <p>Experience: Basic</p>
          </ul>
          <ul>
            <li>Bun library</li>
            <p>Experience: Basic</p>
          </ul>
        </div>
        <div id="frontend">
          <h4>FrontEnd Development</h4>
          <ul>
            <li>CSS</li>
            <p>Experience: Intermediate</p>
          </ul>
          <ul>
            <li>Version Control - Git</li>
            <p>Experience: Intermediate</p>
          </ul>
        </div>
        <div id="airesearch">
          <h4>AI Research</h4>
          <ul>
            <li>Google Collab</li>
            <p>Experience: Basic</p>
          </ul>
          <ul>
            <li>HuggingFace</li>
            <p>Experience: Basic</p>
          </ul>
          <ul>
            <li>Cursor</li>
            <p>Experience: Intermediate</p>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Skills;
