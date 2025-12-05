const config = {
    ttl: 3,
    repos: [
        {
            repo: "strayfade/website",
            name: "website",
            path: "website",
            workingDir: "../website",
            updateCmd: "npm i",
            startCmd: "node Server 3000",
        },
        {
            repo: "strayfade/netsocket",
            name: "netsocket",
            path: "netsocket",
            workingDir: "../netsocket",
            updateCmd: "npm i",
            startCmd: "npm run develop",
        },
        {
            repo: "xauthenticate/web",
            name: "xauth",
            path: "web",
            workingDir: "../web",
            updateCmd: "npm i",
            startCmd: "node App",
        },
        {
            repo: "strayfade/landing",
            name: "landing",
            path: "landing",
            workingDir: "../landing",
            updateCmd: "npm i",
            startCmd: "node index",
        },
    ]
}

module.exports = { config }