import { createContext } from "unctx";

export interface ILuminoContext {}

const luminoContext = createContext<ILuminoContext>();

export function useLumino(): ILuminoContext {
    const context = luminoContext.use();
    if (!context) {
        throw new Error('useLumino must be used within a LuminoProvider');
    }
    return context;
}

export function createLumino(): void {
    const context: ILuminoContext = {};
    luminoContext.set(context);
}
