import { useEffect } from 'react';

const EmployeeBoxSearch = ({setEmployee, employee}) => {
    let employeesArr = [];

    const getEmployees = async () => {
        const res = await fetch('http://localhost:8080/getEmployees');
        employeesArr = await res.json();
    };

    useEffect(() => {
        getEmployees();
    }, [employee]);

    return (
        <div>
            <input type="text" onChange={e => setEmployee(e.target.value)} value={employee} />
            <div>
                {employeesArr.map((employee, i) => (
                    <div key={i}>
                        <div>{employee.FIO}</div>
                        <div>{employee.userName} <span>{employee.id}</span></div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default EmployeeBoxSearch;