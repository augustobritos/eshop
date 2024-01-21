import { useAuth } from "../../context/AuthContext";
import { Card } from "../ui/Card";

function Home() {
  const data = useAuth();
  return (
    <Card>
      <h1 className="font-bold justify-center text-2xl py-4">Tienda</h1>
    <h2>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit, nemo quidem! Exercitationem voluptatum laborum, numquam omnis totam aut corrupti a quae explicabo porro eaque esse aspernatur quisquam ut, molestias nesciunt?
    </h2>
    </Card>
  );
}

export default Home;
