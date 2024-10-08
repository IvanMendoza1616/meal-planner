import { add } from "./math";

export default async function Home() {
  return (
    <main className="">
      <h1>Home</h1>
      {add([1, 2, 3])}
    </main>
  );
}
