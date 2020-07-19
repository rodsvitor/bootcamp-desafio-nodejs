const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateIdRepository(request, response, next) {
  const { id } = request.params;

  const repository = repositories.find(r => r.id === id);

  if (!repository) {
    return response.status(400).send();
  }
  return next();
}

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes:0
  }

  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", validateIdRepository, (request, response) => {

  const { id } = request.params;
  const { url, title, techs } = request.body;

  const repositoryIndex = repositories.findIndex(r => r.id === id);

  repositories[repositoryIndex];
  repositories[repositoryIndex].url = url;
  repositories[repositoryIndex].title = title;
  repositories[repositoryIndex].techs = techs;
  
  return response.json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", validateIdRepository, (request, response) => {
  const { id } = request.params;
  const indexRepo = findIndex(id);
  repositories.splice(indexRepo, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", validateIdRepository, (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(r => r.id === id);
  repository.likes++;
  return response.json(repository);
});

function findIndex(idRepository) {
  return repositories.findIndex(r => r.id === idRepository);
}

module.exports = app;
//uuhuuuuu
