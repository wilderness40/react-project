const mongoose = require('mongoose');

const ScheduleSchema = mongoose.Schema({
  title : {
    type : String,
    require : true,
  },
  start : {
    type : Date,
    require : true,
  },
  end : {
    type : Date,
  },
  description : {
    type : String,
  }
})

const Schedule = mongoose.model('schedule', ScheduleSchema);

module.exports = Schedule;