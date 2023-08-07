import "./classes.scss";

import { createParallax } from "../../../utils/effects";

import { default as barbarian } from "../../../assets/classes/barbarian.svg";
import { default as rogue } from "../../../assets/classes/rogue.svg";
import { default as sorcerer } from "../../../assets/classes/sorcerer.svg";
import { default as necromancer } from "../../../assets/classes/necromancer.svg";
import { default as druid } from "../../../assets/classes/druid.svg";

import { default as barbarianHero } from "../../../assets/classes/barbarian-prlx.png";
import { default as rogueHero } from "../../../assets/classes/rogue-prlx.png";
import { default as sorcererHero } from "../../../assets/classes/sorcerer-prlx.png";
import { default as necromancerHero } from "../../../assets/classes/necromancer-prlx.png";
import { default as druidHero } from "../../../assets/classes/druid-prlx.png";

import React, { useEffect, useState } from "react";

interface HeroClass {
  title: string;
  imageURL: string;
  imageURLHero: string;
  description: string;
}

interface Skill {
  title: string;
  description: string;
  imageURL: string;
}

const classes: Array<HeroClass> = [
  {
    title: "Barbarian",
    imageURL: barbarian,
    imageURLHero: barbarianHero,
    description:
      "The Barbarian has unparalleled strength and expertly wields an entire arsenal in battle, with a weapon for every occasion. He bellows intimidating war cries and unleashes ground-shaking slams to send approaching hordes reeling.",
  },
  {
    title: "Rogue",
    imageURL: rogue,
    imageURLHero: rogueHero,
    description:
      "The Rogue is an adaptable, agile warrior who can specialize in ranged or close quarters combat. She can best any foe with her imbued weapons, perform powerful combo attacks, and can augment her arsenal with deadly poisons and shadow magic to slay demons with impunity.",
  },
  {
    title: "Sorcerer",
    imageURL: sorcerer,
    imageURLHero: sorcererHero,
    description:
      "The Sorcerer shapes the elements into whatever form is necessary to ensure victory, from hurling bolts of lightning, impaling her foes upon jagged spikes of ice, and raining flaming meteors down from the sky.",
  },
  {
    title: "Necromancer",
    imageURL: necromancer,
    imageURLHero: necromancerHero,
    description:
      "Necromancers are cunning summoners that conjure vengeful hordes of the undead. Their Essence flows into three powerful bastions of Bone, Blood, or Shadow to bring low their enemies.",
  },
  {
    title: "Druid",
    imageURL: druid,
    imageURLHero: druidHero,
    description:
      "The Druid is a savage shapeshifter, fluidly transforming between the forms of a towering bear or a vicious werewolf to fight alongside the creatures of the wild. He also commands the power of earth, wind, and storm, unleashing nature’s wrath to devastating effect.",
  },
];

const Classes = () => {
  const [currentClass, setCurrentClass] = useState<HeroClass>(classes[0]);
  const [classSkills, setClassSkills] = useState<any>();

  useEffect(() => {
    const fetchSkills = async () => {
      const response = await fetch("http://localhost:8080/skills");
      const skills = await response.json();

      console.log(skills);

      setClassSkills(skills);
    };

    fetchSkills();
  }, []);

  const handleClassClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentClass = classes.find(
      (hero) => hero.title === e.currentTarget.name
    );
    if (!currentClass) {
      return console.error("Try to reload page. Undefined class name.");
    }
    setCurrentClass(currentClass);
  };

  return (
    <main className="main">
      <div className="container">
        <div className="class-list-wrapper">
          <div className="class-list-selector">
            <ul className="class-list">
              {classes &&
                classes.map((hero) => {
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
                          src={hero.imageURL}
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
                src={currentClass.imageURLHero}
                alt="hero class"
              />
            )}
          </div>
        </div>
        <div className="class-skills-wrapper">
          {classSkills &&
            classSkills.map((skill: Skill) => (
              <img key={skill.title} src={skill.imageURL} />
            ))}
        </div>
      </div>
    </main>
  );
};

export default Classes;
