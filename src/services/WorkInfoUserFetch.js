class WorkInfoUserFetch {
    async getWorksHours() {
        const res = await fetch("http://localhost:8080/hours"); // массив сотрудников с числом часов в месяц

        if (res.ok) {
            return await res.json();
        } else {
            return "Сотрудники не добавлены";
        }
    }

    async checkAddHours(dateNow) {
        const res = await fetch(`http://localhost:8080/getHours/${dateNow}`);

        if (res.ok) {
            return await res.json();
        } else {
            return "Ошибка на сервере или неправильный формат даты";
        }
    }

    async getWorkers() {
        const res = await fetch("http://localhost:8080/workers");

        if (res.ok) {
            return await res.json();
        } else {
            return "Сотрудников нету";
        }
    }

    async addWorkInfo(employeeWorkArr) {
        const res = await fetch("http://localhost:8080/hours/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(employeeWorkArr)
        });

        if (res.ok) {
            return await res.json();
        } else {
            return "Произошла ошибка при добавлении";
        }
    }
}

const workInfoUserServices = new WorkInfoUserFetch();

export default workInfoUserServices;