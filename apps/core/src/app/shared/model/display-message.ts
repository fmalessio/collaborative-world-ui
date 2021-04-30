export interface DisplayMessage {
    type?: 'success' | 'error' | 'warning' | 'info';
    message: string;
    visible: boolean;
}

export abstract class DisplayMessageBuilder {
    static buildEmpty(): DisplayMessage {
        return { message: '', visible: false };
    }

    static buildSuccess(message: string): DisplayMessage {
        return {
            type: 'success',
            message: DisplayMessageBuilder.buildMesagge(message),
            visible: true
        };
    }

    static buildError(message: string): DisplayMessage {
        return {
            type: 'error',
            message: DisplayMessageBuilder.buildMesagge(message),
            visible: true
        };
    }

    static buildWarning(message: string): DisplayMessage {
        return {
            type: 'warning',
            message: DisplayMessageBuilder.buildMesagge(message),
            visible: true
        };
    }

    static buildInfo(message: string): DisplayMessage {
        return {
            type: 'info',
            message: DisplayMessageBuilder.buildMesagge(message),
            visible: true
        };
    }

    private static buildMesagge(message: string): string {
        return message ? message : 'Unknow';
    }
}