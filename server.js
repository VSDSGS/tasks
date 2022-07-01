const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { join } = require("path");

app.use(express.json({ type: "application/json" }));

const rainAmount = (towers) => {
    let sum = 0;
    let leftMax = towers[0];
    let rightMax = Math.max(...towers.slice(2));
    for (let i = 1; i < towers.length - 1; i++) {
        const MIN = Math.min(leftMax, rightMax);
        if (MIN > towers[i]) {
            sum += MIN - towers[i];
        }
        if (leftMax < towers[i]) {
            leftMax = towers[i];
        }
        if (rightMax <= towers[i]) {
            rightMax = Math.max(...towers.slice(i + 1));
        }
    }
    return sum;
};

const formatTime = (seconds) => {
    let time = { year: 31536000, day: 86400, hour: 3600, minute: 60, second: 1 },
        res = [];

    if (seconds === 0) return "now";
    for (let key in time) {
        if (seconds >= time[key]) {
            let val = Math.floor(seconds / time[key]);
            res.push((val += val > 1 ? " " + key + "s" : " " + key));
            seconds = seconds % time[key];
        }
    }
    return res.length > 1 ? res.join(", ").replace(/,([^,]*)$/, " and" + "$1") : res[0];
};

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "../1", "template", "index.html"));
});

app.post("/towers", (req, res) => {
    const numOfTowers = req.body.towers;
    sum = rainAmount(numOfTowers);
    res.json({
        sum,
    });
});

app.post("/format_time", (req, res) => {
    const time = req.body.time;
    const formatedTime = formatTime(time);
    res.json({ formatedTime });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
