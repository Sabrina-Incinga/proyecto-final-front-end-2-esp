import { useCallback, useEffect, useState } from "react";
import TarjetaNoticiaComponente from "./TarjetaNoticiaComponente";
import { INoticiasNormalizadas } from "./types";
import { obtenerInformacion } from "./newsAPI";

const ContenedorListadoNoticias = ({setModal}:{setModal:(value: React.SetStateAction<INoticiasNormalizadas | null>) => void}):JSX.Element => {
    const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
    
    const newsMapper = useCallback((n : INoticiasNormalizadas) : JSX.Element  => (
        <TarjetaNoticiaComponente news={n} onButtonClick={() => setModal(n)}/>
      ), []);
    
    useEffect(() => {
    obtenerInformacion().then(data => setNoticias(data));
    
    }, []);

    return (
        <>
            {noticias.map(newsMapper)}
        </>
    )
}

export default ContenedorListadoNoticias;