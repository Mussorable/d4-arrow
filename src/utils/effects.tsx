import React from "react";

export const createRipple = (e: React.MouseEvent<HTMLElement>) => {
  const link = e.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(link.clientWidth, link.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - (link.offsetLeft + radius)}px`;
  circle.style.top = `${e.clientY - (link.offsetTop + radius)}px`;
  circle.classList.add("ripple");

  link.appendChild(circle);

  circle.addEventListener("animationend", () => {
    circle.remove();
  });
};

export const createParallax = (e: React.MouseEvent) => {
  document.querySelectorAll(".parallax-enabled").forEach((element) => {
    const axisX = (window.innerWidth - e.pageX * 1.5) / 90;
    const axisY = (window.innerHeight - e.pageY * 1.5) / 90;

    (
      element as HTMLElement
    ).style.transform = `translateX(${axisX}px) translateY(${axisY}px)`;
  });
};
