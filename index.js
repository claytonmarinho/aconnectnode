import { exec } from "node:child_process";

const ignoredClients = ["System", "Midi Through"];

const promiseExec = (command) =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }

      if (stderr) {
        reject(stderr);
        return;
      }

      resolve(stdout);
    });
  });

const cleanUpConnections = () => {
  console.log("cleaning up connections");
  return promiseExec("aconnect -x");
};

const connectClients = (source, destination) => {
  const command = `aconnect ${source} ${destination}`;
  console.log(
    `connecting '${getDeviceName(source)}' -> '${getDeviceName(
      destination
    )}' (${command})`
  );
  return promiseExec(command);
};

const paths = {
  ES8: "DOREMiDi-hub:0",
  H9rev: "H9 Pedal:0",
  H9mod: "DOREMiDi-E513:0",
  BluGuitar: "DOREMiDi-hub:2",
};

const getDeviceName = (path) =>
  Object.entries(paths).find(([_, p]) => p === path)[0];

const connections = {
  [paths.ES8]: [paths.H9rev, paths.H9mod, paths.BluGuitar],
};

const makeConnections = async () => {
  await cleanUpConnections();
  const tasks = [];

  Object.entries(connections).forEach(([sourceClient, destinationClients]) => {
    destinationClients.forEach((destinationClient) => {
      tasks.push(connectClients(sourceClient, destinationClient));
    });
  });

  return Promise.all(tasks);
};

makeConnections();
