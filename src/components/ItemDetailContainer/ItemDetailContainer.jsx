import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";

export default function ItemDetailContainer() {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const ref = doc(db, "products", id);
    getDoc(ref).then(snapshot => {
      setItem({ id: snapshot.id, ...snapshot.data() });
    });
  }, []);

  return item ? <ItemDetail item={item}/> : <p className="empty">Cargando...</p>;
}
