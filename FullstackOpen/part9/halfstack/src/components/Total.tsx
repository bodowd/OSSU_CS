interface TotalProps {
    count: number
}

export default function Total(props: TotalProps) {
  return (
      <div>
          <p>
              Number of exercises{" "}
              {props.count}
          </p>
      </div>
  );
}
