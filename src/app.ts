import { CronJob } from "cron";
import { Foco, Propriedade, ApiFoco } from "./types/types";
import { haversineDistance } from "./actions/haversineDistance";
import { getBoundingBox } from "./actions/getBoundingBox";
import { getPropriedades } from "./actions/getPropriedades";
import { push, ref, set } from "firebase/database";
import { database } from "./lib/firebase/clientApp";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import axios from "axios";

dayjs.extend(utc);
dayjs.extend(timezone);

function focosDentroDoRaio(propriedade: Propriedade, focos: Foco[]) {
  try {
    if (!propriedade || !focos || focos.length === 0) {
      throw new Error("Propriedade ou focos inválidos");
    }

    const box = getBoundingBox(propriedade, propriedade.raioKm);

    const filtrados = focos.filter((foco) => {
      return (
        foco.latitude >= box.minLat &&
        foco.latitude <= box.maxLat &&
        foco.longitude >= box.minLon &&
        foco.longitude <= box.maxLon
      );
    });

    return filtrados.filter((foco) => {
      const distancia = haversineDistance(propriedade, foco);
      return distancia <= propriedade.raioKm;
    });
  } catch (error) {
    console.error("Erro ao calcular focos dentro do raio:", error);
    return [];
  }
}

async function main() {
  const propriedades: Propriedade[] = await getPropriedades();
  if (propriedades.length === 0) {
    console.log("Nenhuma propriedade encontrada.");
    return;
  }

  const response = await axios.get("http://api.isaacsales.me/get-data");
  const apiFocos: ApiFoco[] = response.data;

  const focos: Foco[] = apiFocos.map(
    (foco): Foco => ({
      latitude: parseFloat(foco.latitude),
      longitude: parseFloat(foco.longitude),
      frp: parseFloat(foco.frp),
    })
  );
  if (focos.length === 0) {
    console.log("Nenhum foco encontrado.");
    return;
  }

  propriedades.forEach(async (propriedade) => {
    const focosProximos = focosDentroDoRaio(propriedade, focos);
    if (focosProximos.length > 0) {
      const maiorFrp = Math.max(...focosProximos.map((foco) => foco.frp));
      let nivelAlerta: string;
      if (maiorFrp < 5) {
        nivelAlerta = "baixo";
      } else if (maiorFrp < 20 && maiorFrp >= 5) {
        nivelAlerta = "médio";
      } else if (maiorFrp < 50 && maiorFrp >= 20) {
        nivelAlerta = "alto";
      } else {
        nivelAlerta = "crítico";
      }

      const alertaRef = ref(database, "EcoRadarFireBase/alertas");
      const novaPropriedadeRef = push(alertaRef);

      await set(novaPropriedadeRef, {
        owner_id: propriedade.owner_id,
        nivelAlerta: nivelAlerta,
        nome: propriedade.nome,
        created_at: dayjs().tz("America/Sao_Paulo").format(),
      });
    } else {
      console.log(
        `Nenhum foco encontrado próximo à propriedade ${propriedade.nome} (Owner: ${propriedade.owner_id}).`
      );
      return;
    }
  });
}

const job = new CronJob(
	'0 * * * * *', // cronTime
	function () {
		console.log('Executando tarefa agendada...');
    main()
      .then(() => console.log('Tarefa concluída com sucesso!'))
      .catch((error) => console.error('Erro ao executar a tarefa:', error));
	},
	null,
	true,
	'America/Sao_Paulo'
);
job.start();