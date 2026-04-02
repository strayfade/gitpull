const config = {
    ttl: 3,
    repos: [
        {
            repo: "strayfade/website",
            name: "website",
            path: "website",
            workingDir: "../website",
            updateCmd: "npm install",
            startCmd: "npm run develop",
            ssh: "git@github.com:strayfade/website.git"
        },
        //{   // NETSOCKET IS NOW MANAGED BY DOCKER! :party hats:
        //    repo: "strayfade/netsocket",
        //    name: "netsocket",
        //    path: "netsocket",
        //    workingDir: "../netsocket",
        //    updateCmd: "npm install --omit=dev",
        //    startCmd: "npm run develop",
        //    ssh: "git@github.com:strayfade/netsocket.git"
        //},
        {
            repo: "xauthenticate/frontend",
            name: "xauth",
            path: "frontend",
            workingDir: "../frontend",
            updateCmd: "npm install",
            startCmd: "npm run develop",
            ssh: "git@github.com:xauthenticate/frontend.git"
        },
    ]
}

module.exports = { config }
