const config = {
    ttl: 3,
    repos: [
        {
            repo: "strayfade/website",
            name: "website",
            path: "website",
            workingDir: "../website",
            startCmd: "node Server 3000",
        },
        {
            repo: "strayfade/netsocket",
            name: "netsocket",
            path: "netsocket",
            workingDir: "../netsocket",
            startCmd: "npm run develop",
        },
        {
            repo: "xauthenticate/web",
            name: "xauth",
            path: "web",
            workingDir: "../web",
            startCmd: "node App",
        },
        {
            repo: "strayfade/landing",
            name: "landing",
            path: "landing",
            workingDir: "../landing",
            startCmd: "node index",
        },
    ]
}

module.exports = { config }