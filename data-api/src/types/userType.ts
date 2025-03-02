export type User = {
    firstName: string;
    lastName: string;
    company: {
        department: string;
    };
    gender: "male" | "female";
    age: number;
    hair: {
        color: string;
    };
    address: {
        postalCode: string;
    };
    [key: string]: any;
};

export type GroupUser = {
    [key: string]: {
        male: number;
        female: number;
        ageRange: string;
        hair: {
            [key: string]: any;
        };
        addressUser: {
            [key: string]: any;
        };
    };
};
