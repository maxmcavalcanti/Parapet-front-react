import "./Container.css";

export function Container({ children }) {
  return (
    <main>
      <div className="container">{children}</div>
    </main>
  );
}
