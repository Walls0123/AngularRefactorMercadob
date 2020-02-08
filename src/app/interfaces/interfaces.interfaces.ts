import { GrupoCaracteristic, GrupoModificado } from '../components/localdetails/localdetails.component';

export interface LocalUnitEntity {
  local_id: number;
  local_nombre: string;
  local_descripcion: string;
  empresa_id: number;
  local_telefono: number;
  local_email: string;
  local_pais: string;
  local_region: string;
  local_comuna: string;
  local_direccion: string;
  usuario_id: number;
  local_latitud: number;
  local_longitud: number;
  local_nDiasDeReserva: string;
  local_estaBorrado: string;
  unidad?: (UnidadEntity)[] | null;
  horario?: (HorarioEntity)[] | null;
  caracteristicas?: (CaracteristicasEntity)[] | null;
  caracteristicasmod:GrupoModificado[]
}
export interface UnidadEntity {
  unidad_id: number;
  unidad_precioMensual: string;
  unidad_area: number;
  unidad_oferta: string;
  local_id: number;
  unidad_estaBorrado: string;
  unidad_estaDisponible: string;
}
export interface HorarioEntity {
  horario_id: number;
  horario_horaEntrada: string;
  horario_horaSalida: string;
  horario_tipo: string;
  local_id: number;
  horario_dia: string;
}
export interface CaracteristicasEntity {
  caracteristicasLocal_id: number;
  caracteristicasLocal_nombre: string;
  grupo_id: number;
  pivot: Pivot;
  grupo_caracteristicas: GrupoCaracteristicas;
}
export interface Pivot {
  local_id: number;
  caracteristicasLocal_id: number;
}
export interface GrupoCaracteristicas {
  grupo_id: number;
  grupo_nombre: string;
}
