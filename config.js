const config = {
    ttl: 3,
    repos: [
        {
            repo: "strayfade/website",
            name: "website",
            path: "website",
            workingDir: "../website",
            startCmd: "",
            updateCmd: "git stash && git pull"
        },
        {
            repo: "strayfade/cs120-finalproject",
            name: "cs120-finalproject/webserver",
            path: "cs120-finalproject/webserver",
            workingDir: "../cs120-finalproject/webserver",
            startCmd: "",
            updateCmd: "git stash && git pull"
        },
        {
            repo: "xauthenticate/kick-webdriver",
            name: "kick-webdriver",
            path: "kick-webdriver",
            workingDir: "../xauthenticate/kick-webdriver",
            startCmd: "",
            updateCmd: "git stash && git pull"
        },
        {
            repo: "xauthenticate/web",
            name: "xauth",
            path: "web",
            workingDir: "../web",
            startCmd: "",
            updateCmd: "git stash && git pull"
        },
        {
            repo: "strayfade/landing",
            name: "landing",
            path: "landing",
            workingDir: "../landing",
            startCmd: "",
            updateCmd: "git stash && git pull"
        },
        {
            repo: "strayfade/preflight",
            name: "preflight",
            path: "preflight",
            workingDir: "../preflight",
            startCmd: "npm run develop",
            updateCmd: "git stash && git pull"
        }
    ]
}

module.exports = { config }