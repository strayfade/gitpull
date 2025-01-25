const { config } = require('./config')
const { execSync, spawn } = require('child_process');
const { log, logColors } = require('./log')
const path = require('path')

const runCommand = (command) => {
    try {
        const output = execSync(command, { encoding: 'utf-8' });
        return output.trim();
    } catch (error) {
        throw new Error(`Error running command: ${error.message}\n${error.stderr}`);
    }
}

const killOtherNodeInstances = () => {
    const instances = runCommand("ps -eo pid,comm | grep node")
    const processes = instances.split("\n").filter(line => line.trim() !== "");
    processes.forEach(line => {
        const parts = line.trim().split(/\s+/);
        const pid = parseInt(parts[0], 10);

        if (pid !== process.pid && !isNaN(pid)) {
            try {
                process.kill(pid, 'SIGTERM');
                log(`Killed process with PID ${pid}`);
            } catch (err) {
                log(`Failed to kill process with PID ${pid}: ${err.message}`, logColors.ErrorVisible);
            }
        }
    });
}

const spawnDetached = (command, workingDir) => {
    let args = [];

    args = command.split(" ")
    args.splice(0, 1)
    command = command.substr(0, command.indexOf(" "))

    const working = path.join(__dirname, workingDir)
    const child = spawn(command, args, {
        detached: true,
        stdio: ['ignore', 'inherit', 'inherit'],
        cwd: working
    });

    child.unref();
}

const fetchUpdates = () => {
    log("Starting update cycle")

    killOtherNodeInstances();
    log("Killed any other node instances")

    for (const repo of config.repos) {
        log(`Updating repo "${repo.name}" at directory ${repo.path}`)
        runCommand(`cd .. && cd ${repo.path} && git stash && git pull`)
        runCommand(`cd .. && cd ${repo.path} && npm i`)
        if (repo.startCmd) {
            spawnDetached(repo.startCmd, repo.workingDir)
        }
        log(`Finished updating "${repo.name}"`, logColors.Success)
    }
    log(`Finished update cycle`, logColors.SuccessVisible)
}

log("Started gitpull!")
setInterval(fetchUpdates, 1000 * 60 * 60 * config.ttl)
fetchUpdates()