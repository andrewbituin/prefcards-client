import React from "react";
import "./Home.css";
import Login from './Login';

export default function Home(props) {

  return (
    <>
      <nav className="navigation">
        <Login {...props}/>
      </nav>
      <main>
        <header className="home-header">
          <h1 className="home-title">prefcards</h1>
          <h2 className="home-subtitle">Reliable. Accessible. Accurate.</h2>
        </header>
        <section className="about-section ">
          <div className="column">
            <h3>Experience simplicity and usablity.</h3>
            <p>
              Prefcards provides an easy way to generate, update and view
              surgical preference cards.
            </p>
          </div>
          <div className="column">
            <h3>Work with team focused accessibility.</h3>
            <p>
              Prefcards allows you limit the users who are able to edit your
              preference card, ensuring consistency across procedures and
              allowing staff to come and go knowing that the surgeon's
              preferences for equipment and patient information is as it should
              be.
            </p>
          </div>
          <div className="column">
            <h3>Log in and get started.</h3>
            <p>Create an account to get started.</p>
          </div>
        </section>
      </main>
    </>
  );
}
