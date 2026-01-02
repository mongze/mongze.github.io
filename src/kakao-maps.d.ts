declare global {
  interface Window {
    kakao: {
      maps: {
        LatLng: new (lat: number, lng: number) => any;
        Map: new (element: HTMLElement, options?: any) => any;
        Marker: new (options: any) => any;
        load: (callback: () => void) => void;
      };
    };
  }
}

export {};
