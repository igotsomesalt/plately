import { api } from "../api/axiosConfig";

// Household info
export async function getHousehold() {
    const response = await api.get("/household/info");
    return response.data;
}

// Household name
export async function getHouseholdName() {
    const response = await api.get("/household/name");
    return response.data;
}

export async function updateHouseholdName(name) {
    const response = await api.patch("/household/name", {
        name
    });
    return response.data;
}

// Household budget
export async function getHouseholdBudget() {
    const response = await api.get("/household/budget");
    return response.data;
}

export async function updateHouseholdBudget(weeklyBudget) {
    const response = await api.patch("/household/budget", {
        weeklyBudget
    });
    return response.data;
}

// Members
export async function getMembers() {
    const response = await api.get("/household/members");
    return response.data;
}

export async function getMember(memberId) {
    const response = await api.get(
        `/household/members/${memberId}`
    );
    return response.data;
}

export async function addMember(member) {
    const response = await api.post(
        "/household/members",
        member
    );
    return response.data;
}

export async function updateMember(memberId, member) {
    const response = await api.put(
        `/household/members/${memberId}`,
        member
    );
    return response.data;
}