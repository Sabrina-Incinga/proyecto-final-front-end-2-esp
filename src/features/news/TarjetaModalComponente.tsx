import { BotonSuscribir, CloseButton, CotenedorTexto, DescripcionModal, ImagenModal, TarjetaModal, TituloModal } from "./styled";
import { IProps } from "./types";
import { SuscribeImage, CloseButton as Close } from "../../assets";


const TarjetaModalComponente = ({news, onButtonClick} : IProps) => {
    return(
        <TarjetaModal>
                <CloseButton onClick={onButtonClick}>
                  <img src={Close} alt="close-button" />
                </CloseButton>
                <ImagenModal src={news?.esPremium ? SuscribeImage : news?.imagen} alt={news?.esPremium ? "mr-burns-excelent" : "news-image"} />
                <CotenedorTexto>
                  <TituloModal>{news?.esPremium ? "Suscríbete a nuestro Newsletter" : news?.titulo}</TituloModal>
                  <DescripcionModal>
                    {news?.esPremium ? "Suscríbete a nuestro newsletter y recibe noticias de nuestros personajes favoritos." : news?.descripcion}
                  </DescripcionModal>
                  <BotonSuscribir
                    style={!news?.esPremium ? { display: 'none' } : {}}
                    onClick={() =>
                      setTimeout(() => {
                        alert("Suscripto!");
                        onButtonClick();
                      }, 1000)
                    }
                  >
                    Suscríbete
                  </BotonSuscribir>
                </CotenedorTexto>
              </TarjetaModal>
    )
}

export default TarjetaModalComponente;