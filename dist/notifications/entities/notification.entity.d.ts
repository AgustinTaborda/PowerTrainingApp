export declare enum ProcessedState {
    NOT_PROCESSED = "NOT_PROCESSED",
    PROCESSED = "PROCESSED",
    PROCESSING = "PROCESSING"
}
export declare class NotificationEntity {
    id: string;
    processedDate: Date;
    messageId: string;
    processedState: ProcessedState;
    queuedDate: Date;
    methodToSend: string;
    userId: string;
}
