import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6esBvMCDdgy0pLfl-PJELROhpb8j1eYI",
  projectId: "cream-stone-m",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  const snap = await getDocs(collection(db, 'products'));
  console.log('Total products:', snap.size);
  snap.forEach(doc => console.log(doc.data().title, '-', doc.data().category));
  process.exit(0);
}
check().catch(console.error);
