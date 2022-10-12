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
    <Header courseName={header} />
    <Content course={content} />
    <Total partArray={total} />
  </>
);

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return (
    <>
      <Course header={course.name} content={course} total={course.parts} />
      {/* <Header courseName={course.name} /> */}
      {/* <Content course={course} /> */}
      {/* <Total partArray={course.parts} /> */}
    </>
  );
};

export default App;
