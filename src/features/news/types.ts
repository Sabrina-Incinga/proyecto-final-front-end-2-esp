export interface INoticiasNormalizadas {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: number | string;
    esPremium: boolean;
    imagen: string;
    descripcionCorta?: string;
  }

export interface IProps{
    news?: INoticiasNormalizadas;
    onButtonClick: () => void;
}