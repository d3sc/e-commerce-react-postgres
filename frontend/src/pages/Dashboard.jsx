import Check from "../middleware/auth/Check";

export default function Dashboard() {
  Check.isGuest();
  return (
    <div>
      dashboard here!
      <br />
      <a href="/logout">
        <button className="px-3 py-2 border rounded-md">logout</button>
      </a>
    </div>
  );
}
