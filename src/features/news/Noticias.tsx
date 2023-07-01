import { useCallback, useState } from "react";
import {
  ContenedorModal,
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
} from "./styled";
import { INoticiasNormalizadas } from "./types";
import TarjetaModalComponente from "./TarjetaModalComponente";
import ContenedorListadoNoticias from "./ContenedorListadoNoticias";

const Noticias = () => {
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  const clearModal = useCallback(() => setModal(null), []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        <ContenedorListadoNoticias setModal={setModal} />
        {modal ? 
            <ContenedorModal>
              <TarjetaModalComponente news={modal} onButtonClick={clearModal}/>
            </ContenedorModal>
           : null}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;
