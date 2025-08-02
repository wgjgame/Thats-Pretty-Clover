export default function Header({ gameStart }: { gameStart: boolean }) {
  return (
    <h1
      style={{
        position: "relative",
        background: "linear-gradient(90deg, #ede200d9, #84f000ff, #008819d9)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginTop: `${gameStart ? "0px" : "-100px"}`,
      }}
    >
      That's Pretty Clover
    </h1>
  );
}
