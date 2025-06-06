export interface Village {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  foodKitsNeeded: number;
  medkitsNeeded: number;
}

export interface ReliefCenter {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  foodKitsAvailable: number;
  medkitsAvailable: number;
}

export interface RouteData {
  from: string;
  to: string;
  distance: number;
  deliveries: {
    food: number;
    medkits: number;
  };
}

export interface FormErrors {
  [key: string]: string;
}
