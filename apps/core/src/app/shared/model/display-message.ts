export interface DisplayMessage {
    type?: 'success' | 'error' | 'warning' | 'info';
    message: string;
}

export abstract class DisplayMessageBuilder {
    static buildEmpty(): DisplayMessage {
        return { message: '' };
    }

    static buildSuccess(message: string): DisplayMessage {
        return {
            type: 'success',
            message: DisplayMessageBuilder.buildMesagge(message)
        };
    }

    static buildError(message: string): DisplayMessage {
        return {
            type: 'error',
            message: DisplayMessageBuilder.buildMesagge(message)
        };
    }

    static buildWarning(message: string): DisplayMessage {
        return {
            type: 'warning',
            message: DisplayMessageBuilder.buildMesagge(message)
        };
    }

    static buildInfo(message: string): DisplayMessage {
        return {
            type: 'info',
            message: DisplayMessageBuilder.buildMesagge(message)
        };
    }

    private static buildMesagge(message: string): string {
        return message ? message : 'Unknow';
    }
}