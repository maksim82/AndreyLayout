import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
 
export const visiblePasswordFunc = (linkPassword, linkRepeatPassword) => {
    if (linkPassword.current.type === "text") {
        linkPassword.current.type = "password";

        if (linkRepeatPassword) {
            linkRepeatPassword.current.type = "password";
        }

        return faEye;
    } else {
        linkPassword.current.type = "text";

        if (linkRepeatPassword) {
            linkRepeatPassword.current.type = "text";
        }

        return faEyeSlash;
    }
};
