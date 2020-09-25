export default {
    isAuth: function () {
        return localStorage.getItem("tokenNoclope") !== null;
    }
}