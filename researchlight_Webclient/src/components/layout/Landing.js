import React from 'react'

const Landing = () => {
    return (
    <section className="landing">
      <div class="dark-overlay">
        <div class="landing-inner">
          <h1 class="x-large">ResearchLight</h1>
          <p class="lead">
            Analyse research papers, get evaluated by senior researchers and build your research experience.
          </p>
          <div class="buttons">
            <a href="register.html" class="btn btn-primary">Sign Up</a>
            <a href="login.html" class="btn btn-light">Login</a>
          </div>
        </div>
      </div>
    </section>
    )
}

export default Landing