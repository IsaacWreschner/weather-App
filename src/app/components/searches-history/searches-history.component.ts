import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { TWeatherInfo } from '../../shared/types/weather/TWeatherInfo';

@Component({
  selector: 'app-searches-history',
  templateUrl: './searches-history.component.html',
  styleUrls: ['./searches-history.component.css']
})
export class SearchesHistoryComponent implements OnInit {
  allSearches:TWeatherInfo[] = [];
  status:'searching'|'find' = 'searching';
  constructor(private LSservice:LocalStorageService) {

   }

  ngOnInit(): void {
    this.filterSearches();
  }

  filterSearches(locationSearchKey = ''){
    // Search only for key who includes the word 'search'
    this.status = 'searching';
    this.allSearches = [];
    this.LSservice.getKeys().map(key => {
      let search = this.LSservice.get(key);
      if(key.includes('search')){
        if(locationSearchKey){
          if(search.name?.includes(locationSearchKey))
            this.allSearches.push(search)
           return;
        }
        this.allSearches.push(search)
      }
   })
    // sort by time searched
    this.allSearches.sort((a,b) => {
       return (a.dt > b.dt)?(1):(-1)
    })
    this.status = 'find';
  }



}
