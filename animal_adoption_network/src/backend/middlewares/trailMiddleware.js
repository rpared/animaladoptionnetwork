

export const trialMiddleware=async(req,params,next) =>{

    try {
        
    console.log("trial middleware executed 1")
        
    return next();

    } catch (error) {
            console.log(error)
    }
   

    
}