import { Marca } from "./marca.model";

export class Producto {
    id?: any;
    nombre?: string;
    codigo?: string;
    precioUnitario?: Number;
    marca?:Marca
  }