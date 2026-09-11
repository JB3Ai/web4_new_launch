export interface ChassisModule {
  id: string;
  slotNumber: string;
  modelCode: string;
  name: string;
  subTitle: string;
  category: string;
  status: 'active' | 'standby' | 'calibrated';
}

export interface BoltPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotation?: number;
}
