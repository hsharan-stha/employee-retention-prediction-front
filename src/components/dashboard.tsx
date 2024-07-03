import React, {createContext, ReactNode, useState} from 'react';
import Sidebar from "./sidebar.tsx";
import Metrics from "./metrics.tsx";
import EmployeeList from "./employee-list.tsx";

interface Wrapper{
    reload:boolean,
    setReload:(reload:boolean)=>void
}

export const Context= createContext<Wrapper>({reload:true,setReload(){}})
// Create a provider component
export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [reload, setReload] = useState(true);

    return (
        <Context.Provider value={{ reload, setReload }}>
            {children}
        </Context.Provider>
    );
};

const Dashboard: React.FC = () => {
    return (
        <ContextProvider>
        <div className="flex">
            <Sidebar active={'dashboard'}/>
            <div className="p-5 h-[100vh] flex flex-col flex-grow-1 w-4/5">
                <Metrics/>
                <EmployeeList/>
            </div>
        </div>
        </ContextProvider>
    );
};

export default Dashboard;
