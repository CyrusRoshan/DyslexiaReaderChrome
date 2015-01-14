var data = {};
data["google.com"] = {
    username: "user1",
    password: "pass1"
};
data["yahoo.com"] = {
    username: "user2",
    password: "pass2"
};

//store it
localStorage["data"] = JSON.stringify(data);

//load
data = JSON.parse(localStorage["data"]);

//read google username
console.log(data["google.com"].username);
