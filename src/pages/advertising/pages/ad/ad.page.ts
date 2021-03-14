import { LoadingController } from '@ionic/angular';
import { WishlistService } from './../../../../common/services/wishlist.service';
import { HelperService } from './../../../../common/services/helper.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdService } from '../../services/ad.service';
import { Plugins } from '@capacitor/core';

const { Share } = Plugins;

@Component({
  selector: 'app-ad',
  templateUrl: './ad.page.html',
  styleUrls: ['./ad.page.scss'],
})
export class AdPage implements OnInit {
  ad: any;
  isInWishList: boolean = false;
  constructor(
    private route: ActivatedRoute,
    public adService: AdService,
    public helper: HelperService,
    public wishlist: WishlistService,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.params.id;
    // this.ad = this.adService.ads[id - 1];
    await this.load(id);

    await this.wishlist.loadWishlist();
    console.log(this.wishlist.wishlist);
    this.isInWishList = !!(await this.wishlist.isInWishList(this.ad));
    console.log(this.isInWishList);
  }

  async shareAd() {
    await Share.share({
      title: 'Shisha With Me',
      text: `Das habe ich bei Shisha With Me gefunden: ${this.ad.link}`,
      url: this.ad.link,
      dialogTitle: 'Teile diesen Eintrag',
    });
  }

  async load(id) {
    const loading = await this.loadingCtrl.create();
    loading.present();
    try {
      const data = await this.adService.loadOne(id);
      this.ad = data;
    } catch (error) {
    } finally {
      loading.dismiss();
    }
  }

  async addOrRemoveFromWishList() {
    this.isInWishList
      ? this.wishlist.removeFromWishlist(this.ad)
      : this.wishlist.addToWishlist(this.ad);

    this.isInWishList = !!(await this.wishlist.isInWishList(this.ad));
  }
}