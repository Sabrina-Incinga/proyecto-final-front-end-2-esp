import { INoticiasNormalizadas } from "./types";
import { obtenerNoticias } from "./fakeRest";
import { useCamelCaseTransform } from "./useCamelCaseTransform";

export const obtenerInformacion = async ():Promise<INoticiasNormalizadas[]> => {
    const respuesta = await obtenerNoticias();

    const data = respuesta.map((n) => {
      const titulo = useCamelCaseTransform(n.titulo);

      const ahora = new Date();
      const minutosTranscurridos = Math.floor(
        (ahora.getTime() - n.fecha.getTime()) / 60000
      );

      return {
        id: n.id,
        titulo,
        descripcion: n.descripcion,
        fecha: `Hace ${minutosTranscurridos} minutos`,
        esPremium: n.esPremium,
        imagen: n.imagen,
        descripcionCorta: n.descripcion.substring(0, 100),
      };
    });

    return data
  };