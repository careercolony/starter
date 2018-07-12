import { Component, OnInit } from '@angular/core';
import { StorageService } from './../app-services/storage.service';
import { ApiService } from './../app-services/api.service';
import { ImageUploadService } from './../app-services/image-upload.service';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, animate, transition, style, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  animations: [
    trigger('imganimate', [
      transition('* => *', [
        query('img', style({ opacity: 0})),

        query('img', stagger('60ms', [
          animate('600ms 1.3s ease-out', style({ opacity: 1}))
        ]))
      ])
    ]),

    trigger('page', [
      transition('* => *', [
        query('.page-content', style({ opacity: 0})),

        query('.page-content', stagger('30ms', [
          animate('600ms 1.7s ease-out', style({ opacity: 1}))
        ]))
      ])
    ]),


  ]
})
export class ArticlesComponent implements OnInit {

  defaultImage: string = ''
  fileToUpload: File = null

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private storageService: StorageService,
    private imageService: ImageUploadService,
    private http: HttpClient) 
    { }

  ngOnInit() {
  }

  handleFileInput(file: FileList){
    this.fileToUpload = file.item(0)
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.defaultImage = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
      console.log(this.fileToUpload)
  }



  onSubmitArticle(memberID,title, description, provider_name, provider_url, type, url, html, image){
    this.imageService.addArticle(memberID.value, title.value, description.value, provider_name.value, provider_url.value, type.value, url.value, html.value, this.fileToUpload )
    .subscribe( data =>{
      console.log(data);
      memberID.value = null
      title.value = null
      description.value = null
      provider_name.value = null
      provider_url.value = null
      type.value = null

    })
  }

  onSubmit(memberID,title, image){
    this.imageService.postFile(memberID.value, title.value, this.fileToUpload )
    .subscribe( data =>{
      console.log(data);
      memberID.value = null
      title.value = null
      image.value = null
    })
  }

}
