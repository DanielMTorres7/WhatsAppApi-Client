export interface ApiMessage {
    conversation_id: string;
    id: string;
    from: string;
    timestamp: string;
    type: string;
    text: string;
    status: { status: 'delivered' | 'sent' | 'read' | 'failed'; timestamp: string }[];
}
