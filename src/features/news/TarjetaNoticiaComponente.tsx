import {
    TarjetaNoticia,
    FechaTarjetaNoticia,
    DescripcionTarjetaNoticia,
    ImagenTarjetaNoticia,
    TituloTarjetaNoticia,
    BotonLectura
  } from "./styled";
import {  IProps } from "./types";

const TarjetaNoticiaComponente = ({news, onButtonClick}: IProps) => {

    
    return(
        <TarjetaNoticia>
            <ImagenTarjetaNoticia src={news?.imagen} />
            <TituloTarjetaNoticia>{news?.titulo}</TituloTarjetaNoticia>
            <FechaTarjetaNoticia>{news?.fecha}</FechaTarjetaNoticia>
            <DescripcionTarjetaNoticia>
              {news?.descripcionCorta}
            </DescripcionTarjetaNoticia>
            <BotonLectura onClick={onButtonClick}>Ver más</BotonLectura>
        </TarjetaNoticia>
    )
}

export default TarjetaNoticiaComponente;