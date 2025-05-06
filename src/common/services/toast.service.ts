import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

    constructor(private toastr: ToastrService) { }

    showToast(type: 'success' | 'error' | 'info' | 'warning', message: string, title: string = ''): void {


        switch (type) {
            case 'success':
                this.toastr.success(message, title);
                break;
            case 'error':
                this.toastr.error(message, title);
                break;
            case 'info':
                this.toastr.info(message, title);
                break;
            case 'warning':
                this.toastr.warning(message, title);
                break;
            default:
                console.error('Invalid toast type');
        }
    }


}
