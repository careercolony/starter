import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ImageUploadService {

  constructor(private http: HttpClient) { }

  addArticle(memberID:string, title: string, description:string, provider_name:string, provider_url:string, type:string, url:string, html:string, fileToUpload: File){
    //const endpoint ='http://209.97.132.48:8125/api/upload_image'
    const endpoint ='http://localhost:8098/newuser/upload/file'
    const formData: FormData = new FormData()
    formData.append('Image', fileToUpload, fileToUpload.name)
    formData.append('title', title) ;
    formData.append('description', description) ;
    formData.append('memberID', memberID) ;
    formData.append('type', type) ;
    formData.append('provider_name', provider_name) ;
    formData.append('provider_url', provider_url) ;
    formData.append('url', url) ;
    formData.append('html', html) ;
    
    

    
    return this.http.post(endpoint, formData);
  }

  postFile(memberID:string, title: string, fileToUpload: File){
    //const endpoint ='http://209.97.132.48:8125/api/upload_image'
    const endpoint ='http://localhost:8098/newuser/upload/file'
    const formData: FormData = new FormData()
    formData.append('file', fileToUpload, fileToUpload.name)
    formData.append('title', title) ;
    formData.append('memberID', memberID) ;
    return this.http.post(endpoint, formData);
    
  }

  

}
