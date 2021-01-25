declare global {
    interface FormDataValue {
        client_id: string;
        client_secret: string;
        code: string;
        redirect_uri: string;
    }

    interface FormData {
        append(name: string, value: FormDataValue, fileName?: string): void;
        set(name: string, value: FormDataValue, fileName?: string): void;
    }
}
