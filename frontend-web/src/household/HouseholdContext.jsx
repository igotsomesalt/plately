import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    getHousehold,
    updateHouseholdName,
    updateHouseholdBudget,
    addMember,
    updateMember
} from "./householdApi";

const HouseholdContext = createContext();

export function HouseholdProvider({ children }) {
    const [household, setHousehold] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshHousehold = async () => {
        try {
            const household = await getHousehold();

            setHousehold(household);

            return household;
        } catch (err) {
            setHousehold(null);
            throw err;
        }
    };

    const updateName = async (name) => {
        const result = await updateHouseholdName(name);

        setHousehold((current) => ({
            ...current,
            name: result.name
        }));

        return result;
    };

    const updateBudget = async (weeklyBudget) => {
        const result = await updateHouseholdBudget(weeklyBudget);

        setHousehold((current) => ({
            ...current,
            weeklyBudget: result.weeklyBudget
        }));

        return result;
    };

    const createMember = async (member) => {
        const newMember = await addMember(member);

        setHousehold((current) => ({
            ...current,
            members: [
                ...current.members,
                newMember
            ],
            memberCount: current.memberCount + 1
        }));

        return newMember;
    };

    const editMember = async (memberId, member) => {
        const updatedMember = await updateMember(
            memberId,
            member
        );

        setHousehold((current) => ({
            ...current,
            members: current.members.map((currentMember) =>
                currentMember.id === memberId
                    ? updatedMember
                    : currentMember
            )
        }));

        return updatedMember;
    };

    useEffect(() => {
        refreshHousehold()
            .finally(() => setLoading(false));
    }, []);

    return (
        <HouseholdContext.Provider
            value={{
                household,

                loading,

                refreshHousehold,

                updateName,
                updateBudget,

                createMember,
                editMember,

                hasHousehold: !!household
            }}
        >
            {children}
        </HouseholdContext.Provider>
    );
}

export function useHousehold() {
    const context = useContext(HouseholdContext);

    if (!context) {
        throw new Error(
            "useHousehold must be used within a HouseholdProvider"
        );
    }

    return context;
}