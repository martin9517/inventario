import { Marca } from "./marca.model";

export class Producto {
    id?: any;
    nombre?: string;
    codigo?: string;
    talle?: string;
    precioUnitario?: Number | string;
    precioBonificado?: Number | string;
    marca?:Marca
  }