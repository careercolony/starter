import { Component, OnInit } from '@angular/core';
import { trigger, state, animate, transition, style, keyframes, query, stagger } from '@angular/animations';


@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css'],
  animations:[
    trigger('imganimate', [
      transition('* => *', [
        query('img', style({ opacity: 0})),

        query('img', stagger('60ms', [
          animate('600ms 1.3s ease-out', style({ opacity:1}))
        ]))
      ])
    ]),

    trigger('page', [
      transition('* => *', [
        query('.page-content', style({ opacity: 0})),

        query('.page-content', stagger('30ms', [
          animate('600ms 1.2s ease-out', style({ opacity:1}))
        ]))
      ])
    ]),
  ]
})
export class ProfileImageComponent implements OnInit {

  private message;
  private error;
  private urlToUpload = 'https://api-profile.cfapps.io/new-image';

  slimOptions = {
    // ratio: '1:1',
    // download: true,
    // initialImage: './test.jpg',
    size: {
      width: 729,
      height: 365
    },
    service: this.urlToUpload,
    didInit: this.slimInit.bind(this),
    didUpload: this.afterUpload.bind(this),
  };

  constructor() { }

  ngOnInit() {
  }

  // called when slim has initialized
  slimInit(data: any, slim: any) {
    // slim instance reference
    console.log(slim);

    // current slim data object and slim reference
    console.log(data);
  }

  afterUpload(err, data, res) {
    if (err) {
      this.error = 'Failed to upload to: ' + this.urlToUpload;
      this.message = '';
      console.log(err);
    } else {
      this.error = '';
      this.message = 'Successfully uploaded to: ' + this.urlToUpload;
    }
  }

}
