import { Injectable } from '@angular/core';
import SockJS from "sockjs-client";
import * as Stomp from "stompjs";
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
    private stompClient: any=null;

  constructor() { }

    connect(): void {
        let ws =new SockJS('http://localhost:8080/ws');

        this.stompClient = Stomp.over(ws);

        this.stompClient.connect({}, () => {
            this.stompClient.subscribe('/topic/notifications', (message: any) => {
                const data = JSON.parse(message.body);
                console.log('🔔 Notification:', data);
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
