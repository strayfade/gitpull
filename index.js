const { config } = require('./config')
const { execSync, spawn } = require('child_process');
const { log, logColors } = require('./log')
const path = require('path')
const fs = require('fs').promises
require('dotenv').config()
const readline = require("readline");

const runCommand = async (command) => {
    console.log(command)
    try {
        const output = execSync(command, { encoding: 'utf-8' });
        return output.trim();
    } catch (error) {
        throw new Error(`Error running command: ${error.message}\n${error.stderr}`);
    }
}

const directoryExists = async (dirPath) => {
    try {
        const stats = await fs.stat(dirPath);
        return stats.isDirectory();
    } catch (error) {
        if (error.code === 'ENOENT') {
            return false;
        }
        throw error;
    }
}

const killOtherNodeInstances = async () => {
    const instances = await runCommand("ps -eo pid,comm | grep node")
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

const spawnDetached = (command, workingDir, containerName = " ") => {
    let args = [];

    args = command.split(" ")
    args.splice(0, 1)
    command = command.substr(0, command.indexOf(" "))

    const working = path.join(__dirname, workingDir)
    const child = spawn(command, args, {
        detached: true,
        stdio: ['ignore', 'pipe', 'pipe'],
        cwd: working
    });

    const prefix = `[${containerName}] `
    const rlOut = readline.createInterface({ input: child.stdout });
    const rlErr = readline.createInterface({ input: child.stderr });
    rlOut.on("line", line => {
        console.log(`${prefix}${line}`);
    });

    rlErr.on("line", line => {
        console.error(`${prefix}${line}`);
    });

    child.unref();
}

const fetchUpdates = async () => {
    log("Starting update cycle")

    await killOtherNodeInstances();
    log("Killed any other node instances")

    for (const repo of config.repos) {
        if (!(await directoryExists(repo.workingDir))) {
            runCommand(`cd .. && git clone ${repo.ssh}`)
        }
        log(`Updating repo "${repo.name}" at directory ${repo.path}`)
        try {
            runCommand(`cd .. && cd ${repo.path} && git remote set-url origin ${repo.ssh}`)
            runCommand(`cd .. && cd ${repo.path} && git config --local credential.helper store`)
            runCommand(`cd .. && cd ${repo.path} && git stash && git pull`)
            runCommand(`cd .. && cd ${repo.path} && npm i`)
            if (repo.startCmd) {
                if (!(require('os').platform() === "darwin")) // macos returns EACCESS when running npm i on newer systems >:(
                    spawnDetached(repo.updateCmd, repo.workingDir, repo.name)
                spawnDetached(repo.startCmd, repo.workingDir, repo.name)
            }
            log(`Finished updating "${repo.name}"`, logColors.Success)
        }
        catch (err) {
            log(`Failed updating "${repo.name}" with error "${err}"`, logColors.ErrorVisible)
        }
    }
    log(`Finished update cycle`, logColors.SuccessVisible)
}

log(`Started gitpull with Github token "${process.env.GITHUB_TOKEN}"`)
setInterval(fetchUpdates, 1000 * 60 * 60 * config.ttl)
fetchUpdates()