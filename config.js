const config = {
    ttl: 3,
    repos: [
        {
            name: "website",
            path: "website",
            workingDir: "../website",
            startCmd: "",
            updateCmd: "git stash && git pull"
        },
        {
            name: "xauth",
            path: "web",
            workingDir: "../web",
            startCmd: "",
            updateCmd: "git stash && git pull"
        },
        {
            name: "landing",
            path: "landing",
            workingDir: "../landing",
            startCmd: "",
            updateCmd: "git stash && git pull"
        },
        {
            name: "preflight",
            path: "preflight",
            workingDir: "../preflight",
            startCmd: "npm run develop",
            updateCmd: "git stash && git pull"
        }
    ]
}

module.exports = { config }