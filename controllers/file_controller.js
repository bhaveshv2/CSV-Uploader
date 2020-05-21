const Files = require('../models/file');            //Import Model(database)
const fs = require('fs');                           //Import File System Library
const path = require('path');                       //import Path Library
const csv = require('csvtojson');                   //Import csvtojson

//Homepage
module.exports.home = function(req,res){
    return res.render('home',{
        title:'Home | CSV Uploader',
        path:'home',
    });
}

//Uploading csv file controller
module.exports.upload = async function(req,res){
    try{
        if(req.file){
            let fileName = req.file.originalname;
            fileName = path.parse(fileName).name;
            console.log(fileName);
            console.log(req.file.filename);

            await Files.create({
                name:fileName,
                path:req.file.filename,
            });
        }
        
        return res.render('home',{
            path:'home',
            title: 'Home | CSV Uploader',
            message:'File uploaded Successfully'
        });
    }catch(err){
        console.log(err);
        return res.render('home',{
            path: 'home',
            title: 'Home | CSV Visualizer',
            message: 'File upload failed'
          });
    }
}

//Controller for Display all the different files uploaded
module.exports.showAllFiles = async function(req,res){
    try{
        let allFiles = await Files.find({});

        return res.render('files',{
            title:'ALL FILES | CSV Uploader',
            path:'files',
            files:allFiles
        });
    }catch(err){
        console.log('***Error in showing files data',err);
        return res.redirect('back');
    }
}

//Controller for Specified file content which is selected
module.exports.showFileContent = async function(req,res){
    try{
        let file = await Files.findById(req.params.id);

        //Take the csv file path from uploads folder
        let csvFile = path.join(__dirname,'..','/uploads/',file.path);

        //convert to json
        let json = await csv().fromFile(csvFile);

        return res.render('display',{
            title:'File Content | CSV uploader',
            path:'display',
            name:file.name,
            json:json,
        })
    }catch(err){
        console.log('** Error in opening the file',err);
        return res.redirect('back');
    }
}
