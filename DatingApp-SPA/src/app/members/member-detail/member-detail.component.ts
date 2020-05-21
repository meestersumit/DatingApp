import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import {
  NgxImageGalleryComponent,
  GALLERY_IMAGE,
  GALLERY_CONF,
} from 'ngx-image-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
// import { TabsetComponent } from 'ngx-bootstrap/tabs/tabset.component';
// import { TabsetComponent } from 'ngx-bootstrap/tabs/ngx-bootstrap-tabs';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  user: User;
  @ViewChild(NgxImageGalleryComponent)
  ngxImageGallery: NgxImageGalleryComponent;
  images: GALLERY_IMAGE[];

  // gallery configuration
  conf: GALLERY_CONF = {
    imageOffset: '10px',
    showDeleteControl: false,
    showImageTitle: false,
    inline: true,
    imageBorderRadius: '5px',
  };

  // gallery images

  // METHODS
  // open gallery
  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }

  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }

  // set new active(visible) image in gallery
  newImage(index: number = 0) {
    this.ngxImageGallery.setActiveImage(index);
  }

  // next image in gallery
  nextImage(index: number = 0) {
    this.ngxImageGallery.next();
  }

  // prev image in gallery
  prevImage(index: number = 0) {
    this.ngxImageGallery.prev();
  }

  /**************************************************/

  // EVENTS
  // callback on gallery opened
  galleryOpened(index) {}

  // callback on gallery closed
  galleryClosed() {}

  // callback on gallery image clicked
  galleryImageClicked(index) {}

  // callback on gallery image changed
  galleryImageChanged(index) {}

  // callback on user clicked delete button
  deleteImage(index) {}

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data['user'];
    });
    this.images = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.user.photos) {
      imageUrls.push({
        url: photo.url,
        altText: photo.description,
        title: photo.description,
        thumbnailUrl: photo.url,
      });
    }
    return imageUrls;
  }
}
