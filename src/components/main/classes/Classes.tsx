import "./classes.scss";

import { createParallax } from "../../../utils/effects";

import React, { useEffect, useState } from "react";

interface HeroClass {
  title: string;
  smallIcon: string;
  heroImage: string;
  description: string;
}

const Classes = () => {
  const [heroClasses, setHeroClasses] = useState<HeroClass[]>();
  const [currentClass, setCurrentClass] = useState<HeroClass>();

  useEffect(() => {
    const getClasses = async () => {
      try {
        const response = await fetch("http://localhost:8080/classes/get-all");
        const classes = await response.json();

        setHeroClasses(Object.values(classes));
      } catch (error) {
        throw error;
      }
    };

    getClasses();
  }, []);

  const handleClassClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (heroClasses) {
      const currentClass = heroClasses.find(
        (hero) => hero.title === e.currentTarget.name
      );
      if (!currentClass) {
        return console.error("Try to reload page. Undefined class name.");
      }
      setCurrentClass(currentClass);
    }
  };

  return (
    <main className="main">
      <div className="container">
        <div className="class-list-wrapper">
          <div className="class-list-selector">
            <ul className="class-list">
              {heroClasses &&
                heroClasses.map((hero) => {
                  return (
                    <li
                      className="class-list-item"
                      key={hero.title.toLowerCase()}
                    >
                      <button
                        onClick={handleClassClick}
                        name={hero.title}
                        className="class-item"
                      >
                        <img
                          className="class-logo"
                          src={hero.smallIcon}
                          alt="class logo"
                          width="50"
                          height="50"
                        />
                        <span className="class-button-text">{hero.title}</span>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div
            onMouseMove={createParallax}
            className="class-description-wrapper"
          >
            <div className="class-description-text">
              {currentClass && (
                <>
                  <h1 className="class-description-title">
                    {currentClass.title}
                  </h1>
                  <p className="class-description">
                    {currentClass.description}
                  </p>
                </>
              )}
            </div>
            {currentClass && (
              <img
                height="500"
                className="class-parallax parallax-enabled"
                src={currentClass.heroImage}
                alt="hero class"
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Classes;
