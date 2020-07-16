const mongoose = require("mongoose");
const ProjectModel = mongoose.model("Project");
const TaskHelper =require('../helpers/task.helper');

module.exports.getTasks = (id, done)=>{
    ProjectModel.findOne({ _id: id},{ Completed: false},(err, result) => {
        if(err) 
            done(err);
        else if (!result)
            done(null,false);
        else if(result)
        {
            var values = [], task=0, text="";
            console.log(result.Tasks.length);
            for(task; task<result.Tasks.length; task++) 
            {
                TaskHelper.getTaskName(result.Tasks[task],(err,val)=> {
                    if(err)
                        done(err);
                    else if(val == false) 
                        done(null,false);
                    else 
                    {
                        values.push(val); 
                        if(values.length == result.Tasks.length)
                        {
                            text = {
                                'ID': result._id,
                                'ProjectName': result.ProjectName,
                                'Tasks': values
                            }
                            done(null, text);
                        }                       
                    }
                });
            }
            
        }
           
        
    });
}