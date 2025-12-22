const config = {
    ttl: 3,
    repos: [
        {
            repo: "strayfade/website",
            name: "website",
            path: "website",
            workingDir: "../website",
            updateCmd: "npm install",
            startCmd: "node Server 3000",
            ssh: "git@github.com:strayfade/website.git"
        },
        {
            repo: "strayfade/netsocket",
            name: "netsocket",
            path: "netsocket",
            workingDir: "../netsocket",
            updateCmd: "npm install --omit=dev",
            startCmd: "npm run develop",
            ssh: "git@github.com:strayfade/netsocket.git"
        },
        {
            repo: "xauthenticate/web",
            name: "xauth",
            path: "web",
            workingDir: "../web",
            updateCmd: "npm install",
            startCmd: "node App",
            ssh: "git@github.com:xauthenticate/web.git"
        },
        {
            repo: "strayfade/landing",
            name: "landing",
            path: "landing",
            workingDir: "../landing",
            updateCmd: "npm install",
            startCmd: "node index",
            ssh: "git@github.com:strayfade/landing.git"
        },
    ]
}

module.exports = { config }