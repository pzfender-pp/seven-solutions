import { GroupUser, User } from "../types/userType";

export const groupDataByDepartment = (data: User[]) => {
    return data.reduce((acc: GroupUser, user) => {
        const departmentKey = user.company.department;
        const addressKey = `${user.firstName}${user.lastName}`;
       
        if (!acc[departmentKey]) {
            acc[departmentKey] = {
                male: 0,
                female: 0,
                ageRange: `${user.age}-${user.age}`,
                hair: {},
                addressUser: {},
            };
        }

        // gender
        acc[departmentKey][user.gender]++;

        // ageRange
        const [minAge, maxAge] = acc[departmentKey].ageRange.split("-").map(Number);
        acc[departmentKey].ageRange = `${Math.min(minAge, user.age)}-${Math.max(maxAge, user.age)}`;

        // hair
        acc[departmentKey]["hair"][user.hair.color] = (acc[departmentKey]["hair"][user.hair.color] || 0) + 1;

        // addressUser
        acc[departmentKey].addressUser[addressKey] = user.address.postalCode;

        return acc;
    }, {});
};
