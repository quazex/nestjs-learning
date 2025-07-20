export interface TUserChat {
    roomId: string;
    userId: string;
}

export interface TChatSend {
    authorId: string;
    roomId: string;
    text: string;
}

export interface TChatMessage {
    id: string;
    authorId: string;
    text: string;
    timestamp: number;
}
