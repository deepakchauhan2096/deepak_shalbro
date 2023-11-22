module.exports = middlewareFunctions = {

    checkAuth: (req, res, next) => {
   
        try {
   
          
            if (req.headers) {
                next();
            } else {
                res.status(403).json({
                    operation: "failed",
                    result: null,
                    errorMsg: "Invalid User"
                });
            }
        } catch (error) {
            res.status(500).json({
                operation: "failed",
                result: null,
                errorMsg: error.message
            });
        }
    },

    verifying :(req, res, next) => {
        try {
          console.log('verifying : ', req.body);
      
          // Replace this with the actual logic to check the AdminModel
          // For demonstration, we'll just proceed to the next middleware
          next();
        } catch (error) {
          console.log("error : ", error);
          res.status(500).json({
            operation: 'failed',
            result: null,
            errorMsg: error
          });
        }
      },
       vaildateEmpAttendance :(req, res, next) => {
        try {
          console.log('vaildateEmpAttendance : ', req.body);
      
          // Replace this with the actual logic to validate employee attendance
          // For demonstration, we'll just proceed to the next middleware
          next();
        } catch (error) {
          console.log("error : ", error);
          res.status(500).json({
            operation: 'failed',
            result: null,
            errorMsg: error
          });
        }
      },
    vaildateMember :(req, res, next) => {
        try {
          console.log('vaildateMember : ', req.body);
      
          // Replace this with the actual logic to validate the member
          // For demonstration, we'll just proceed to the next middleware
          next();
        } catch (error) {
          console.log("error : ", error);
          res.status(500).json({
            operation: 'failed',
            result: null,
            errorMsg: error
          });
        }
      },
      vaildateClient : (req, res, next) => {
        try {
          console.log('vaildateClient : ', req.body);
      
          // Replace this with the actual logic to validate the client
          // For demonstration, we'll just proceed to the next middleware
          next();
        } catch (error) {
          console.log("error : ", error);
          res.status(500).json({
            operation: 'failed',
            result: null,
            errorMsg: error
          });
        }
      },
       vaildateProject : (req, res, next) => {
        try {
          console.log('vaildateProject : ', req.body);
      
          // Replace this with the actual logic to validate the project
          // For demonstration, we'll just proceed to the next middleware
          next()
        } catch (error) {
          console.log("error : ", error);
          res.status(500).json({
            operation: 'failed',
            result: null,
            errorMsg: error
          });
        }
      },
      vaildateSubContractor :(req, res, next) => {
        try {
          console.log('vaildateSubContractor : ', req.body);
      
          // Replace this with the actual logic to validate the subcontractor
          // For demonstration, we'll just proceed to the next middleware
          next();
        } catch (error) {
          console.log("error : ", error);
          res.status(500).json({
            operation: 'failed',
            result: null,
            errorMsg: error
          });
        }
      },
      vaildateEmployeeSubContractor:(req,res,next)=>{
        try {
          console.log('vaildateSubContractoremployee : ', req.body);
      
          // Replace this with the actual logic to validate the subcontractor
          // For demonstration, we'll just proceed to the next middleware
          next();
        } catch (error) {
          console.log("error : ", error);
          res.status(500).json({
            operation: 'failed',
            result: null,
            errorMsg: error
          });
        }
      }



}



