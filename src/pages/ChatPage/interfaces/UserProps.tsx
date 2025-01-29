export interface UserProps {
    name: string;
    phone_number: string;
    unread_messages: number;
    last_message: last_message;
    onClick: () => void;
}

interface last_message {
    id: string;
    from: string;
    timestamp: string;
    type: string;
    text: string;
    status: { status: 'delivered' | 'sent' | 'read' | 'failed'; timestamp: string }[];
    conversation_id: string;
    message_error: string;
}