export declare class GeminiService {
    private oauth2Client;
    constructor();
    private getAccessToken;
    generateCharacterBackground(characterData: any): Promise<string>;
    generateAdventure(characterDetails: any[]): Promise<string>;
}
