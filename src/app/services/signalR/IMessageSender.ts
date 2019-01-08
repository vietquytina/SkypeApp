export interface IMessageSender {
    sendMessage(message: string, data: any): Promise<any>;
}