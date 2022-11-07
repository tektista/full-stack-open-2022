import React from "react";

const Header = ({ courseName }) => <h1>{courseName}</h1>;

const Total = ({ partArray }) => {
  const total = partArray.reduce(
    (prevValue, currentValue) => prevValue + currentValue.exercises,
    0
  );
  return <p>Total: {total}</p>;
};

const Part = ({ partName, noOfExercises }) => (
  <>
    {partName} {noOfExercises}
  </>
);

const Content = ({ course }) => (
  <>
    {course.parts.map((part) => (
      <li key={part.id}>
        {" "}
        <Part partName={part.name} noOfExercises={part.exercises} />
      </li>
    ))}
  </>
);

const Course = ({ header, content, total }) => (
  <>
    {/* use map here */}
    <Header courseName={header} />
    <Content course={content} />
    <Total partArray={total} />
  </>
);

export default Course;
