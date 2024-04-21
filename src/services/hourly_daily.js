import { formatToLocalTime} from "./weatherService";
const formatForecastWeather = async (lat,lon) => {
     const url1=  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b9c02565d1444c72781f4be69cf85779`
     const data1= await fetch(url1).then((res) => res.json());
    let {list}=data1
    const hourly= list.slice(1,6).map((d) => {
      return {
          title: d.dt_txt,
          temp: d.main.temp,
          icon: d.weather[0].icon,
        }
        
      });

      const daily= list.filter((ele)=>{
        if((list.indexOf(ele))%8===0)
        return ele;
      }).map((d) =>{
        return {
            title: d.dt_txt,
            temp: d.main.temp,
            icon: d.weather[0].icon,
          }
          
        });    
      return {daily,hourly};
}
export default formatForecastWeather;