import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const directoryPath = path.join(__dirname, 'public/videos');

const filesToRename = [
    { oldName: "Legacy man  [outlaw in the sesert with music].mp4", newName: "project-video-11.mp4" },
    { oldName: "Promotion Video 2 FINAL FINAL 2.mp4", newName: "project-video-12.mp4" },
    { oldName: "Sloe lux  [Avant garde with music].mp4", newName: "project-video-13.mp4" },
    { oldName: "Sloe lux  [Avant garde without music].mp4", newName: "project-video-14.mp4" },
    { oldName: "SnowWhite Animation vid 1.mp4", newName: "project-video-15.mp4" },
    { oldName: "Video concept1 (Mobile Video) final FINAL 2.mp4", newName: "project-video-16.mp4" }
];

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    
    files.forEach(function (file) {
        const fileToRename = filesToRename.find(f => f.oldName === file);
        if (fileToRename) {
            fs.rename(path.join(directoryPath, file), path.join(directoryPath, fileToRename.newName), function (err) {
                if (err) console.log('ERROR: ' + err);
            });
        }
    });
});
