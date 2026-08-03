const Header = (props) => <h2>{props.course}</h2>;

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part part={part} key={part.id} />
    ))}
  </div>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ total }) => (
  <p>
    <b>total of {total} exercises</b>
  </p>
);

const Course = ({ course }) => {
  const total = course.parts.reduce((s, p) => (s += p.exercises), 0);

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  );
};

export default Course;
