class UserFetch {
    // регистрация и авторизация пользователя
    async createUser(body, url) {
        const res = await fetch(`http://localhost:8080/${url}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            return await res.json();
        } else {
            const answerErr = url === "login" ? 
                    "Такого пользователя не существует" 
                : 
                    "Ошибка, не удалось зарегестрировать сотрудника";
            return answerErr;
        }
    }
    
    async addInfoUser(checkValue) {
        const res = await fetch(`http://localhost:8080/edit/${localStorage.getItem("user")}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(checkValue)
        });

        if (res.ok) {
            return await res.json();
        } else {
            return "Неопознаная ошибка";
        }
    }

    async changePasswordUser(newPassword) {
        const res = await fetch(`http://localhost:8080/profile/password/${localStorage.getItem("user")}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({password: newPassword})
        });

        if (res.ok) {
            return await res.json();
        } else {
            return "Старый пароль неверен";
        }
    }

    async getUserProfile() {
        const urls = [
            `http://localhost:8080/user/${localStorage.getItem("user")}`,
            `http://localhost:8080/profile/${localStorage.getItem("user")}`,
            `http://localhost:8080/profile/work/${localStorage.getItem("user")}`
        ];

        const requestArr = urls.map(request => fetch(request));

        const body = await Promise.all(requestArr)
            .then(responses => responses.forEach(res => res.json()));
        
        return body;
    }
}

const userServices = new UserFetch();

export default userServices;