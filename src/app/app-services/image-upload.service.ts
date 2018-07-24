import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ImageUploadService {

  constructor(private http: HttpClient) { }

  addPost(memberID:string, title: string, thumbnail_url:string, description:string, provider_name:string, provider_url:string, post_type:string, url:string, html:string, fileToUpload: File){
    //const endpoint ='http://209.97.132.48:8125/api/upload_image'
    const endpoint ='http://localhost:8098/newuser/upload/file'
    const formData: FormData = new FormData()
    formData.append('Image', fileToUpload, fileToUpload.name)
    formData.append('title', title) ;
    formData.append('description', description) ;
    formData.append('memberID', memberID) ;
    formData.append('thumbnail_url', thumbnail_url) ;
    formData.append('post_type', post_type) ;
    formData.append('provider_name', provider_name) ;
    formData.append('provider_url', provider_url) ;
    formData.append('url', url) ;
    formData.append('html', html) ;
    
    return this.http.post(endpoint, formData);
  }

  addArticle(memberID:string, title: string, description:string, provider_name:string, provider_url:string, post_type:string, url:string, html:string, fileToUpload: File){
    //const endpoint ='http://209.97.132.48:8125/api/upload_image'
    const endpoint ='http://localhost:8098/newuser/upload/file/postID/8'
    const formData: FormData = new FormData()
    formData.append('file', fileToUpload, fileToUpload.name)
    formData.append('title', title) ;
    formData.append('description', description) ;
    formData.append('memberID', memberID) ;
    formData.append('post_type', post_type) ;
    formData.append('provider_name', provider_name) ;
    formData.append('provider_url', provider_url) ;
    formData.append('url', url) ;
    formData.append('html', html) ;
    
    return this.http.post(endpoint, formData);
  }

  postFile(memberID:string, title: string, fileToUpload: File){
    //const endpoint ='http://209.97.132.48:8125/api/upload_image'
    const endpoint ='http://localhost:8098/newuser/upload/file/postID/8'
    const formData: FormData = new FormData()
    formData.append('file', fileToUpload, fileToUpload.name)
    return this.http.post(endpoint, formData);
    
  }


  avatar(memberID,fileToUpload: File){
    //const endpoint ='http://209.97.132.48:8125/api/upload_image'
    const endpoint ='http://localhost:8098/upload/avatar/memberID/'+ memberID
    const formData: FormData = new FormData()
    formData.append('file', fileToUpload, fileToUpload.name)
    return this.http.post(endpoint, formData);
    
  }

  profileBg(memberID,fileToUpload: File){
    //const endpoint ='http://209.97.132.48:8125/api/upload_image'
    const endpoint ='http://localhost:8098/upload/profileBg/memberID/'+ memberID
    const formData: FormData = new FormData()
    formData.append('file', fileToUpload, fileToUpload.name)
    return this.http.post(endpoint, formData);
    
  }


  processImage(fileToUpload: File){
    //const endpoint ='http://209.97.132.48:8125/api/upload_image'
    const endpoint ='http://localhost:8098/image/upload/file'
    const formData: FormData = new FormData()
    formData.append('file', fileToUpload, fileToUpload.name)
    return this.http.post(endpoint, formData);
    
  }


  processVideo(fileToUpload: File){
    //const endpoint ='http://209.97.132.48:8125/api/upload_image'
    const endpoint ='http://localhost:8098/video/upload'
    const formData: FormData = new FormData()
    formData.append('file', fileToUpload, fileToUpload.name)
    return this.http.post(endpoint, formData);
    
  }


  

}
