import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  selectedFile: File[] = [];
  uploading = false;
  uploadProgress: number = 0;
  constructor(private http: HttpClient) {

  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files;
  }

  uploadFile() {
    if (this.selectedFile) {
      for (var i = 0; i <= this.selectedFile.length - 1; i++) {
        this.processFile(this.selectedFile[i])
      }
    }
  }
  processFile(file: any): void {
      this.uploading = true;
          let formData = new FormData();
      formData.append('upload', file);
  
      let params = new HttpParams();
  
      const options = {
        params: params,
        reportProgress: true,
      };
      // setTimeout(() => {
      //   this.uploading = false;
      //   this.uploadProgress = 0;
      //   this.selectedFile = [];
      // }, 3000);
      const req = new HttpRequest('POST', 'http://localhost:3000/upload', formData, options);
      this.http.request(req).subscribe((responce)=>{
        console.log(responce)
      });
      
  }
}
