const Header = (props) => {
  return (
    <div>
      <h1> {props.course}</h1>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part
        part={props.parts[0].name}
        exercise={props.parts[0].exercises}
      />
      <Part
        part={props.parts[1].name}
        exercise={props.parts[1].exercises}
      />
      <Part
        part={props.parts[2].name}
        exercise={props.parts[2].exercises}
      />
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>
        The total number is:{" "}
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}
      </p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundumentals of React",
        exercises: 10,
      },

      {
        name: "Using props to pass data",
        exercises: 7,
      },

      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );

  // const course = "Half Stack application development";
  // const part1 = "Fundamentals of React";
  // const exercises1 = 10;
  // const part2 = "Using props to pass data";
  // const exercises2 = 7;
  // const part3 = "State of a component";
  // const exercises3 = 14;

  // return (
  //   <>
  //     <Header course={course} />

  //     <Content
  //       part1={part1}
  //       exercise1={exercises1}
  //       part2={part2}
  //       exercise2={exercises2}
  //       part3={part3}
  //       exercise3={exercises3}
  //     />

  //     <Total total={exercises1 + exercises2 + exercises3} />
  //   </>
  // );
};

export default App;
