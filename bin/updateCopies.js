const path = require("path");

const exec = require('child_process').exec;
const fs = require('fs');

const packageName = require("../package.json").name;

let pathsToProjects = [
    "/Users/sguenter/Projekte/Privat/dnd",
    "/Users/sguenter/Projekte/Privat/libraries",
    "/Users/sguenter/Projekte/Privat/dmscreen",
    "/Users/sguenter/Projekte/churchtools-mobile",
    // "/home/silas/Projekte/web/nextjsTest/poc-nextjs",
    // "/home/silas/Projekte/web/project-echo",
    // "/home/silas/Projekte/web/smd-mail",
    // "/home/silas/Projekte/web/dnd",
    // "/home/silas/Projekte/web/bat",
    // "/home/silas/Projekte/web/typeorm-sync",
    // "/home/silas/Projekte/web/typeorm-sync-nextjs",
    // "/home/silas/Projekte/web/worktime",
    // "/home/silas/Projekte/web/TaskList",
    // "/home/silas/Projekte/web/hoffnungsfest",
    // "/home/silas/Projekte/web/geometry",
    // "/home/silas/Projekte/web/react-bootstrap-mobile",
    // "/home/silas/Projekte/web/react-bootstrap-mobile",
    // "/home/silas/Projekte/chrome/dmscreen",
    // "/home/silas/Projekte/web/smd-mail",
    // "/home/silas/Projekte/web/prayercircle",
    // "/home/silas/Projekte/Web/stories",
    // "/home/silas/Projekte/web/cordova-sites",
    // "/home/silas/Projekte/web/cordova-sites-easy-sync",
    // "/home/silas/Projekte/Web/cordova-sites-user-management",
    // "/home/silas/Projekte/i9/mbb",
    // "/home/silas/Projekte/Web/bible-lexicon",

    // "/var/www/i9/mbb",
    // "/home/silas/PhpstormProjects/cordova-sites-user-management",
    // "/home/silas/PhpstormProjects/project-echo",
];

const deleteFolderRecursive = function(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, index){
            let curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

async function execPromise(command) {
    return new Promise((resolve, reject) => {
        console.log("executing " + command + "...");
        exec(command, (err, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (err) {
                reject([err, stdout, stderr]);
            } else {
                resolve([stdout, stderr]);
            }
        });
    });
}

execPromise("npm pack").then(async (std) => {
    let thisPath = process.cwd();
    let name = std[0].trim();
    let pathToTar = path.resolve(thisPath, name);

    if (!fs.existsSync("tmp")) {
        fs.mkdirSync("tmp");
    }
    process.chdir("tmp");
    await execPromise("tar -xvzf " + pathToTar + " -C ./");
    process.chdir("package");
    fs.unlinkSync("package.json");

    let promise = Promise.resolve();
    pathsToProjects.forEach((project) => {
        promise = promise.then(async () => {
            let resultDir = path.resolve(project, "node_modules", packageName);
            console.log(resultDir, fs.existsSync(resultDir));
            if (!fs.existsSync(resultDir)) {
                fs.mkdirSync(resultDir);
            }
            return execPromise("cp -r ./* "+resultDir);
        });
    });
    await promise;

    process.chdir(thisPath);
    fs.unlinkSync(name);
    deleteFolderRecursive("tmp");
    // fs.unlinkSync("tmp");

    console.log("done!");
}).catch(e => {
    console.error(e);
});
