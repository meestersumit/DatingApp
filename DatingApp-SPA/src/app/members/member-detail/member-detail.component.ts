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
  galleryOpened(index) {
    console.info('Gallery opened at index ', index);
  }

  // callback on gallery closed
  galleryClosed() {
    console.info('Gallery closed.');
  }

  // callback on gallery image clicked
  galleryImageClicked(index) {
    console.info('Gallery image clicked with index ', index);
  }

  // callback on gallery image changed
  galleryImageChanged(index) {
    console.info('Gallery image changed to index ', index);
  }

  // callback on user clicked delete button
  deleteImage(index) {
    console.info('Delete image at index ', index);
  }

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
    console.log('hit getImages');
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

  // loadUser() {
  //   this.userService
  //     .getUser(+this.route.snapshot.params['id']) //+ for converting string to number
  //     .subscribe(
  //       (user: User) => {
  //         this.user = user;
  //       },
  //       (error) => {
  //         this.alertify.error(error);
  //       }
  //     );
  // }
}
