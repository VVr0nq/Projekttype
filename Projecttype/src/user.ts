export interface User {
    id: number;
    firstName: string;
    lastName: string;
}

export class UserManager {
    private static LoggedInUSer: User | null = null;

    static getLoggedInUser(): User | null {
        return this.LoggedInUSer ?? {id: 1, firstName: "Arek", lastName: "Doe"};
    }
}

