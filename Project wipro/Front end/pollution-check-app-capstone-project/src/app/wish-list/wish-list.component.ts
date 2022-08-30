import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { RouterService } from '../services/router.service';
import { UserAuthenticationService } from '../services/user-authentication.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  wishlist: any[] = [
    // {
    //   cordinates: {
    //     lon: 72.99625,
    //     lat: 19.15096
    //   }
    // },
    // {
    //   cordinates: {
    //     lon: 140.32356,
    //     lat: 35.95633,
    //   }
    // },
    // {
    //   cordinates: {
    //     lon: 77.40289,
    //     lat: 23.25469
    //   }
    // }
  ]
  username:String = ""
  constructor(private auth: UserAuthenticationService, private router: RouterService,private favService:FavoriteService) {
    // get currrent user Id 
    this.username = localStorage.getItem('userName');
    // populate wishlist according to userId
    this.favService.getAllByUserId().subscribe((res:any)=>{
      console.log(res);
      this.wishlist = [];
      res.coordinates.forEach((ele:any) => {
        this.wishlist.push({
          cordinates:{
            lon:ele.lon,
            lat:ele.lat
          }
        })
      });
      console.log("here",this.wishlist)
    },
    (err)=>{
      console.log(err);
    })
  }
  removeWishListCard = (cordinates: { lon: number, lat: number }): void => {
    const remainingWishCards = this.wishlist.filter(data => data.cordinates.lon != cordinates.lon && data.cordinates.lat != cordinates.lat);
    this.wishlist = remainingWishCards;
  }
  ngOnInit(): void {
    
    
  }
  // Code for logout conformation
  logOut() {
    this.auth.logout();
    this.router.goToLogin();
  }
}
