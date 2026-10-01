import api from "../api";

// Household info
export async function getHousehold() {
    const response = await api.get("/api/household/info");
    return response.data;
}

// Household name
export async function getHouseholdName() {
    const response = await api.get("/api/household/name");
    return response.data;
}

export async function updateHouseholdName(name) {
    const response = await api.patch("/api/household/name", {
        name
    });
    return response.data;
}

// Household budget
export async function getHouseholdBudget() {
    const response = await api.get("/api/household/budget");
    return response.data;
}

export async function updateHouseholdBudget(weeklyBudget) {
    const response = await api.patch("/api/household/budget", {
        weeklyBudget
    });
    return response.data;
}

// Members
export async function getMembers() {
    const response = await api.get("/api/household/members");
    return response.data;
}

export async function getMember(memberId) {
    const response = await api.get(
        `/api/household/members/${memberId}`
    );
    return response.data;
}

export async function addMember(member) {
    const response = await api.post(
        "/api/household/members",
        member
    );
    return response.data;
}

export async function updateMember(memberId, member) {
    const response = await api.put(
        `/api/household/members/${memberId}`,
        member
    );
    return response.data;
}