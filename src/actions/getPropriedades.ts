import { Propriedade, FirebasePropriedade } from "../types/types";
import { database } from "../lib/firebase/clientApp";
import { DataSnapshot, get, ref } from "firebase/database";

export async function getPropriedades(): Promise<Propriedade[]> {
  try {
    const propriedadesRef = ref(database, 'EcoRadarFireBase/propriedades');
    const snapshot: DataSnapshot = await get(propriedadesRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      const firebasePropriedades = Object.values(data) as FirebasePropriedade[];
      
      return firebasePropriedades.map((item): Propriedade => ({
        nome: item.nome,
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude),
        raioKm: parseFloat(item.raio),
        owner_id: item.owner_id
      }));
    } else {
      console.log("Nenhum dado encontrado em EcoRadarFireBase/propriedades.");
      return [];
    }
  } catch (error) {
    console.error("Erro ao obter propriedades:", error);
    return [];
  }
}