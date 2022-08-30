import { Component, Input, OnInit } from '@angular/core';
import { Lot } from '../models/lot';
import { AqiDataService } from '../services/aqi-data.service';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css']
})
export class ResultCardComponent implements OnInit {

  @Input() inputData: {
    country?: string,
    state?: string,
    city?: string,
    cordinates?: {
      lon: number,
      lat: number
    }
  };
  @Input() isFullMode: boolean = true;
  @Input() isBookmarked: boolean = false;
  @Input() removeCallbackFunction: (args: any) => void;

  isLoadingData: boolean = false;
  resultData: any;
  weatherIconUrl: String;
  showCancel:boolean=false;

  getAqiRanges(value: number) {
    if (value >= 0 && value <= 50)
      return { label: "Good", color: "#9cd84e", tag: "#87c13c", bg: "#a8e05f" }

    else if (value >= 51 && value <= 100)
      return { label: "Moderate", color: "#facf39", tag: "#efbe1d", bg: "#fdd64b" }

    else if (value >= 101 && value <= 150)
      return { label: "Unhealthy for Sensitive Groups", color: "#f99049", tag: "#f27e2f", bg: "#ff9b57" }

    else if (value >= 151 && value <= 200)
      return { label: "Unhealthy", color: "#f65e5f", tag: "#e84b50", bg: "#fe6a69" }

    else if (value >= 201 && value <= 300)
      return { label: "Very Unhealthy", color: "#a070b6", tag: "#8a5d9d", bg: "#a97abc" }

    else if (value >= 301)
      return { label: "Hazardous", color: "#a06a7b", tag: "#915c6c", bg: "#a87383" }
  }

  constructor(private aqiData: AqiDataService,
    private favService:FavoriteService) {
    //check in backend for isBookmarked 
  }

  ngOnInit(): void {

    // getting city weather and aqi data
    this.getResultData();

    setTimeout(() => {
      this.isLoadingData = false;
      setTimeout(() => {

        if (this.resultData?.city != undefined && this.resultData?.country != undefined && this.resultData?.state != undefined && this.resultData.location != undefined && this.resultData?.current != undefined) {
          //preparing weather icon data.current.weather.ic
          this.weatherIconUrl = `http://openweathermap.org/img/wn/${this.resultData.current.weather.ic}@2x.png`

          // styling according to resultData
          // document.getElementById('AQI').style.backgroundColor = this.getAqiRanges(this.resultData.current.pollution.aqius).tag;
          // document.getElementById("mainCard").style.backgroundColor = this.getAqiRanges(this.resultData.current.pollution.aqius).bg;

          // styling according to isFullMode
          if (this.isFullMode) {
            // document.getElementById('mainCard').style.width = '1100px';
            // document.getElementById('AQI').style.width = '375px';
            // document.getElementById('AQI').style.fontSize = '50px';

            // document.querySelectorAll<HTMLElement>('.weatherData').forEach(el => {
            //   el.style.justifyContent = 'space-around'
            // });

            // document.querySelectorAll<HTMLElement>('mat-card-title-group')[0].style.justifyContent = 'space-around'
          }
        }
      }, 50);
    }, 1000);
  }

  async getResultData() {
    this.isLoadingData = true;
    if (this.inputData.state != null, this.inputData.country != null, this.inputData.city != null) {
      try {
        await this.aqiData.getCityData(this.inputData.state, this.inputData.country, this.inputData.city).subscribe((resp: any) => {
          this.resultData = resp.data;
          console.log(this.resultData);
        });
      } catch (error) {
        console.warn(error);
      }
    } else if (this.inputData.cordinates.lat != null, this.inputData.cordinates.lat != null) {
      try {
        await this.aqiData.getCityDataByCordinates(this.inputData.cordinates.lat,this.inputData.cordinates.lon).subscribe((resp: any) => {
          this.resultData = resp.data;
          console.log(this.resultData);
        });
      } catch (error) {
        console.warn(error);
      }
    }
  }

  showCancelIcon(){
    if(this.isBookmarked && !this.isFullMode){
      this.showCancel=true;
      // document.getElementById('bookmark-cancel').style.visibility='visible';
    }
  }
  
  hideCancelIcon(){
    if(this.isBookmarked && !this.isFullMode){
      this.showCancel=false
            // document.getElementById('bookmark-cancel').style.visibility='hidden';
    }
  }

  addBookmark() {
    //add this card and store the info
    this.isBookmarked = true;
    const tempRes={
      lon:this.resultData?.location?.coordinates[0],
      lat:this.resultData?.location?.coordinates[1],
    }
    console.log("tempRes",tempRes);
    this.favService.addFav(tempRes).subscribe((res)=>{
      console.log(res);
    });;
    alert("Successfully bookmarked!")
  }

  removeBookmark() {
    this.isBookmarked = false;
    console.log("rs",this.resultData.cordinates,"ip",this.inputData.cordinates)
    const tempRes={
      lon:this.inputData.cordinates.lon,
      lat:this.inputData.cordinates.lat
    }
    this.favService.deleteByUserId(tempRes).subscribe((res:any)=>{
      console.log(res);
     });
    this.removeCallbackFunction(this.inputData.cordinates);
    console.log("after",this.inputData.cordinates);
    alert("successfully removed the bookmark!")
  }
}
