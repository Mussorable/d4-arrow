import "./classes.scss";

import { createParallax } from "../../../utils/effects";

import React, { useEffect, useState, useRef } from "react";

interface HeroClass {
  title: string;
  smallIcon: string;
  heroImage: string;
  description: string;
}

const Classes = () => {
  const [heroClasses, setHeroClasses] = useState<HeroClass[]>();
  const [currentClass, setCurrentClass] = useState<HeroClass>();
  const classesButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const [isDragging, setIsDragging] = useState(false);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [mapSize, setMapSize] = useState(100);
  const initialClickPositionRef = useRef({ x: 0, y: 0 });

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
    classesButtonsRef.current.forEach((buttonRef) => {
      if (buttonRef && buttonRef !== e.currentTarget) {
        buttonRef.classList.remove("active");
      }

      e.currentTarget.classList.add("active");
    });

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

  const handleMapMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isDragging) return;

    const newMapPositionX =
      mapPosition.x + e.clientX - initialClickPositionRef.current.x;
    const newMapPositionY =
      mapPosition.y + e.clientY - initialClickPositionRef.current.y;

    setMapPosition({ x: newMapPositionX, y: newMapPositionY });

    initialClickPositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMapScroll = (e: React.WheelEvent<HTMLElement>) => {
    const newSize = mapSize + (e.deltaY > 0 ? -5 : 5);

    const minSize = 130;
    const maxSize = 250;
    const clampedSize = Math.min(Math.max(newSize, minSize), maxSize);

    setMapSize(clampedSize);
  };

  return (
    <main className="main">
      <div className="container">
        <div className="class-list-wrapper">
          <div className="class-list-selector">
            <ul className="class-list">
              {heroClasses &&
                heroClasses.map((hero, index) => {
                  return (
                    <li
                      className="class-list-item"
                      key={hero.title.toLowerCase()}
                    >
                      <button
                        ref={(el) => (classesButtonsRef.current[index] = el)}
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
              {!currentClass && (
                <>
                  <h2 className="class-description-title">
                    Pick the interested class
                  </h2>
                  <p className="class-description">
                    Get more information, skills and last information about new
                    features.
                  </p>
                </>
              )}
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
        <div
          className="class-skills-wrapper"
          onMouseDown={(e) => {
            setIsDragging(true);
            initialClickPositionRef.current = { x: e.clientX, y: e.clientY };
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseMove={handleMapMove}
        >
          <div
            style={{
              left: `${mapPosition.x}px`,
              top: `${mapPosition.y}px`,
              width: `${mapSize}%`,
              height: `${mapSize}%`,
            }}
            onWheel={handleMapScroll}
            className="skills-map"
          ></div>
        </div>
      </div>
    </main>
  );
};

export default Classes;
