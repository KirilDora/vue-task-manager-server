const express = require('express');

const router = express.Router();
const fetch = require('node-fetch');

router.get('/projects/:name',  (async(req, res) => {
    const response = await fetch(`https://api.github.com/users/${req.params.name}/repos`);
    const data = await response.json();
    
    res.send(data);
}));

router.get('/tasks/:name/:repoName', (async(req, res) => {
    const response = await fetch(`https://api.github.com/repos/${req.params.name}/${req.params.repoName}/issues`);
    const data = await response.json();
    
    res.send(data);
}));




module.exports = router;
