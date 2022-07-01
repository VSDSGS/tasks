const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const rainVolume = (towers) => {
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

app.get("/", (req, res) => {
    res.send("Send post request with json in it: `towers`: [ numbers] ");
});

app.post("/", (req, res) => {
    const numOfTowers = req.body.towers;
    sum = rainVolume(numOfTowers);
    res.json({
        sum,
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
