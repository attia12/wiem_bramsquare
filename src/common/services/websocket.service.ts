import { Injectable } from '@angular/core';
import SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import { NotificationsService } from '../../app/layout/common/notifications/notifications.service';
import { take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
    private stompClient: any=null;


  constructor(private notificationsService: NotificationsService) { }

    connect(): void {
        let ws =new SockJS('http://localhost:8080/ws');

        this.stompClient = Stomp.over(ws);

        this.stompClient.connect({}, () => {
            this.stompClient.subscribe('/topic/notifications', (message: any) => {
                const data = JSON.parse(message.body);
                console.log('🔔 Notification:', data);
                this.notificationsService.notifications$
                    .pipe(take(1))
                    .subscribe((current) => {
                        current = current || [];
                        this.notificationsService['_notifications'].next([
                            { ...data, read: false },
                            ...current,
                        ]);
                    });
            });
        });
    }

    disconnect(): void {
        if (this.stompClient) {
            this.stompClient.disconnect(() => {
                console.log('WebSocket disconnected');
            });
        }
    }
}
