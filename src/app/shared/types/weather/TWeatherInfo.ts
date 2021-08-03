export type TWeatherInfo = {
      coord:{lon:number,lat:number}
      base: string,
      main: {
        temp: number,
      },
      name: string,
      dt:number
}